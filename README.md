# Bhasha Bridge

It's a language translation tool that allows users to translate text from one language to hindi with audio pronounciation.

For translation, we use [LINGVANEX](https://lingvanex.com/) and for audio, we use [elevenlabs](https://elevenlabs.io/).

## Tech Stack


- [Next.js](https://nextjs.org/): A React framework for building modern web applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds optional types.
- [LINGVANEX](https://lingvanex.com/): A powerful language translation API.
- [elevenlabs](https://elevenlabs.io/): An API for generating audio from text.



## Environment Variables

The project uses the following environment variables:

- `LINGVANEX_API_KEY`: The API key for the Lingvanex translation service.
- `ELEVEN_LABS_API_KEY`: The API key for the Eleven Labs text-to-speech service.
- `ELEVEN_LABS_VOICE_ID`: The voice ID for the Eleven Labs text-to-speech service.

Check env.example


This is a project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Run the tests:

```bash
npm run test
# or
yarn test
# or
pnpm test
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
