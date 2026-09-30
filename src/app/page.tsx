import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { FeaturedCuts } from "@/components/site/featured-cuts";
import { Portfolio } from "@/components/site/portfolio";
import { Packages } from "@/components/site/packages";
import { About } from "@/components/site/about";
import { DedicatedEditor } from "@/components/site/dedicated-editor";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { CTASection } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCuts />
        <Portfolio />
        <Packages />
        <About />
        <DedicatedEditor />
        <Stats />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
