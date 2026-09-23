<script lang="ts">
	import { resolve } from '$app/paths';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { group } from '$lib/content/site';
	import rawPublications from '$lib/content/publications.json';
	import { formatVenue, type PublicationRecord } from '$lib/content/publicationTypes';

	const publications = rawPublications as PublicationRecord[];
	const groupedPublications = Object.entries(
		publications.reduce<Record<string, PublicationRecord[]>>((groups, publication) => {
			const year = publication.year ? String(publication.year) : 'Undated';
			groups[year] = [...(groups[year] ?? []), publication];
			return groups;
		}, {})
	).sort(([left], [right]) => Number(right) - Number(left));

	function isIvan(author: string) {
		return author.toLowerCase().includes('infante, ivan');
	}
</script>

<svelte:head>
	<title>Publications | {group.shortName}</title>
	<meta
		name="description"
		content="Ivan Infante's publication record from the Scopus export dated 9 July 2026."
	/>
	<meta property="og:title" content={`Publications | ${group.shortName}`} />
	<meta
		property="og:description"
		content="Ivan Infante's publication record from the Scopus export dated 9 July 2026."
	/>
	<meta name="twitter:title" content={`Publications | ${group.shortName}`} />
</svelte:head>

<SiteHeader currentPage="publications" />

<main id="main-content">
	<section class="page-hero">
		<p class="eyebrow">Publication record</p>
		<h1>Publications</h1>
		<p>
			Ivan Infante's publication record, generated from a Scopus BibTeX export dated 9 July
			2026. Records are grouped by year and sorted newest first.
		</p>
		<div class="publication-stats">
			<div class="reveal" use:reveal>
				<span>{publications.length}</span>
				<p>Total records</p>
			</div>
			<div class="reveal" use:reveal style="transition-delay: 70ms">
				<span>{publications.filter((publication) => publication.highlighted).length}</span>
				<p>Highlighted on homepage</p>
			</div>
			<div class="reveal" use:reveal style="transition-delay: 140ms">
				<span>{group.shortName}</span>
				<p>{group.affiliation}</p>
			</div>
		</div>
	</section>

	<section class="publication-years" aria-label="All publications">
		{#each groupedPublications as [year, yearPublications]}
			<section class="year-group" aria-labelledby={`year-${year}`}>
				<div class="year-heading">
					<h2 id={`year-${year}`}>{year}</h2>
					<span>{yearPublications.length} publications</span>
				</div>
				<div class="publication-list">
					{#each yearPublications as publication, index}
						<article
							class:highlighted={publication.highlighted}
							class="publication-card reveal"
							use:reveal
							style="transition-delay: {Math.min(index, 5) * 60}ms"
						>
							<div class="publication-meta">
								<span>{publication.type}</span>
								{#if publication.highlighted}
									<strong>Highlighted</strong>
								{/if}
							</div>
							<h3>{publication.title}</h3>
							<p class="authors">
								{#each publication.authors as author, index}
									<span class:ivan={isIvan(author)}>{author}</span>{#if index < publication.authors.length - 1}, {/if}
								{/each}
							</p>
							<p class="venue">{formatVenue(publication)}</p>
							<div class="publication-actions">
								{#if publication.doiUrl}
									<a href={publication.doiUrl} target="_blank" rel="noreferrer">DOI</a>
								{/if}
								{#if publication.url}
									<a href={publication.url} target="_blank" rel="noreferrer">Scopus</a>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}
	</section>
</main>

<footer>
	<span>{group.name}</span>
	<a href={resolve('/')}>Home</a>
</footer>

<style>
	footer a:hover {
		color: var(--teal);
	}

	.page-hero {
		padding: clamp(56px, 8vw, 116px) clamp(20px, 6vw, 88px) clamp(36px, 5vw, 72px);
		border-bottom: 1px solid var(--line);
	}

	.eyebrow {
		margin: 0 0 14px;
		color: var(--teal);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	h1,
	h2,
	h3,
	p {
		margin-top: 0;
	}

	h1 {
		max-width: 960px;
		margin-bottom: 20px;
		font-size: clamp(3.5rem, 10vw, 8rem);
		line-height: 0.92;
	}

	.page-hero > p {
		max-width: 760px;
		color: var(--muted);
		font-size: 1.12rem;
		line-height: 1.7;
	}

	.publication-stats {
		display: grid;
		grid-template-columns: 0.6fr 0.8fr 1.4fr;
		margin-top: 36px;
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: var(--radius);
		background: var(--noise), var(--panel-strong);
		backdrop-filter: var(--glass);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			0 12px 30px -22px rgba(23, 32, 28, 0.35);
	}

	.publication-stats div {
		padding: 22px;
		border-right: 1px solid var(--line);
	}

	.publication-stats div:last-child {
		border-right: 0;
	}

	.publication-stats span {
		display: block;
		margin-bottom: 8px;
		color: var(--fg);
		font-size: clamp(1.7rem, 3vw, 2.5rem);
		font-weight: 900;
		line-height: 1;
	}

	.publication-stats p {
		margin-bottom: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.publication-years {
		display: grid;
		gap: clamp(42px, 6vw, 76px);
		padding: clamp(50px, 7vw, 92px) clamp(20px, 6vw, 88px);
	}

	.year-group {
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		gap: clamp(24px, 5vw, 64px);
		align-items: start;
	}

	.year-heading {
		position: sticky;
		top: 100px;
	}

	.year-heading h2 {
		margin-bottom: 8px;
		font-size: clamp(2.2rem, 4vw, 4rem);
		line-height: 1;
	}

	.year-heading span,
	.publication-meta {
		color: var(--muted);
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.publication-list {
		display: grid;
		gap: 12px;
	}

	.publication-card {
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: var(--radius);
		padding: clamp(20px, 3vw, 30px);
		background: var(--noise), var(--panel);
		backdrop-filter: var(--glass);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			0 12px 30px -22px rgba(23, 32, 28, 0.35);
	}

	.publication-card.highlighted {
		border-color: color-mix(in srgb, var(--teal) 45%, transparent);
		background: color-mix(in srgb, var(--teal) 16%, var(--panel));
	}

	.publication-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 12px;
		color: var(--teal);
	}

	.publication-meta strong {
		color: var(--clay);
	}

	.publication-card h3 {
		max-width: 980px;
		margin-bottom: 12px;
		font-size: clamp(1.15rem, 2vw, 1.55rem);
		line-height: 1.22;
	}

	.authors,
	.venue {
		color: var(--muted);
		line-height: 1.65;
	}

	.ivan {
		color: var(--fg);
		font-weight: 900;
	}

	.publication-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 18px;
	}

	.publication-actions a {
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 8px 12px;
		color: var(--teal);
		font-weight: 800;
	}

	footer {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 28px clamp(20px, 6vw, 88px);
		border-top: 1px solid var(--line);
		color: var(--muted);
	}

	.reveal {
		opacity: 0;
		transform: translateY(26px);
		transition:
			opacity 640ms ease,
			transform 640ms ease;
	}

	.reveal:global(.is-visible) {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}

	@media (max-width: 900px) {
		.publication-stats,
		.year-group {
			grid-template-columns: 1fr;
		}

		.publication-stats div {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.publication-stats div:last-child {
			border-bottom: 0;
		}

		.year-heading {
			position: static;
		}
	}

	@media (max-width: 640px) {
		h1 {
			font-size: clamp(3rem, 18vw, 4.5rem);
		}

		footer {
			flex-direction: column;
		}
	}
</style>
