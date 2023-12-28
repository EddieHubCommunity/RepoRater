"use server";

import { Query, Databases } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";
import Repo from "./Repo";

export default async function Repos({ minimumVotes = 5 }) {
  const repos = await new Databases(clientAdmin()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_REPOS_ID,
    [
      Query.orderDesc("rating"),
      Query.orderDesc("votes"),
      Query.greaterThanEqual("votes", minimumVotes),
      Query.limit(100),
    ]
  );

  return (
    <div className="flex flex-row flex-wrap justify-center">
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
