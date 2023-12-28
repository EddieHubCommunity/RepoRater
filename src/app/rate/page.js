"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { account } from "@/config/appwrite-client";
import Form from "./Form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Rate() {
  const router = useRouter();
  const params = useSearchParams();
  const owner = params.get("owner");
  const name = params.get("name");

  const getUser = async () => {
    let user;
    try {
      user = await account.getSession("current");
    } catch (e) {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Rate an Open Source Repo!</h1>
            <p className="py-6">
              Open Source is about collaboration and sharing knowledge. But some
              repos have a better DX (Developer Experience), share your
              experience with the community!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Form owner={owner} name={name} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
