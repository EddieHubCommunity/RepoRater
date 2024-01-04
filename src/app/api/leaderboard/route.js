import { Query, Databases } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const ratings = await new Databases(clientAdmin()).listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RATINGS_ID,
    [Query.limit(1000)]
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

  const top = Object.keys(users)
    .map((username) => ({
      username,
      votes: users[username].votes,
      stars: users[username].stars,
    }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 10);

  return Response.json(top);
}
