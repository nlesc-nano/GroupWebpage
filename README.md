# InfanteLab group website

Static SvelteKit website for the Computational and Predictive Nanochemistry Group (InfanteLab) at
BCMaterials. The site presents the group's research programmes, people, publications, open software,
news, and contact information.

## Local development

Requirements: a current Node.js LTS release and npm.

```sh
npm install
npm run dev
```

Useful validation commands:

```sh
npm run check
npm run build
npm run preview
```

The production build uses `@sveltejs/adapter-static` and is written to `build/`.

## Repository structure

- `src/lib/content/site.ts` — editable group, research, project, team, news, software, and contact data.
- `src/lib/content/publications.json` — generated publication data used by the website.
- `src/lib/components/SiteHeader.svelte` — shared responsive site header and navigation.
- `src/routes/+page.svelte` — homepage presentation.
- `src/routes/publications/+page.svelte` — complete publication record.
- `scopus_papers.bib` — publication source of truth.
- `scripts/convert-publications.mjs` — deterministic BibTeX-to-JSON converter.
- `assets/source-logos/` — original high-resolution logo artwork.
- `static/logos/` — optimized logos served by the website.
- `static/photos/` — member and alumni portraits.

## Editing site content

Most copy and structured content lives in `src/lib/content/site.ts`. Edit the relevant exported
array or the `group` object; the Svelte pages consume those values automatically.

Keep public news entries specific and verifiable. Avoid draft notes, placeholder instructions, or
internal completion checklists in public-facing arrays.

## Member photos

Add portraits to `static/photos/` and set the matching `photo` path in `src/lib/content/site.ts`.
Square images around 400×400 pixels are sufficient because cards display them as small circular
avatars. If a configured image cannot load, the interface falls back to the person's initials.

See `static/photos/README.md` for the current filename list.

## Logos and generated assets

Original project and brand artwork is kept in `assets/source-logos/`. The public site references
downscaled derivatives in `static/logos/` to avoid shipping multi-megabyte source artwork to users.

After replacing a source logo, regenerate the web assets:

```sh
npm run assets:build
```

The script creates the InfanteLab header logo, favicon, social preview image, and optimized software
logos. Commit both the source artwork and generated output.

## Publications

`scopus_papers.bib` is the publication source of truth. The current file identifies itself as an
Ivan Infante Scopus export dated 9 July 2026. Do not manually maintain the generated JSON.

After updating or correcting the BibTeX file, regenerate publications:

```sh
npm run publications:build
```

Then review the record count and run `npm run check` and `npm run build`. Highlight selection is
defined by the converter script and should remain deterministic.

The root-level `citations.csv` and `citations_csv.csv` files are legacy reference exports. They are
not read by the application or publication converter; archive or remove them once their historical
value has been confirmed.

## SEO and deployment URL

Set `PUBLIC_SITE_URL` to the final production origin before building, without a trailing slash:

```sh
PUBLIC_SITE_URL=https://example.org npm run build
```

When present, it is used to generate canonical URLs and absolute social-image URLs. Open Graph,
Twitter card, favicon, and Schema.org research-organization metadata are generated automatically.

## Deployment

The repository produces a fully static `build/` directory. Deploy that directory to the chosen
static host. A typical release flow is:

```sh
npm ci
npm run assets:build
npm run publications:build
npm run check
PUBLIC_SITE_URL=https://example.org npm run build
```

Replace the example origin with the real public URL. Verify the homepage, `/publications`, mobile
navigation, external links, favicon, and social preview after deployment.
