# KKGT main website

KKGT Import Export main website. This is the source for the [`KKGTIMPORTEXPORT` repository](https://github.com/yohannesmulugeta/KKGTIMPORTEXPORT). Local development serves from `/`; the GitHub Pages build serves from `/KKGTIMPORTEXPORT/`.

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

## Structure

- `src/pages/`: corporate home, company, coffee, commodities, agrochemicals, trading, quality, process, gallery, contact, and detail routes
- `src/data/`: company and product content
- `src/components/`: navigation, reusable page components, and coffee journey
- `assets/`: supplied KKGT logo and original catalogue sprites; the site now uses extracted pack images in `public/assets/products/`
- `public/media/`: local coffee visuals, illustrative commodity images, and a supplied-catalogue field image
- `DATA_REQUIRED.md`: facts, media, and connections still needing KKGT confirmation
- `CONTENT_SOURCES.md`: source references and publication notes

## Publish

Push to `main` to run `.github/workflows/deploy.yml`. The workflow builds with:

```powershell
npm.cmd ci
npm.cmd run build:pages
```

The expected Pages URL is `https://yohannesmulugeta.github.io/KKGTIMPORTEXPORT/`. GitHub Pages must use **GitHub Actions** as its publishing source in the repository settings. The custom domain `kkgtimportexport.com` requires separate DNS and Pages configuration; it is not configured in this repository.

The contact form validates entries and opens an email draft. It does not deliver a message from the site. The old public domain did not resolve from this environment during the rebuild; indexed public pages and available KKGT catalogue content informed the site. Current records and media rights still need KKGT review.

Known old public paths (`/about-us/`, `/services/`, `/working-process/`, `/meet-our-team/`, and `/contact-us/`) redirect within the local app. The `motion-dom` and `motion-utils` versions are pinned in `package.json` because newer offline-resolved releases failed this project's Framer Motion build.
