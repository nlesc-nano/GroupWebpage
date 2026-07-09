<script lang="ts">
	import {
		alumni,
		group,
		logos,
		news,
		openQuestions,
		people,
		profiles,
		projects,
		researchAreas,
		software
	} from '$lib/content/site';
	import rawPublications from '$lib/content/publications.json';
	import { formatAuthors, formatVenue, type PublicationRecord } from '$lib/content/publicationTypes';

	const allPublications = rawPublications as PublicationRecord[];
	const highlightedPublications = allPublications.filter((publication) => publication.highlighted);

	const navItems = [
		{ href: '#research', label: 'Research' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#people', label: 'People' },
		{ href: '/publications', label: 'Publications' },
		{ href: '#software', label: 'Software' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<svelte:head>
	<title>{group.name}</title>
</svelte:head>

<header class="site-header">
	<a class="brand" href="#top" aria-label="{group.name} home">
		<span class="brand-mark">{group.logoMark}</span>
		<span>{group.shortName}</span>
	</a>
	<div class="header-right">
		<div class="header-logos" aria-label="Affiliations">
			{#each logos as logo}
				<img src={logo.src} alt={logo.alt} />
			{/each}
		</div>
		<nav aria-label="Primary navigation">
			{#each navItems as item}
				<a href={item.href}>{item.label}</a>
			{/each}
		</nav>
	</div>
</header>

<main id="top">
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-copy">
			<p class="eyebrow">Computational molecular science</p>
			<h1 id="hero-title">{group.name}</h1>
			<p class="lede">{group.tagline}</p>
			<p class="pi-line">
				{group.pi}, {group.title}<br />
				{group.affiliation}
			</p>
			<div class="affiliation-logos" aria-label="Affiliations">
				{#each logos as logo}
					<img src={logo.src} alt={logo.alt} />
				{/each}
			</div>
			<p class="hero-description">{group.description}</p>
			<div class="hero-actions">
				<a class="button primary" href="#research">Explore research</a>
				<a class="button secondary" href="#contact">Get in touch</a>
			</div>
		</div>

		<div class="hero-visual" aria-hidden="true">
			<div class="orbital orbital-a"></div>
			<div class="orbital orbital-b"></div>
			<div class="orbital orbital-c"></div>
			<div class="node node-a"></div>
			<div class="node node-b"></div>
			<div class="node node-c"></div>
			<div class="node node-d"></div>
			<div class="spectrum"></div>
		</div>
	</section>

	<section class="intro-band" aria-label="Research positioning">
		<div>
			<span class="metric">4</span>
			<span>Quantum dot research pillars</span>
		</div>
		<div>
			<span class="metric">5</span>
			<span>Active software and platform projects</span>
		</div>
		<div>
			<span class="metric">BCMaterials</span>
			<span>UPV/EHU Science Park, Leioa</span>
		</div>
	</section>

	<section class="section" id="research">
		<div class="section-heading">
			<p class="eyebrow">Activities</p>
			<h2>Research themes</h2>
			<p>
				We combine atomistic modelling, electronic structure theory, machine learning, and
				open software to understand and design colloidal quantum dots.
			</p>
		</div>
		<div class="research-grid">
			{#each researchAreas as area}
				<article class="research-card">
					<p>{area.kicker}</p>
					<h3>{area.title}</h3>
					<span>{area.description}</span>
					<ul>
						{#each area.methods as method}
							<li>{method}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>

	<section class="section split" id="projects">
		<div class="section-heading sticky-heading">
			<p class="eyebrow">Current work</p>
			<h2>Featured projects</h2>
			<p>
				Current platforms and methods for computational quantum dot nanochemistry.
			</p>
		</div>
		<div class="project-list">
			{#each projects as project, index}
				<article class="project-card">
					<span class="project-index">0{index + 1}</span>
					<div>
						<p>{project.application} / {project.status}</p>
						<h3>{project.title}</h3>
						<span>{project.description}</span>
						{#if project.tags}
							<ul class="tag-list" aria-label={`${project.title} keywords`}>
								{#each project.tags as tag}
									<li>{tag}</li>
								{/each}
							</ul>
						{/if}
						{#if project.link}
							<a class="inline-link" href={project.link} target="_blank" rel="noreferrer">
								{project.linkLabel ?? 'Learn more'}
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="section" id="people">
		<div class="section-heading">
			<p class="eyebrow">Team</p>
			<h2>People</h2>
			<p>
				Current group members working on machine-learning force fields, atomistic quantum dot
				simulations, electronic structure, and digital platforms.
			</p>
		</div>
		<div class="people-grid">
			{#each people as member}
				<article class="person-card">
					<div class="avatar" aria-hidden="true">{member.name.slice(0, 1)}</div>
					<p>{member.role}</p>
					<h3>{member.name}</h3>
					<span>{member.focus}</span>
				</article>
			{/each}
		</div>
		<div class="alumni-block">
			<div class="section-heading compact-heading">
				<p class="eyebrow">Former members</p>
				<h2>Alumni</h2>
			</div>
			<div class="alumni-grid">
				{#each alumni as member}
					<article class="alumni-card">
						<p>{member.role}</p>
						<h3>{member.name}</h3>
						<span>{member.focus}</span>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="section publications-section" id="publications">
		<div class="section-heading">
			<p class="eyebrow">Selected outputs</p>
			<h2>Highlighted publications</h2>
			<p>
				A curated selection from the full Scopus publication export. The complete list is
				available in the publications tab.
			</p>
		</div>
		<div class="publication-list">
			{#each highlightedPublications as publication}
				<article class="publication">
					<span>{publication.year}</span>
					<div>
						<h3>{publication.title}</h3>
						<p>{formatAuthors(publication.authors)}</p>
						<p>{formatVenue(publication)}</p>
						{#if publication.doiUrl}
							<a href={publication.doiUrl} target="_blank" rel="noreferrer">DOI</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
		<a class="publication-link" href="/publications">View all {allPublications.length} publications</a>
	</section>

	<section class="section two-column" id="software">
		<div>
			<p class="eyebrow">Reusable science</p>
			<h2>Software and resources</h2>
			<p>
				Open platforms and computational tools developed by the group for model construction,
				force-field training, excited-state analysis, and large-scale simulations.
			</p>
		</div>
		<div class="software-stack">
			{#each software as item}
				<a class="software-card" href={item.link} target="_blank" rel="noreferrer">
					<span>{item.linkLabel}</span>
					<h3>{item.name}</h3>
					<p>{item.description}</p>
					<ul class="tag-list" aria-label={`${item.name} capabilities`}>
						{#each item.tags as tag}
							<li>{tag}</li>
						{/each}
					</ul>
				</a>
			{/each}
		</div>
	</section>

	<section class="section two-column news-contact">
		<div id="news">
			<p class="eyebrow">Updates</p>
			<h2>News</h2>
			<div class="timeline">
				{#each news as item}
					<article>
						<span>{item.date}</span>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</article>
				{/each}
			</div>
		</div>
		<div class="contact-panel" id="contact">
			<p class="eyebrow">Contact</p>
			<h2>Work with us</h2>
			<p>{group.heroNote}</p>
			<dl>
				<div>
					<dt>Principal Investigator</dt>
					<dd>{group.pi}</dd>
				</div>
				<div>
					<dt>Location</dt>
					<dd>{group.location}</dd>
				</div>
				<div>
					<dt>Address</dt>
					<dd>{group.address}</dd>
				</div>
				<div>
					<dt>Email</dt>
					<dd><a href={`mailto:${group.email}`}>{group.email}</a></dd>
				</div>
			</dl>
			<div class="profile-links" aria-label="Profile links">
				{#each profiles as profile}
					<a href={profile.href} target="_blank" rel="noreferrer">{profile.label}</a>
				{/each}
			</div>
			<div class="contact-logos" aria-label="Affiliation logos">
				{#each logos as logo}
					<img src={logo.src} alt={logo.alt} />
				{/each}
			</div>
		</div>
	</section>

	<section class="section missing-info" aria-labelledby="missing-info-title">
		<div class="section-heading">
			<p class="eyebrow">To complete next</p>
			<h2 id="missing-info-title">Missing details</h2>
			<p>
				These are the next pieces of information needed to turn the draft into a complete
				public group webpage.
			</p>
		</div>
		<ul>
			{#each openQuestions as question}
				<li>{question}</li>
			{/each}
		</ul>
	</section>
</main>

<footer>
	<span>{group.name}</span>
	<a href="#top">Back to top</a>
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

	main {
		overflow: hidden;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
		gap: clamp(32px, 6vw, 96px);
		align-items: center;
		min-height: calc(100vh - 78px);
		padding: clamp(44px, 7vw, 96px) clamp(20px, 6vw, 88px) clamp(28px, 4vw, 56px);
	}

	.hero-copy {
		max-width: 760px;
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
		margin-bottom: 24px;
		font-size: clamp(3.3rem, 8vw, 7.5rem);
		line-height: 0.92;
		letter-spacing: 0;
		max-width: 880px;
	}

	h2 {
		margin-bottom: 16px;
		font-size: clamp(2rem, 4vw, 4rem);
		line-height: 1;
		letter-spacing: 0;
	}

	h3 {
		margin-bottom: 10px;
		font-size: 1.1rem;
		line-height: 1.18;
	}

	.lede {
		max-width: 690px;
		margin-bottom: 18px;
		color: #31413a;
		font-size: clamp(1.35rem, 2.4vw, 2rem);
		line-height: 1.22;
	}

	.hero-description,
	.pi-line,
	.section-heading p,
	.two-column > div > p,
	.contact-panel p {
		color: var(--muted);
		font-size: 1.04rem;
		line-height: 1.7;
	}

	.pi-line {
		max-width: 620px;
		margin-bottom: 18px;
		color: #31413a;
		font-weight: 800;
	}

	.affiliation-logos {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
		margin: 0 0 24px;
	}

	.affiliation-logos img {
		width: auto;
		max-width: min(280px, 100%);
		max-height: 54px;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 34px;
	}

	.button {
		display: inline-flex;
		min-height: 48px;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		padding: 0 20px;
		font-weight: 800;
	}

	.button.primary {
		background: var(--ink);
		color: white;
	}

	.button.secondary {
		border: 1px solid var(--line);
		background: rgba(255, 255, 255, 0.55);
	}

	.hero-visual {
		position: relative;
		min-height: 560px;
		border-left: 1px solid var(--line);
		background:
			linear-gradient(90deg, rgba(23, 32, 28, 0.08) 1px, transparent 1px),
			linear-gradient(rgba(23, 32, 28, 0.08) 1px, transparent 1px);
		background-size: 42px 42px;
	}

	.orbital,
	.node,
	.spectrum {
		position: absolute;
	}

	.orbital {
		border: 1px solid rgba(23, 110, 114, 0.4);
		border-radius: 50%;
		transform: rotate(-22deg);
	}

	.orbital-a {
		inset: 12% 8% 18% 6%;
	}

	.orbital-b {
		inset: 23% 20% 28% 16%;
		border-color: rgba(187, 111, 79, 0.45);
		transform: rotate(28deg);
	}

	.orbital-c {
		inset: 36% 10% 14% 38%;
		border-color: rgba(201, 154, 63, 0.55);
	}

	.node {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--teal);
		box-shadow: 0 0 0 10px rgba(23, 110, 114, 0.12);
	}

	.node-a {
		left: 24%;
		top: 24%;
	}

	.node-b {
		right: 18%;
		top: 40%;
		background: var(--clay);
	}

	.node-c {
		left: 42%;
		bottom: 18%;
		background: var(--gold);
	}

	.node-d {
		right: 34%;
		bottom: 36%;
		background: var(--sage);
	}

	.spectrum {
		right: 8%;
		bottom: 8%;
		width: min(220px, 42vw);
		height: 120px;
		border-bottom: 2px solid var(--ink);
		background:
			linear-gradient(to top, rgba(23, 110, 114, 0.24), transparent),
			repeating-linear-gradient(90deg, transparent 0 12px, rgba(23, 32, 28, 0.35) 12px 14px);
		clip-path: polygon(0 100%, 5% 80%, 10% 88%, 16% 40%, 22% 75%, 31% 18%, 40% 78%, 51% 28%, 62% 92%, 73% 54%, 85% 86%, 100% 62%, 100% 100%);
	}

	.intro-band {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		background: #edece4;
	}

	.intro-band div {
		display: grid;
		gap: 6px;
		padding: 26px clamp(20px, 5vw, 64px);
		border-right: 1px solid var(--line);
		color: var(--muted);
	}

	.intro-band div:last-child {
		border-right: 0;
	}

	.metric {
		color: var(--ink);
		font-size: clamp(1.7rem, 3vw, 2.6rem);
		font-weight: 900;
		line-height: 1;
	}

	.section {
		padding: clamp(60px, 8vw, 120px) clamp(20px, 6vw, 88px);
	}

	.section-heading {
		max-width: 820px;
		margin-bottom: 34px;
	}

	.research-grid,
	.people-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 16px;
	}

	.research-card,
	.project-card,
	.person-card,
	.software-card,
	.contact-panel {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: rgba(255, 255, 255, 0.72);
	}

	.research-card {
		display: flex;
		min-height: 360px;
		flex-direction: column;
		padding: 24px;
	}

	.research-card p,
	.project-card p,
	.person-card p,
	.software-card span {
		margin-bottom: 12px;
		color: var(--teal);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.research-card span,
	.project-card span,
	.person-card span,
	.software-card p,
	.publication p,
	.timeline p {
		color: var(--muted);
		line-height: 1.6;
	}

	.research-card ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0;
		margin: auto 0 0;
		list-style: none;
	}

	.research-card li {
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 7px 10px;
		background: #f7f6f1;
		color: #405049;
		font-size: 0.82rem;
	}

	.split,
	.two-column {
		display: grid;
		grid-template-columns: minmax(260px, 0.75fr) minmax(0, 1.25fr);
		gap: clamp(28px, 6vw, 84px);
		align-items: start;
	}

	.sticky-heading {
		position: sticky;
		top: 110px;
	}

	.project-list {
		display: grid;
		gap: 14px;
	}

	.project-card {
		display: grid;
		grid-template-columns: 72px 1fr;
		gap: 20px;
		padding: 24px;
	}

	.project-index {
		color: var(--clay);
		font-size: 1.6rem;
		font-weight: 900;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0;
		margin: 18px 0 0;
		list-style: none;
	}

	.tag-list li {
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 7px 10px;
		background: #f7f6f1;
		color: #405049;
		font-size: 0.8rem;
	}

	.inline-link {
		display: inline-flex;
		margin-top: 18px;
		color: var(--teal);
		font-weight: 900;
	}

	.person-card {
		padding: 22px;
	}

	.alumni-block {
		margin-top: clamp(42px, 6vw, 76px);
	}

	.compact-heading {
		margin-bottom: 22px;
	}

	.compact-heading h2 {
		font-size: clamp(1.7rem, 3vw, 2.8rem);
	}

	.alumni-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}

	.alumni-card {
		border-top: 1px solid var(--line);
		padding: 18px 0;
	}

	.alumni-card p {
		margin-bottom: 8px;
		color: var(--clay);
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.alumni-card span {
		color: var(--muted);
		line-height: 1.55;
	}

	.avatar {
		display: grid;
		width: 72px;
		height: 72px;
		margin-bottom: 22px;
		place-items: center;
		border-radius: 50%;
		background: #d8dfd2;
		color: var(--ink);
		font-size: 1.5rem;
		font-weight: 900;
	}

	.publications-section {
		background: #17201c;
		color: white;
	}

	.publications-section .eyebrow,
	.publications-section .section-heading p {
		color: #a6d5ca;
	}

	.publication-list {
		display: grid;
		gap: 1px;
		background: rgba(255, 255, 255, 0.16);
	}

	.publication {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 24px;
		padding: 24px 0;
		background: #17201c;
	}

	.publication > span {
		color: #a6d5ca;
		font-weight: 900;
	}

	.publication a,
	.publication-link {
		color: #a6d5ca;
		font-weight: 900;
	}

	.publication-link {
		display: inline-flex;
		margin-top: 26px;
		border: 1px solid rgba(166, 213, 202, 0.45);
		border-radius: 999px;
		padding: 11px 15px;
	}

	.software-stack,
	.timeline {
		display: grid;
		gap: 14px;
	}

	.software-card {
		display: block;
		padding: 24px;
		color: inherit;
		transition:
			transform 160ms ease,
			border-color 160ms ease;
	}

	.software-card:hover {
		border-color: var(--teal);
		transform: translateY(-2px);
	}

	.timeline article {
		border-top: 1px solid var(--line);
		padding: 20px 0;
	}

	.timeline span {
		display: block;
		margin-bottom: 10px;
		color: var(--clay);
		font-weight: 900;
	}

	.contact-panel {
		padding: clamp(24px, 4vw, 40px);
		background: #e8eadf;
	}

	dl {
		display: grid;
		gap: 18px;
		margin: 30px 0 0;
	}

	dt {
		color: var(--muted);
		font-size: 0.8rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	dd {
		margin: 6px 0 0;
		font-weight: 800;
		line-height: 1.45;
	}

	.profile-links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 28px;
	}

	.profile-links a,
	.missing-info li {
		border: 1px solid var(--line);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.68);
	}

	.profile-links a {
		padding: 8px 11px;
		color: var(--teal);
		font-size: 0.88rem;
		font-weight: 800;
	}

	.contact-logos {
		display: grid;
		gap: 14px;
		margin-top: 30px;
	}

	.contact-logos img {
		width: 100%;
		max-height: 70px;
		object-fit: contain;
		object-position: left center;
		mix-blend-mode: multiply;
	}

	.missing-info {
		background: #eeeee6;
	}

	.missing-info ul {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.missing-info li {
		padding: 10px 14px;
		color: #405049;
	}

	footer {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 28px clamp(20px, 6vw, 88px);
		border-top: 1px solid var(--line);
		color: var(--muted);
	}

	@media (max-width: 980px) {
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

		.hero,
		.split,
		.two-column {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: auto;
		}

		.hero-visual {
			min-height: 380px;
			border-left: 0;
			border-top: 1px solid var(--line);
		}

		.research-grid,
		.people-grid,
		.alumni-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.sticky-heading {
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

		.hero {
			padding-top: 38px;
		}

		h1 {
			font-size: clamp(2.7rem, 17vw, 4.5rem);
		}

		.hero-actions,
		footer {
			flex-direction: column;
		}

		.button {
			width: 100%;
		}

		.hero-visual {
			min-height: 300px;
		}

		.intro-band,
		.research-grid,
		.people-grid,
		.alumni-grid {
			grid-template-columns: 1fr;
		}

		.affiliation-logos img {
			max-height: 44px;
		}

		.intro-band div {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.project-card,
		.publication {
			grid-template-columns: 1fr;
		}
	}
</style>
