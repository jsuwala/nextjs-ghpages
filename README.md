This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Unsupported Next.js Features
Because we are doing static compilation, some Next.js features are not supported. refer to this documentation for items that are not supported: [https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features) 

## Development libraries

the CSS is implemented using Tailwind CSS. Read the documentation here: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

We are using NextUI for UI components. Read the documentation here: [https://nextui.org/docs](https://nextui.org/docs)

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

The map is implemented using [Leaflet](https://leafletjs.com/) with React-Leaflet. Read the documentation here: [https://react-leaflet.js.org/](https://react-leaflet.js.org/)

# To create the static exported site

Note: there is a GitHub action that will automatically build the site when you push to the `main` branch.
Just browse it here: [https://jsuwala.github.io/nextjs-ghpages/](https://jsuwala.github.io/nextjs-ghpages/)

To build the site locally, run the following command:

```bash
npm run export
```
Open `out/index.html` in your browser to see the result.