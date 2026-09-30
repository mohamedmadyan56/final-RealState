"use client";

import { useEffect } from "react";

// The hero showreel manages its own playback (the user can pause/scrub it), so it
// opts out with data-video-manual and is never touched from here.
//
// Everything else plays when it's on screen and stops when it isn't. That's the
// whole policy — there is deliberately no count-based cap.
//
// An earlier version capped how many videos could play at once (2 on desktop).
// It was meant to stop decode contention, but it produced a visibly broken page:
// in the portfolio carousel only the first card moved and the rest sat frozen on
// their poster frames, which reads as "the videos don't work". On a portfolio the
// moving video IS the content, so throttling what's on screen is not a trade-off
// worth making.
//
// The actual jank was never the number of videos. It was:
//   - backdrop-filter layers sitting on top of playing video and a fixed header,
//     which force a GPU readback + blur on every composited frame
//   - off-screen videos decoding anyway, because the observer had a 150px
//     rootMargin and treated "close to the viewport" as "on screen"
//   - a 1080p / 7.5MB hero clip, and rAF loops writing layout properties 60x/sec
// Those are fixed at the source. Pausing on scroll-out bounds the decode count to
// what's actually visible, which is the part that genuinely matters.
type Entry = {
  io: IntersectionObserver;
  visible: boolean;
};

export function VideoAutoplay() {
  useEffect(() => {
    const entries = new Map<HTMLVideoElement, Entry>();
    const guards = new Map<HTMLVideoElement, () => void>();
    let frame = 0;

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    // An explicit "save data" preference is the one case where we override what
    // the user is looking at — they told us bandwidth matters more.
    const playbackAllowed = () => !(connection?.saveData === true);

    const scheduleReconcile = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        reconcile();
      });
    };

    function reconcile() {
      const allowed = playbackAllowed();

      // Sweep the whole registry, not just the set we started ourselves: the
      // autoplay attribute means the UA can begin playing a video at any moment,
      // and one we never touched would otherwise never be paused.
      for (const [el, entry] of entries) {
        const shouldPlay = allowed && entry.visible;
        if (shouldPlay && el.paused) el.play().catch(() => {});
        else if (!shouldPlay && !el.paused) el.pause();
      }
    }

    const observe = (el: HTMLVideoElement) => {
      if (entries.has(el)) return;

      // The UA runs its own autoplay check as soon as a video has enough data,
      // which is after the first reconcile. Without this guard such a video
      // starts playing and stays playing off screen forever.
      const guard = () => {
        if (!entries.get(el)?.visible || !playbackAllowed()) el.pause();
      };
      el.addEventListener("play", guard);
      guards.set(el, guard);

      const entry: Entry = {
        io: null as unknown as IntersectionObserver,
        visible: false,
      };

      entry.io = new IntersectionObserver(
        (observed) => {
          for (const o of observed) entry.visible = o.isIntersecting;
          scheduleReconcile();
        },
        // No rootMargin: a video that isn't on screen has no business holding a
        // decoder. The poster frame carries it until it actually arrives.
        { threshold: [0, 0.15, 0.4, 0.75, 1] }
      );
      entry.io.observe(el);
      entries.set(el, entry);
    };

    const unobserve = (el: HTMLVideoElement) => {
      const entry = entries.get(el);
      if (!entry) return;
      const guard = guards.get(el);
      if (guard) el.removeEventListener("play", guard);
      guards.delete(el);
      entry.io.disconnect();
      entries.delete(el);
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLVideoElement>("video[autoplay]:not([data-video-manual])")
        .forEach(observe);
    };

    scan();

    // Accordions and keyed cut switchers mount <video> after hydration, so the
    // registry has to follow the DOM rather than a one-time snapshot.
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node instanceof HTMLVideoElement && node.autoplay) observe(node);
          node
            .querySelectorAll?.<HTMLVideoElement>(
              "video[autoplay]:not([data-video-manual])"
            )
            .forEach(observe);
        });
        record.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node instanceof HTMLVideoElement) unobserve(node);
          node.querySelectorAll?.<HTMLVideoElement>("video").forEach(unobserve);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // A backgrounded tab should not keep decoding video nobody is watching.
    const onVisibility = () => scheduleReconcile();
    document.addEventListener("visibilitychange", onVisibility);

    reconcile();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      for (const [el, guard] of guards) el.removeEventListener("play", guard);
      guards.clear();
      for (const entry of entries.values()) entry.io.disconnect();
      entries.clear();
    };
  }, []);

  return null;
}
