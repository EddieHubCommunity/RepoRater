export default async function getUser(token) {
  const gitHubUserRes = await fetch("https://api.github.com/user", {
    headers: {
      "Content-Type": "application/vnd.github+json",
      Authorization: "Bearer " + token,
    },
  });
  const gitHubUserData = await gitHubUserRes.json();
  return gitHubUserData;
}
