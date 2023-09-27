This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Unsupported Next.js Features
Because we are doing static compilation, some Next.js features are not supported. refer to this documentation for items that are not supported: [https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features) 

# To create the static exported site
```bash
npm run export
```
Open `out/index.html` in your browser to see the result.