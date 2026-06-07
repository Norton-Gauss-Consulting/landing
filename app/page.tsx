// Norton-Gauss · home (ported from src/app.jsx) — sections in handoff order.
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ManifestoBanner from "@/components/ManifestoBanner";
import Thesis from "@/components/Thesis";

export default function Home() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <Hero />
        <ManifestoBanner />
        <Thesis />
      </div>
      <Footer />
    </>
  );
}
