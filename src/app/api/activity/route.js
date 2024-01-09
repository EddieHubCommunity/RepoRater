import { Query, Databases } from "node-appwrite";
import TimeAgo from "javascript-time-ago";

import { clientAdmin } from "@/config/appwrite-server";

import en from "javascript-time-ago/locale/en";
import urlToOwnerAndName from "@/utils/github/urlToOwnerAndName";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const dynamic = "force-dynamic";

export async function GET() {
  let ratings = await new Databases(clientAdmin()).listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_RATINGS_ID,
    [Query.orderDesc("$updatedAt"), Query.limit(25)]
  );

  ratings = ratings.documents.map((rating) => {
    const path = urlToOwnerAndName(rating.url);
    return {
      username: rating.username,
      url: rating.url,
      owner: path.owner,
      name: path.name,
      timeAgo: timeAgo.format(
        Math.floor(new Date(rating.$updatedAt).getTime())
      ),
      updatedAt: rating.$updatedAt,
    };
  });

  return Response.json(ratings);
}
