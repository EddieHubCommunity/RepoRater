export default function urlToOwnerAndName(url) {
  const path = url.split("github.com/")[1];
  const sections = path.split("/");
  return {
    path,
    owner: sections[0],
    name: sections[1],
  };
}
