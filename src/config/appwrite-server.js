"use server";

import sdk from "node-appwrite";

const client = () =>
  new sdk.Client()
    .setEndpoint("https://appwrite.jaoudestudios.co.uk/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

export default client;
