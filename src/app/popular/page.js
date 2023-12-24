import Repos from "@/components/Repos";

export default function Popular() {
  return (
    <main className="hero min-h-screen bg-base-200">
      <Repos sort={"votes"} minimumVotes={5} />
    </main>
  );
}
