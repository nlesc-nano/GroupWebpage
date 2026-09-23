<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { group, logos } from '$lib/content/site';
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
</svelte:head>

<header class="site-header">
	<a class="brand" href={resolve('/')} aria-label="{group.name} home">
		<span class="brand-mark">{group.logoMark}</span>
		<span>{group.shortName}</span>
	</a>
	<div class="header-right">
		<div class="header-logos" aria-label="Affiliations">
			{#each logos as logo}
				<img src={asset(logo.src)} alt={logo.alt} />
			{/each}
		</div>
		<nav aria-label="Primary navigation">
			<a href={`${resolve('/')}#research`}>Research</a>
			<a href={`${resolve('/')}#projects`}>Projects</a>
			<a href={`${resolve('/')}#people`}>People</a>
			<a aria-current="page" href={resolve('/publications/')}>Publications</a>
			<a href={`${resolve('/')}#software`}>Software</a>
			<a href={`${resolve('/')}#contact`}>Contact</a>
		</nav>
	</div>
</header>

<main>
	<section class="page-hero">
		<p class="eyebrow">Publication record</p>
		<h1>Publications</h1>
		<p>
			Full publication list generated from the Scopus BibTeX export. Records are grouped by year
			and sorted newest first.
		</p>
		<div class="publication-stats">
			<div>
				<span>{publications.length}</span>
				<p>Total records</p>
			</div>
			<div>
				<span>{publications.filter((publication) => publication.highlighted).length}</span>
				<p>Highlighted on homepage</p>
			</div>
			<div>
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
					{#each yearPublications as publication}
						<article class:highlighted={publication.highlighted} class="publication-card">
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
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 18px clamp(18px, 4vw, 56px);
		border-bottom: 1px solid rgba(23, 32, 28, 0.08);
		background: rgba(247, 246, 241, 0.9);
		backdrop-filter: blur(18px);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-weight: 800;
		white-space: nowrap;
	}

	.brand-mark {
		display: grid;
		width: 40px;
		height: 40px;
		place-items: center;
		border: 1px solid var(--ink);
		border-radius: 50%;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 8px 18px;
		color: var(--muted);
		font-size: 0.94rem;
	}

	nav a:hover,
	nav a[aria-current='page'],
	footer a:hover {
		color: var(--teal);
	}

	.header-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 22px;
	}

	.header-logos {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.header-logos img {
		width: auto;
		max-width: 150px;
		max-height: 32px;
		object-fit: contain;
		mix-blend-mode: multiply;
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
		gap: 1px;
		margin-top: 36px;
		background: var(--line);
	}

	.publication-stats div {
		padding: 22px;
		background: #edece4;
	}

	.publication-stats span {
		display: block;
		margin-bottom: 8px;
		color: var(--ink);
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
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: clamp(20px, 3vw, 30px);
		background: rgba(255, 255, 255, 0.72);
	}

	.publication-card.highlighted {
		border-color: rgba(23, 110, 114, 0.45);
		background: #eef5ef;
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
		color: var(--ink);
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

	@media (max-width: 900px) {
		.site-header {
			align-items: flex-start;
			flex-direction: column;
		}

		.header-right {
			align-items: flex-start;
			flex-direction: column;
			gap: 12px;
		}

		nav {
			justify-content: flex-start;
		}

		.publication-stats,
		.year-group {
			grid-template-columns: 1fr;
		}

		.year-heading {
			position: static;
		}
	}

	@media (max-width: 640px) {
		.site-header {
			padding: 14px 18px;
		}

		nav {
			gap: 8px 12px;
			font-size: 0.86rem;
		}

		.header-logos img {
			max-width: 120px;
			max-height: 28px;
		}

		h1 {
			font-size: clamp(3rem, 18vw, 4.5rem);
		}

		footer {
			flex-direction: column;
		}
	}
</style>
