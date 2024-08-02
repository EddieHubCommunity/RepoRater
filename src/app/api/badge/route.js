import { makeBadge } from "badge-maker";
import sdk, { Query } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const styles = ["plastic", "flat", "flat-square", "for-the-badge", "social"];
  const params = request.nextUrl.searchParams;
  const owner = params.get("owner");
  const name = params.get("name");
  const style = params.get("style");
  const format = params.get("format");

  // get repo rating from database
  const repos = await new sdk.Databases(clientAdmin()).listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REPOS_ID,
    [
      Query.equal("owner", [owner]),
      Query.equal("name", [name]),
      Query.limit(1),
    ],
  );
  const data = repos.documents[0];

  // increment views using badge
  if (data) {
    await new sdk.Databases(clientAdmin()).updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REPOS_ID,
      data.$id,
      {
        badgeViews: data.badgeViews + 1,
      },
    );
  }

  let message = "No votes yet";
  if (data) {
    switch (format) {
      case "percentage":
        message = `${((data.rating / 5) * 100).toFixed(0)}% (${data.votes})`;
        break;
      case "number":
      default:
        message = `${data.rating.toFixed(1)}/5 (${data.votes})`;
    }
  }

  const config = {
    message,
    label: "RepoRater",
    color: "green",
    style: style && styles.includes(style) ? style : "flat",
  };

  let svg = "";
  try {
    svg = makeBadge(config);
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
