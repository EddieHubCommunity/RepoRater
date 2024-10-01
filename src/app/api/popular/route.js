import { Query, Databases } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const minimumVotes = params.get("minimumVotes");

  const fields = [
    "url",
    "logo",
    "description",
    "rating",
    "votes",
    "owner",
    "name",
    "badgeViews",
  ];
  const repos = await new Databases(clientAdmin()).listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REPOS_ID,
    [
      Query.select(fields),
      Query.orderDesc("votes"),
      Query.greaterThanEqual("votes", parseInt(minimumVotes) || 5),
      Query.limit(100),
    ],
  );

  const data = repos.documents.map((repo) =>
    Object.fromEntries(fields.map((field) => [[field], repo[field]])),
  );

  return Response.json(data);
}
