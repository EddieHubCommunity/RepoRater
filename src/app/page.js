import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Repos from "@/components/Repos";
import Stats from "@/components/Stats";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-base-200 pt-6">
        <Stats />
        <Repos minimumVotes={1} />
      </main>
      <Footer />
    </>
  );
}
