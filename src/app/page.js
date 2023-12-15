import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Repos from "@/components/Repos";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="hero min-h-screen bg-base-200">
        <Repos />
      </main>
      <Footer />
    </>
  );
}
