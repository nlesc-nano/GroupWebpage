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

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 12px clamp(18px, 4vw, 56px);
		border-bottom: 1px solid var(--line);
		background: var(--noise), var(--panel-strong);
		backdrop-filter: var(--glass);
	}

	.brand {
		display: inline-flex;
		flex: 0 0 auto;
		border-radius: 6px;
	}

	.brand:focus-visible,
	.header-logos a:focus-visible {
		outline: 3px solid color-mix(in srgb, var(--teal) 45%, transparent);
		outline-offset: 4px;
	}

	.brand-logo {
		display: block;
		width: auto;
		height: 54px;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	.header-panel {
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

	.header-logos a {
		display: inline-flex;
		border-radius: 6px;
		transition: opacity 160ms ease, transform 160ms ease;
	}

	.header-logos a:hover {
		opacity: 0.82;
		transform: translateY(-2px);
	}

	.header-logos img {
		width: auto;
		max-width: 150px;
		max-height: 32px;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 8px 18px;
		color: var(--muted);
		font-size: 0.94rem;
	}

	nav a {
		border-radius: 4px;
	}

	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--teal);
	}

	nav a:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--teal) 40%, transparent);
		outline-offset: 4px;
	}

	.menu-toggle {
		display: none;
		width: 46px;
		height: 46px;
		place-items: center;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: var(--noise), var(--panel);
		cursor: pointer;
	}

	.menu-toggle span {
		display: block;
		width: 18px;
		height: 2px;
		margin: 2px 0;
		background: var(--fg);
		transition: transform 160ms ease, opacity 160ms ease;
	}

	.menu-toggle[aria-expanded='true'] span:first-child {
		transform: translateY(6px) rotate(45deg);
	}

	.menu-toggle[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}

	.menu-toggle[aria-expanded='true'] span:last-child {
		transform: translateY(-6px) rotate(-45deg);
	}

	@media (max-width: 980px) {
		.site-header {
			padding-block: 10px;
		}

		.menu-toggle {
			display: grid;
		}

		.header-panel {
			position: absolute;
			top: 100%;
			left: 0;
			display: none;
			width: 100%;
			align-items: flex-start;
			border-top: 1px solid var(--line);
			border-bottom: 1px solid var(--line);
			padding: 20px clamp(18px, 4vw, 56px) 24px;
			background: var(--noise), var(--panel-strong);
			box-shadow: 0 18px 30px rgba(23, 32, 28, 0.1);
			flex-direction: column;
		}

		.header-panel.open {
			display: flex;
		}

		nav {
			width: 100%;
			align-items: stretch;
			flex-direction: column;
			gap: 0;
		}

		nav a {
			padding: 11px 0;
			border-bottom: 1px solid var(--line);
			font-size: 1rem;
			font-weight: 750;
		}
	}

	@media (max-width: 640px) {
		.brand-logo {
			height: 46px;
		}

		.header-logos img {
			max-width: 120px;
			max-height: 28px;
		}
	}
</style>
