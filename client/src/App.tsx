import { LangProvider } from "@/i18n";
import { ReservationProvider } from "@/reservation";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import About from "@/components/sections/About";
import Signatures from "@/components/sections/Signatures";
import Discover from "@/components/sections/Discover";
import Menu from "@/components/sections/Menu";
import Groups from "@/components/sections/Groups";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingActions from "@/components/FloatingActions";

function App() {
  return (
    <LangProvider>
      <ReservationProvider>
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <About />
          <Signatures />
          <Discover />
          <Menu />
          <Groups />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </ReservationProvider>
    </LangProvider>
  );
}

export default App;
