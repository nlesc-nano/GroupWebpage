<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Computational molecular science research group working on simulation, machine learning, electronic structure, and scientific software."
	/>
</svelte:head>

{@render children()}
