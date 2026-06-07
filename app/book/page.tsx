// Norton-Gauss · Book-a-call route (ported from src/book.jsx)
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCallPage from "@/components/BookCallPage";

export default function Book() {
  return (
    <>
      <Topbar />
      <Nav />
      <BookCallPage />
      <Footer />
    </>
  );
}
