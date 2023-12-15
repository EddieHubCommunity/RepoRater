"use server";

export default async function action(data) {
  console.log("========", data, data.get("rating"), data.get("url"));
}
