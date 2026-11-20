import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Interlude from "@/components/sections/Interlude";
import AppsArchive from "@/components/sections/AppsArchive";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

/**
 * Page composition — reorder, remove or duplicate sections here.
 * All copy/data lives in src/content/*.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Navbar />
      <div className="grain" aria-hidden />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Interlude lines={["25+ apps.", "100K+ installs.", "One craft."]} caption="Every great app starts as a blank screen." />
        <AppsArchive />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
