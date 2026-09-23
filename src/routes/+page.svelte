<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { reveal } from '$lib/actions/reveal';
	import {
		alumni,
		group,
		logos,
		news,
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

	// Photos and logos are dropped in later; hide the image if the file is not there yet
	// so the initials avatar / index number fallback shows instead of a broken image.
	function hideMissing(event: Event) {
		const image = event.currentTarget as HTMLImageElement;
		image.style.display = 'none';
	}

	function initials(name: string) {
		return name
			.replace(/^(Prof\.|Dr\.)\s+/i, '')
			.split(/\s+/)
			.map((part) => part[0])
			.filter(Boolean)
			.slice(0, 2)
			.join('')
			.toUpperCase();
	}
</script>

<svelte:head>
	<title>{group.name}</title>
</svelte:head>

<SiteHeader />

<main id="main-content">
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
					{#if logo.href}
						<a
							href={logo.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit ${logo.name} website`}
						>
							<img src={asset(logo.src)} alt={logo.alt} />
						</a>
					{:else}
						<img src={asset(logo.src)} alt={logo.alt} />
					{/if}
				{/each}
			</div>
			<p class="hero-description">{group.description}</p>
			<div class="hero-actions">
				<a class="button primary" href="#research">Explore research</a>
				<a class="button secondary" href="#contact">Get in touch</a>
			</div>
		</div>
	</section>

	<section class="intro-band" aria-label="Research positioning">
		<div class="reveal" use:reveal>
			<span class="metric">4</span>
			<span>Quantum dot research pillars</span>
		</div>
		<div class="reveal" use:reveal>
			<span class="metric">5</span>
			<span>Active software and platform projects</span>
		</div>
		<div class="reveal" use:reveal>
			<span class="metric">BCMaterials</span>
			<span>UPV/EHU Science Park, Leioa</span>
		</div>
	</section>

	<section class="section" id="research">
		<div class="section-heading reveal" use:reveal>
			<p class="eyebrow">Activities</p>
			<h2>Research themes</h2>
			<p>
				We combine atomistic modelling, electronic structure theory, machine learning, and
				open software to understand and design colloidal quantum dots.
			</p>
		</div>
		<div class="research-grid">
			{#each researchAreas as area, index}
				<article
					class="research-card reveal"
					use:reveal
					style="transition-delay: {Math.min(index, 6) * 70}ms"
				>
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
			<h2>Research programmes</h2>
			<p>
				Scientific questions that connect our atomistic methods, machine learning, and
				experiment-facing nanomaterials research.
			</p>
		</div>
		<div class="project-list">
			{#each projects as project, index}
				<article
					class="project-card reveal"
					use:reveal
					style="transition-delay: {Math.min(index, 6) * 70}ms"
				>
					<span class="project-media">
						<span class="project-index">0{index + 1}</span>
					</span>
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
		<div class="section-heading reveal" use:reveal>
			<p class="eyebrow">Team</p>
			<h2>People</h2>
			<p>
				Current group members working on machine-learning force fields, atomistic quantum dot
				simulations, electronic structure, and digital platforms.
			</p>
		</div>
		<div class="people-grid">
			{#each people as member, index}
				<article
					class="person-card reveal"
					use:reveal
					style="transition-delay: {Math.min(index, 6) * 70}ms"
				>
					<div class="avatar">
						<span aria-hidden="true">{initials(member.name)}</span>
						{#if member.photo}
							<img src={asset(member.photo)} alt={member.name} loading="lazy" onerror={hideMissing} />
						{/if}
					</div>
					<p>{member.role}</p>
					<h3>{member.name}</h3>
					<span>{member.focus}</span>
				</article>
			{/each}
		</div>
		<div class="alumni-block">
			<div class="section-heading compact-heading reveal" use:reveal>
				<p class="eyebrow">Former members</p>
				<h2>Alumni</h2>
			</div>
			<div class="alumni-grid">
				{#each alumni as member, index}
					<article
						class="alumni-card reveal"
						use:reveal
						style="transition-delay: {Math.min(index, 6) * 60}ms"
					>
						<div class="avatar avatar-small">
							<span aria-hidden="true">{initials(member.name)}</span>
							{#if member.photo}
								<img src={asset(member.photo)} alt={member.name} loading="lazy" onerror={hideMissing} />
							{/if}
						</div>
						<div>
							<p>{member.role}</p>
							<h3>{member.name}</h3>
							<span>{member.focus}</span>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="section publications-section" id="publications">
		<div class="section-heading reveal" use:reveal>
			<p class="eyebrow">Selected outputs</p>
			<h2>Highlighted publications</h2>
			<p>
				A curated selection from Ivan Infante's Scopus publication export dated 9 July 2026.
				The complete record is available on the publications page.
			</p>
		</div>
		<div class="publication-list">
			{#each highlightedPublications as publication, index}
				<article
					class="publication reveal"
					use:reveal
					style="transition-delay: {Math.min(index, 6) * 70}ms"
				>
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
		<a class="publication-link" href={resolve('/publications/')}>View all {allPublications.length} publications</a>
	</section>

	<section class="section two-column" id="software">
		<div class="reveal" use:reveal>
			<p class="eyebrow">Reusable science</p>
			<h2>Software and resources</h2>
			<p>
				Open platforms and computational tools developed by the group for model construction,
				force-field training, excited-state analysis, and large-scale simulations.
			</p>
		</div>
		<div class="software-stack">
			{#each software as item, index}
				<a
					class="software-card reveal"
					use:reveal
					style="transition-delay: {Math.min(index, 6) * 70}ms"
					href={item.link}
					target="_blank"
					rel="noreferrer"
				>
					<div class="software-head">
						<span class="software-logo">
							<span aria-hidden="true">{item.name.slice(0, 1)}</span>
							{#if item.logo}
								<img src={asset(item.logo)} alt={`${item.name} logo`} loading="lazy" onerror={hideMissing} />
							{/if}
						</span>
						<div>
							<span>{item.linkLabel}</span>
							<h3>{item.name}</h3>
						</div>
					</div>
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
		<div id="news" class="reveal" use:reveal>
			<p class="eyebrow">Updates</p>
			<h2>News</h2>
			<div class="timeline">
				{#each news as item, index}
					<article class="reveal" use:reveal style="transition-delay: {Math.min(index, 6) * 70}ms">
						<span>{item.date}</span>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</article>
				{/each}
			</div>
		</div>
		<div class="contact-panel reveal" use:reveal id="contact">
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
					{#if logo.href}
						<a
							href={logo.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Visit ${logo.name} website`}
						>
							<img src={asset(logo.src)} alt={logo.alt} />
						</a>
					{:else}
						<img src={asset(logo.src)} alt={logo.alt} />
					{/if}
				{/each}
			</div>
			<ContactForm />
		</div>
	</section>

</main>

<footer>
	<span>{group.name}</span>
	<a href="#main-content">Back to top</a>
</footer>

<style>
	footer a:hover {
		color: var(--teal);
	}

	.affiliation-logos a,
	.contact-logos a {
		display: inline-flex;
		border-radius: 6px;
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	.affiliation-logos a:hover,
	.contact-logos a:hover {
		transform: translateY(-2px);
		opacity: 0.82;
	}

	.affiliation-logos a:focus-visible,
	.contact-logos a:focus-visible {
		outline: 3px solid color-mix(in srgb, var(--teal) 45%, transparent);
		outline-offset: 4px;
	}

	main {
		overflow: hidden;
	}

	.hero {
		display: flex;
		align-items: center;
		min-height: clamp(580px, 78vh, 760px);
		padding: clamp(44px, 7vw, 96px) clamp(20px, 6vw, 88px) clamp(28px, 4vw, 56px);
	}

	.hero-copy {
		width: 100%;
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
		max-width: 1500px;
		margin-bottom: 24px;
		font-size: clamp(3.3rem, 6.4vw, 6.75rem);
		line-height: 0.95;
		letter-spacing: 0;
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
		color: var(--fg);
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
		color: var(--fg);
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
		background: var(--noise), var(--panel);
		backdrop-filter: var(--glass);
	}

	.intro-band {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		background: var(--noise), var(--panel);
		backdrop-filter: var(--glass);
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
		color: var(--fg);
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
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: var(--radius);
		background: var(--noise), var(--panel);
		backdrop-filter: var(--glass);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			0 12px 30px -22px rgba(23, 32, 28, 0.35);
	}

	.research-card,
	.project-card,
	.person-card {
		transition:
			transform 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.research-card:hover,
	.project-card:hover,
	.person-card:hover {
		transform: translateY(-3px);
		border-color: rgba(23, 110, 114, 0.45);
		box-shadow: 0 18px 40px -28px rgba(23, 32, 28, 0.5);
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
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 999px;
		padding: 7px 10px;
		background: var(--noise), rgba(255, 255, 255, 0.32);
		color: var(--muted);
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

	.project-media {
		position: relative;
		display: grid;
		width: 72px;
		height: 72px;
		place-items: center;
		overflow: hidden;
		border-radius: 12px;
		background: var(--noise), rgba(255, 255, 255, 0.32);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
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
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 999px;
		padding: 7px 10px;
		background: var(--noise), rgba(255, 255, 255, 0.32);
		color: var(--muted);
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
		display: flex;
		align-items: flex-start;
		gap: 14px;
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
		position: relative;
		display: grid;
		width: 84px;
		height: 84px;
		margin-bottom: 22px;
		place-items: center;
		overflow: hidden;
		border-radius: 50%;
		background: linear-gradient(150deg, #d8dfd2, #c3d3c9);
		box-shadow: inset 0 0 0 1px rgba(23, 32, 28, 0.08);
		color: var(--ink);
		font-size: 1.6rem;
		font-weight: 900;
		letter-spacing: 0.02em;
	}

	.avatar img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-small {
		width: 52px;
		height: 52px;
		margin-bottom: 0;
		flex: 0 0 auto;
		font-size: 1rem;
	}

	.publication-list {
		display: grid;
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: var(--radius);
		padding: 4px clamp(20px, 3vw, 32px);
		background: var(--noise), var(--panel);
		backdrop-filter: var(--glass);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			0 12px 30px -22px rgba(23, 32, 28, 0.35);
	}

	.publication {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid var(--line);
	}

	.publication:first-child {
		border-top: 0;
	}

	.publication > span {
		color: var(--teal);
		font-weight: 900;
	}

	.publication a,
	.publication-link {
		color: var(--teal);
		font-weight: 900;
	}

	.publication-link {
		display: inline-flex;
		margin-top: 26px;
		border: 1px solid var(--line);
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
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.software-card:hover {
		border-color: var(--teal);
		transform: translateY(-2px);
		box-shadow: 0 18px 40px -28px rgba(23, 32, 28, 0.5);
	}

	.software-head {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
	}

	.software-head > div {
		display: grid;
		gap: 2px;
	}

	.software-head h3 {
		margin-bottom: 0;
	}

	.software-logo {
		position: relative;
		display: grid;
		width: 54px;
		height: 54px;
		flex: 0 0 auto;
		place-items: center;
		overflow: hidden;
		border-radius: 12px;
		background: var(--noise), rgba(255, 255, 255, 0.32);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
		color: var(--teal);
		font-size: 1.35rem;
		font-weight: 900;
	}

	.software-logo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 7px;
		object-fit: contain;
		background: #ffffff;
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
		background: var(--noise), var(--panel-strong);
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

	.profile-links a {
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

	@media (max-width: 980px) {
		.split,
		.two-column {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: auto;
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
