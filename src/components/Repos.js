"use server";

import sdk from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";
import Repo from "./Repo";

export default async function Repos() {
  const repos = await new sdk.Databases(clientAdmin()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_REPOS_ID,
    []
  );

  return (
    <div className="flex flex-row flex-wrap">
      {repos.documents.map((repo) => (
        <Repo
          key={repo.$id}
          stars={repo.rating}
          votes={repo.votes}
          owner={repo.owner}
          name={repo.name}
          url={repo.url}
          logo={repo.logo}
        />
      ))}
    </div>
  );
}
