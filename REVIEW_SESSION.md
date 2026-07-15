# Repository review session

Date: 2026-07-13

## Scope

Read-only review of the content and launch readiness of the GroupWebpage SvelteKit repository. No application files were changed during the review.

## Summary

The scientific positioning is strong and coherent, the four research themes cover the group's work well, and centralizing editable copy in `src/lib/content/site.ts` provides a good foundation. The site is still visibly a draft and is not currently production-buildable because referenced image assets are missing.

## Findings

1. Draft/editorial content is rendered on the public homepage:
   - "QDLab website draft launched"
   - "Replace this item with a precise project launch..."
   - The complete "Missing details" section

2. `npm run build` fails during static prerendering because of missing assets:
   - 15 member/alumni photos under `static/photos/`
   - `quantumdotspace.png`
   - `qd-builder.png`
   - `minibse.png`
   - `auto-fox.png`

   The browser-side `onerror` fallback hides missing images at runtime, but it does not prevent SvelteKit's prerenderer from treating those requests as fatal 404s.

3. Group branding is inconsistent. Names currently include:
   - Computational and Predictive Nanochemistry Group
   - InfanteLab
   - QDLab
   - Computational Quantum Dot Nanochemistry Group

4. The Projects and Software sections repeat QuantumDotSpace, Orchestr.AI, QD Builder, miniBSE, and auto-FOX. Consider merging them or making Projects describe scientific questions/grants while Software describes reusable outputs.

5. Publication framing needs clarification:
   - The 163-record Scopus export is called the "full publication list" without saying whose record it represents or when it was exported.
   - One imported title contains `ZnCl2in` instead of `ZnCl2 in` (`src/lib/content/publications.json`, near line 487).
   - The converter is deterministic and currently produces 163 records, eight highlights, no duplicate DOIs, and no missing titles, authors, or DOIs.

6. Team and alumni entries are sparse. Several reuse the same generic research description, and alumni lack dates and current destinations. Individual profiles and more specific interests would improve this section.

7. `README.md` is still the default Svelte template. It should document:
   - Repository structure
   - Editing site content
   - Adding photos and logos
   - Regenerating publications with `npm run publications:build`
   - Publication source-of-truth policy
   - Build and deployment process

   The unreferenced `citations.csv` and `citations_csv.csv` files should also be documented, archived, or removed.

## Validation performed

- `npm run check`: passed with zero errors and zero warnings.
- `npm run build`: failed due to the missing image assets listed above.
- Publication regeneration to `/tmp`: matched the committed `src/lib/content/publications.json` exactly.

## Suggested order of work

1. Remove or replace public placeholder content.
2. Select and consistently apply the official group name and short brand.
3. Add the missing assets, remove their configured paths until available, or change prerender handling.
4. Consolidate or differentiate Projects and Software.
5. Clarify publication ownership and export date; correct the malformed title.
6. Enrich team/alumni entries and add profile links.
7. Replace the template README and clarify redundant data files.

## Worktree context at review time

The repository already contained uncommitted user changes before this note was added:

- Modified: `package-lock.json`
- Modified: `src/lib/content/site.ts`
- Modified: `src/routes/+page.svelte`
- Untracked: `static/logos/README.md`
- Untracked: `static/logos/orchestrai.png`
- Untracked: `static/photos/`

---

# Implementation session handoff

Last updated: 2026-07-15

## Completed

- Added project and software logos to their homepage cards.
- Added member and alumni portraits with initials as a missing-image fallback.
- Removed the public-facing "Missing details" draft section and replaced the placeholder platform
  announcement.
- Made BCMaterials and Ikerbasque affiliation logos link to their relevant external pages.
- Replaced the circular header badge with `static/logos/InfanteLab.png` on both site pages and made
  the same image the favicon and Apple touch icon.
- Removed the decorative orbital circles, colored nodes, and spectrum graphic from the homepage
  hero; the heading now reflows across the full available width instead of retaining the old visual
  column's empty space.
- Removed the experimental group-photo carousel, its discovery code, and the
  `static/photos/group_photos/` directory after review; the People section now ends after the
  alumni list.
- Replaced the draft public news item with the InfanteLab website launch announcement.
- Differentiated scientific research programmes from the reusable tools listed under Software.
- Added a shared compact mobile navigation menu and a keyboard-accessible skip link.
- Added optimized, reproducible logo derivatives; original artwork now lives in
  `assets/source-logos/` and `npm run assets:build` regenerates public assets.
- Reduced the public brand header image from 2.1 MB to 63 KB and generated dedicated favicon and
  social preview variants.
- Clarified that the publication record belongs to Ivan Infante and comes from the Scopus export
  dated 9 July 2026; corrected `ZnCl2in` to `ZnCl2 in` in the BibTeX source and generated JSON.
- Added Open Graph, Twitter card, Schema.org ResearchOrganization, theme, robots, and conditional
  canonical metadata. `PUBLIC_SITE_URL` controls production canonical URLs.
- Replaced the Svelte starter README with project-specific editing, asset, publication, validation,
  and deployment documentation.

## Validation

- `npm run check`: passed with zero errors and zero warnings.
- `npm run build`: passed and generated the static site successfully.
- `git diff --check`: passed.
