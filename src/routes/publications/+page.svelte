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
