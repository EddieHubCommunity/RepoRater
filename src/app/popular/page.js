import Repos from "@/components/Repos";

export const dynamic = "force-dynamic";

export default function Popular() {
  return (
    <main className="hero min-h-screen bg-base-200">
      <Repos sort={"votes"} minimumVotes={3} />
    </main>
  );
}
