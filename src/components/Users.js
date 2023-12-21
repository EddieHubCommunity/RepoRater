"use server";

import { Databases } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";
import User from "./User";

export default async function Repos() {
  const ratings = await new Databases(clientAdmin()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_RATINGS_ID,
    []
  );
  const users = ratings.documents.reduce((acc, rating) => {
    if (!acc[rating.username]) {
      acc[rating.username] = {
        votes: 0,
        stars: 0,
      };
    }
    acc[rating.username].votes += 1;
    acc[rating.username].stars += rating.rating;
    return acc;
  }, {});

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {Object.entries(users)
        .sort((a, b) => b[1].votes - a[1].votes)
        .slice(0, 10)
        .map((user) => (
          <User
            key={user[0]}
            username={user[0]}
            votes={user[1].votes}
            stars={user[1].stars}
          />
        ))}
    </div>
  );
}
