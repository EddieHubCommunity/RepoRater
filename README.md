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
   - `rating`: double
   - `owner`: string
   - `logo`: string
1. Copy `.env.example` template file to `.env`
1. Get you private keys from Appwrite and add them to `.env` template (all data are required)
1. Run the development server with:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
