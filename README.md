# inkOfPixel

This repo contains the source of [inkofpixel.com](https://inkofpixel.com). The site is built with Astro and deployed on Vercel.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Contact Form (Resend)

Set the following environment variables in Vercel (or locally for development):

- `RESEND_API_KEY`
- `CONTACT_FROM` (verified sender address in Resend)
- `CONTACT_TO` (destination email)

## Node Version

Node.js 24 is required (see `.nvmrc`).
