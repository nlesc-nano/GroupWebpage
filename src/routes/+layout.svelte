<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { group, profiles } from '$lib/content/site';
	import '../app.css';

	let { children } = $props();

	const description =
		'InfanteLab develops computational nanochemistry, machine learning, atomistic simulation, and open scientific software for colloidal quantum dots.';
	const siteUrl = env.PUBLIC_SITE_URL?.replace(/\/$/, '');
	const canonicalUrl = $derived(siteUrl ? `${siteUrl}${page.url.pathname}` : undefined);
	const socialImage = siteUrl
		? `${siteUrl}/logos/infantelab-social.png`
		: asset('/logos/infantelab-social.png');
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ResearchOrganization',
		name: group.name,
		alternateName: group.shortName,
		description,
		email: group.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: group.address,
			addressLocality: 'Leioa',
			addressRegion: 'Bizkaia',
			postalCode: '48940',
			addressCountry: 'ES'
		},
		parentOrganization: {
			'@type': 'ResearchOrganization',
			name: 'BCMaterials'
		},
		sameAs: profiles.map((profile) => profile.href)
	};
	const structuredDataMarkup =
		`<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}<` +
		'/script>';
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={asset('/logos/infantelab-favicon.png')} />
	<link rel="apple-touch-icon" href={asset('/logos/infantelab-favicon.png')} />
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}
	<meta name="description" content={description} />
	<meta name="theme-color" content="#f7f6f1" />
	<meta name="robots" content="index, follow" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={group.shortName} />
	<meta property="og:title" content={group.name} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:alt" content="InfanteLab molecular nanostructure logo" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={group.name} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={socialImage} />
	{@html structuredDataMarkup}
</svelte:head>

<div class="site-backdrop" aria-hidden="true"></div>
<a class="skip-link" href="#main-content">Skip to main content</a>
{@render children()}

<style>
	.site-backdrop {
		position: fixed;
		inset: 0;
		z-index: -1;
		background-color: #eae8de;
		background-image:
			radial-gradient(120% 100% at 0% -10%, rgba(88, 130, 98, 0.55), transparent 60%),
			radial-gradient(110% 95% at 105% 0%, rgba(23, 110, 114, 0.48), transparent 58%),
			radial-gradient(130% 110% at 50% 55%, rgba(224, 178, 90, 0.4), transparent 65%),
			radial-gradient(110% 95% at -5% 105%, rgba(201, 154, 63, 0.42), transparent 58%),
			radial-gradient(120% 100% at 105% 105%, rgba(187, 111, 79, 0.5), transparent 60%);
		pointer-events: none;
	}
</style>
