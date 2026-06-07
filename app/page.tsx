// Norton-Gauss · home (sections ported incrementally)
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter" />
      <Footer />
    </>
  );
}
