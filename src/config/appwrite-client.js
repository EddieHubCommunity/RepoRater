import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://appwrite.jaoudestudios.co.uk/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export { client, account };
