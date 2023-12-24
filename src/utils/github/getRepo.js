export default async function getRepo(path, token) {
  const cleanPath = path.slice(-1) === "/" ? path.slice(0, -1) : path;
  const repoRes = await fetch(`https://api.github.com/repos/${cleanPath}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const repoData = await repoRes.json();
  return repoData;
}
