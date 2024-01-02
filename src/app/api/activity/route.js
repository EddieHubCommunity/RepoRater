import { Query, Databases } from "node-appwrite";
import TimeAgo from "javascript-time-ago";

import { clientAdmin } from "@/config/appwrite-server";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export async function GET() {
  let ratings = await new Databases(clientAdmin()).listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RATINGS_ID,
    [Query.orderDesc("$updatedAt"), Query.limit(25)]
  );

  ratings = ratings.documents.map((rating) => ({
    username: rating.username,
    url: rating.url,
    timeAgo: timeAgo.format(Math.floor(new Date(rating.$updatedAt).getTime())),
    updatedAt: rating.$updatedAt,
  }));

  return Response.json(ratings);
}
