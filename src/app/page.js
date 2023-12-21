import Repos from "@/components/Repos";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="hero min-h-screen bg-base-200">
      <Repos />
    </main>
  );
}
