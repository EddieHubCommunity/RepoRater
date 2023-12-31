[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater)

<img width="1032" alt="Screenshot 2023-12-13 at 11 00 00" src="https://github.com/EddieHubCommunity/RepoRater/assets/624760/2c2d9bbf-ca00-4593-9174-ebeface86dc1">

<img width="458" alt="Screenshot 2023-12-13 at 09 27 37" src="https://github.com/EddieHubCommunity/RepoRater/assets/624760/ccc20975-4788-4232-b9e8-c3356b387b32">

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Technologies used

- NextJS
- Appwrite
- DaisyUI (Tailwind)

## Getting Started

1. Sign up to Appwrite and create a project (free)
1. Create database
1. Create collections `app` with the attributes
   - `ratings`: integer
   - `repos`: integer
   - `stars`: integer
   - create empty document with `0` for each attribute
1. Create collections `ratings` with the attributes
   - `url`: url
   - `username`: string
   - `rating`: integer
1. Create collections `repos` with the attributes
   - `url`: url
   - `description`: string
   - `name`: string
   - `votes`: integer
   - `rating`: float
   - `owner`: string
   - `logo`: string
1. Copy `.env.example` template file to `.env`
1. Get you private keys from Appwrite and add them to `.env` template (all data are required)
1. Create an OAuth app on GitHub and connect it with Appwrite Authentication
1. Run the development server with:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## RepoRater Badge in your README

Add the following markdown to your README to show your RepoRater badge and link to rate your repository.

[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater)

```markdown
[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater)
```

Change the `owner` and `name` parameters to your GitHub org/username and repository name.

### Badge Style

The default badge is "flat" but there are other styles if you prefer. This is done by appending the url with the `style` parameter.

Here are the options with examples:

| style         | badge                                                                                                                 |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- |
| flat          | ![flat](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&style=flat)                   |
| flat-square   | ![flat-square](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&style=flat-square)     |
| for-the-badge | ![for-the-badge](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&style=for-the-badge) |
| plastic       | ![plastic](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&style=plastic)             |
| social        | ![social](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&style=social)               |

### Badge Format

The default badge format is to show the average rating out of 5. You can also show the percentage. This is done by appending the url with the `format` parameter.

[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater&format=percentage)

```markdown
[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater&format=percentage)
```

| format     | badge                                                                                                                                                                                         |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| number     | [![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater&format=number)     |     |
| percentage | [![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater&format=percentage) |     |

## GitHub Action

> Automatically comment on issues and pull requests to get votes

```yml
name: repo-rater
run-name: repo-rater (#${{ github.event.issue.number || github.event.pull_request.number }})

permissions:
  issues: write
  pull-requests: write

on:
  issues:
    types: [closed]
  pull_request:
    types: [closed]

jobs:
  repo-rater:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: xkrishguptaa/action-repo-rater@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

More details https://github.com/xkrishguptaa/action-repo-rater

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
