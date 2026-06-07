// Norton-Gauss · home (ported from src/app.jsx) — sections in handoff order.
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ManifestoBanner from "@/components/ManifestoBanner";

export default function Home() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <Hero />
        <ManifestoBanner />
      </div>
      <Footer />
    </>
  );
}
