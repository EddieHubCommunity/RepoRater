import { redirect } from "next/navigation";
import sdk, { Query } from "node-appwrite";

import { client, clientAdmin } from "@/config/appwrite-server";

export async function POST(request) {
  const data = await request.json();

  const sessionId = request.headers.get("sessionId");
  const jwt = request.headers.get("Authorization");
  const appwriteClient = client().setJWT(jwt);
  const account = new sdk.Account(appwriteClient);
  const session = await account.getSession(sessionId);

  // find user on github
  let rating = parseInt(data.rating);
  let username = "";
  try {
    const gitHubUserRes = await fetch("https://api.github.com/user", {
      headers: {
        "Content-Type": "application/vnd.github+json",
        Authorization: "Bearer " + session.providerAccessToken,
      },
    });
    const gitHubUserData = await gitHubUserRes.json();
    username = gitHubUserData.login;
  } catch (e) {
    return redirect("/auth/login");
  }

  // 0. get repo from github api
  const repoPath = data.url.split("github.com/");
  if (repoPath.length !== 2) {
    return Response.json({ success: false, error: "Invalid URL" });
  }
  const repoRes = await fetch(`https://api.github.com/repos/${repoPath[1]}`);
  const repoData = await repoRes.json();
  const githubRepo = {
    name: repoData.name,
    owner: repoData.owner.login,
    description: repoData.description,
    logo: repoData.owner.avatar_url,
  };

  // 1. check if user already rated this repo
  const userRepoRating = await new sdk.Databases(clientAdmin()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_RATINGS_ID,
    [Query.equal("url", [data.url]), Query.equal("username", [username])]
  );

  // 2a. update in ratings collection
  if (userRepoRating.total === 1) {
    await new sdk.Databases(clientAdmin()).updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_RATINGS_ID,
      userRepoRating.documents[0].$id,
      {
        username: username,
        url: data.url,
        rating: rating,
      }
    );
  } else {
    // 2b. create in ratings collection
    await new sdk.Databases(clientAdmin()).createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_RATINGS_ID,
      sdk.ID.unique(),
      {
        username: username,
        url: data.url,
        rating: rating,
      }
    );
  }

  // 3. check if repo exists
  const repos = await new sdk.Databases(clientAdmin()).listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_REPOS_ID,
    [Query.equal("url", [data.url])]
  );

  // 4a. update in repos collection + calculate new rating
  if (repos.total === 1) {
    // get all ratings for this repo
    const ratings = await new sdk.Databases(clientAdmin()).listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_RATINGS_ID,
      [Query.equal("url", [data.url])]
    );

    // save new repo rating
    const averageRating =
      ratings.documents.reduce((acc, cur) => acc + cur.rating, 0) /
      ratings.total;
    const repo = await new sdk.Databases(clientAdmin()).updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_REPOS_ID,
      repos.documents[0].$id,
      {
        ...githubRepo,
        rating: averageRating,
        votes: ratings.total,
      }
    );
  } else {
    // 4a. create in repos collection
    const repo = await new sdk.Databases(clientAdmin()).createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_REPOS_ID,
      sdk.ID.unique(),
      {
        ...githubRepo,
        url: data.url,
        rating: rating,
        votes: 1,
      }
    );
  }

  return Response.json({ success: true, data: githubRepo });
}
