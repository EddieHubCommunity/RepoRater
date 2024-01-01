[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater)

# RepoRater

This project allows you to rate GitHub Repositories from the Developer Experience (DX) perspective.

When considering your rating here are a few points you might like to think about:

- does the Repo have a helpful community?
- does the Repo have good documentation to enable you to get started?
- are the maintainers supportive and do they provide useful feedback?

## Features

- [x] Login with GitHub OAuth
- [x] Rate a Repo
- [x] List all Repos
- [x] List popular Repos
- [x] Leaderboard of most active users
- [x] README badges
- [ ] Search Repos (coming soon)

Want to see any other features? [Open an issue](https://github.com/EddieHubCommunity/RepoRater/issues) and let us know.

## Screenshots

![repo-rater-laptop](https://github.com/EddieHubCommunity/RepoRater/assets/624760/6795c662-b9d2-45ee-9cbb-cf8a84064aa7)

## Technologies used

- [NextJS](https://nextjs.org)
- [Appwrite](https://appwrite.io)
- [DaisyUI](https://daisyui.com) ([Tailwind](https://tailwindcss.com))

## Quickstart for development

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

10. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

The default badge format is to show the average rating out of `5`. You can also show the percentage. This is done by appending the url with the `format` parameter.

[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater&format=percentage)

```markdown
[![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater&format=percentage)
```

| format     | badge                                                                                                                                                                                         |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number     | [![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&format=number)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater)     |
| percentage | [![RepoRater](https://repo-rater.eddiehub.io/api/badge?owner=EddieHubCommunity&name=RepoRater&format=percentage)](https://repo-rater.eddiehub.io/rate?owner=EddieHubCommunity&name=RepoRater) |

## GitHub Action

> Automatically comment on Issues and Pull Requests to get votes

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

## API (3rd party apps)

You can consume our data for your own apps.

### User Leaderboard

GET https://repo-rater.eddiehub.org/api/leaderboard

```json
[
  {
    "username": "eddiejaoude",
    "votes": 5,
    "stars": 13
  },
  {
    "username": "SaraJaoude",
    "votes": 3,
    "stars": 5
  },
  {
    "username": "test2",
    "votes": 2,
    "stars": 9
  }
]
```

### Popular Repos

GET https://repo-rater.eddiehub.org/api/popular

Optional paramater `?minimumVotes=5` (default is `5`)

```json
[
  {
    "url": "https://github.com/EddieHubCommunity/BioDrop",
    "logo": "https://avatars.githubusercontent.com/u/66388388?v=4",
    "description": "Connect to your audience with a single link. Showcase the content you create and your projects in one place. Make it easier for people to find, follow and subscribe.",
    "rating": 4.75,
    "votes": 49,
    "owner": "EddieHubCommunity",
    "name": "BioDrop",
    "badgeViews": 143
  },
  {
    "url": "https://github.com/appwrite/appwrite",
    "logo": "https://avatars.githubusercontent.com/u/25003669?v=4",
    "description": "Build like a team of hundreds_",
    "rating": 4.3333333333333,
    "votes": 310,
    "owner": "appwrite",
    "name": "appwrite",
    "badgeViews": 768
  }
]
```

## Community

Come and chat with the community in the EddieHub Discord http://discord.eddiehub.org
