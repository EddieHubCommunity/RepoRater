import Repos from "@/components/Repos";
import Stats from "@/components/Stats";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 pt-6">
      <Stats />
      <Repos sort="rating" minimumVotes={1} />
    </main>
  );
}
