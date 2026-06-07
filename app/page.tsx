// Norton-Gauss · home (ported from src/app.jsx)
// Sections are ported incrementally; Hero is first. The remaining home
// sections (Manifesto banner, Thesis, Practices, Framework, …) follow.
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <Hero />
      </div>
      <Footer />
    </>
  );
}
