<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import { group, logos } from '$lib/content/site';

	let { currentPage = 'home' }: { currentPage?: 'home' | 'publications' } = $props();
	let menuOpen = $state(false);

	const home = resolve('/');
	const navItems = [
		{ href: `${home}#research`, label: 'Research' },
		{ href: `${home}#projects`, label: 'Projects' },
		{ href: `${home}#people`, label: 'People' },
		{ href: resolve('/publications/'), label: 'Publications', page: 'publications' },
		{ href: `${home}#software`, label: 'Software' },
		{ href: `${home}#contact`, label: 'Contact' }
	];

	function closeMenu() {
		menuOpen = false;
	}
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && closeMenu()} />

<header class="site-header">
	<a class="brand" href={resolve("/")} aria-label="{group.name} home" onclick={closeMenu}>
		<img class="brand-logo" src={asset(group.logo)} alt="" width="320" height="215" />
	</a>

	<button
		class="menu-toggle"
		type="button"
		onclick={() => (menuOpen = !menuOpen)}
		aria-expanded={menuOpen}
		aria-controls="site-navigation"
		aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>

	<div class:open={menuOpen} class="header-panel" id="site-navigation">
		<div class="header-logos" aria-label="Affiliations">
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
		<nav aria-label="Primary navigation">
			{#each navItems as item}
				<a
					href={item.href}
					aria-current={item.page === currentPage ? 'page' : undefined}
					onclick={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
