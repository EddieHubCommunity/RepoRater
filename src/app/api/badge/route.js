import { makeBadge } from "badge-maker";
import sdk, { Query } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const owner = params.get("owner");
  const name = params.get("name");
  const style = params.get("style");

  // get repo rating from database
  const repos = await new sdk.Databases(clientAdmin()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_REPOS_ID,
    [Query.equal("owner", [owner]), Query.equal("name", [name]), Query.limit(1)]
  );
  const data = repos.documents[0];

  // increment views using badge
  if (data) {
    await new sdk.Databases(clientAdmin()).updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_REPOS_ID,
      data.$id,
      {
        badgeViews: data.badgeViews + 1,
      }
    );
  }

  const format = {
    label: "RepoRater",
    message: data
      ? `${data.rating.toFixed(2)} (${data.votes})`
      : "No votes yet",
    color: "green",
    style: style ? style : "flat", // (Optional) One of: 'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'
  };

  let svg = "";
  try {
    svg = makeBadge(format);
  } catch (e) {
    console.log(e);
    // TODO: return error badge
  }

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
