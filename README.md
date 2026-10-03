# KKGT Import Export — Website Source Code

> **Official website:** https://kkgtimportexport.com/

This repository contains the source code for the official **KKGT Import Export** website.  
For company information, coffee, agricultural commodities, agrochemicals, import and trading inquiries, visit **https://kkgtimportexport.com/**.

The GitHub repository is for website development and version control; it is **not the primary public website**.

## Technology

- React
- Vite
- TypeScript
- React Router
- Framer Motion
- Cloudflare production deployment

## Run locally

Use Node.js 22:

```powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1 --port 4180
```

Open `http://127.0.0.1:4180/`.

For a production preview:

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4181
```

## Website structure

- `src/pages/` — corporate home, company, coffee, commodities, agrochemicals, trading, quality, process, gallery, contact, and detail routes
- `src/data/` — company and product content
- `src/components/` — navigation and reusable site components
- `public/media/` — optimized website media and branding assets
- `public/sitemap.xml` — production XML sitemap
- `public/robots.txt` — crawler directives

## Production

The public production domain is:

**https://kkgtimportexport.com/**

Changes pushed to `main` are built and deployed through the project's connected deployment workflow. Search engines and customers should use the production domain above rather than a GitHub URL.

## Contact behavior

The website contact flow validates visitor input and prepares an email draft. It does not store submitted inquiry data in this repository.
