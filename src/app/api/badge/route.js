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

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REPOS_ID;

  if (!databaseId || !collectionId) {
    throw new Error("Database or Collection ID is missing in environment variables");
  }

  // get repo rating from database
  const repos = await new sdk.Databases(clientAdmin()).listDocuments(
    databaseId,
    collectionId,
    [Query.equal("owner", [owner]), Query.equal("name", [name]), Query.limit(1)]
  );
  const data = repos.documents.length > 0 ? repos.documents[0] : null;

  // increment views using badge
  if (data) {
    await new sdk.Databases(clientAdmin()).updateDocument(
      databaseId,
      collectionId,
      data.$id,
      {
        badgeViews: data.badgeViews + 1,
      }
    );
  }

  if (data && data.votes > 0) {
    switch (format) {
      case "percentage":
        message = `${((data.rating / 5) * 100).toFixed(0)}% (${data.votes})`;
        break;
      case "number":
      default:
        message = `${data.rating.toFixed(1)}/5 (${data.votes})`;
    }
  }

  const chosenStyle = style && styles.includes(style) ? style : "flat";
  const config = {
    message,
    label: "RepoRater",
    color: "green",
    style: chosenStyle,
  };

  let svg = "";
  try {
    svg = makeBadge(config);
  } catch (e) {
    console.error("Error generating badge:", e);
    const errorConfig = {
      message: "Error",
      label: "RepoRater",
      color: "red",
      style: "flat",
    };
    svg = makeBadge(errorConfig);
  }

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
