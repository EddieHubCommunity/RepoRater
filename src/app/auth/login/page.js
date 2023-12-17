"use client";

import { account } from "@/config/appwrite-client";

export default function Page() {
  const login = async () => {
    account.createOAuth2Session(
      "github",
      `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`
    );
  };

  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Rate an Open Source Repo!</h1>
          <p className="py-6">
            Open Source is about collaboration and sharing knowledge. But some
            repos have a better DX (Developer Experience), share your experience
            with the community!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <button className="btn btn-primary" onClick={() => login()}>
            Login with GitHub
          </button>
        </div>
      </div>
    </main>
  );
}
