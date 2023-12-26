import Repos from "@/components/Repos";
import Stats from "@/components/Stats";

export const dynamic = "force-dynamic";

export default function Popular() {
  return (
    <main className="min-h-screen bg-base-200 pt-6">
      <Stats />
      <Repos sort={"votes"} minimumVotes={3} />
    </main>
  );
}
