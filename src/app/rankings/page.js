import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Users from "@/components/Users";

export const dynamic = "force-dynamic";

export default function Rank() {
  return (
    <>
      <Navbar />
      <main className="hero min-h-screen bg-base-200">
        <Users />
      </main>
      <Footer />
    </>
  );
}
