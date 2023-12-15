"use server";

import sdk from "node-appwrite";

import client from "@/config/appwrite-server";
import Repo from "./Repo";

export default async function Repos() {
  const repos = await new sdk.Databases(client()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    "65533f2e29aee3045d6f",
    []
  );
  console.log(repos.documents.length, repos.documents);

  return (
    <>
      {repos.documents.map((repo) => (
        <Repo
          stars={repo.rating}
          votes={repo.votes}
          owner={repo.owner}
          name={repo.name}
          url={repo.url}
          logo={repo.logo}
        />
      ))}
    </>
  );
}
