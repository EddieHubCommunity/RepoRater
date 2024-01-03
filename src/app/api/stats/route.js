import { Query, Databases } from "node-appwrite";

import { clientAdmin } from "@/config/appwrite-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = (
    await new Databases(clientAdmin()).listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APP_ID,
      [Query.limit(1)]
    )
  ).documents[0];

  return Response.json(data);
}
