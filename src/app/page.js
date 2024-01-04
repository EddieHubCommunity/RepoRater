import Link from "next/link";

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
        <div className="hero bg-base-100 mb-6">
          <div className="hero-content text-center">
            <div>
              <h1 className="text-5xl font-bold">Impartial Rating</h1>
              <p className="py-6">
                Rate Open Source GitHub Repositories on their Developer
                Experience (DX).
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/rate" className="btn btn-primary">
                  Add Rating
                </Link>
                <Link
                  href="https://github.com/EddieHubCommunity/RepoRater#reporater-badge-in-your-readme"
                  className="btn btn-secondary btn-outline"
                >
                  Add Badge to your README
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Stats />
        <Repos minimumVotes={1} />
      </main>
      <Footer />
    </>
  );
}
