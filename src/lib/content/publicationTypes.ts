export type PublicationRecord = {
	id: string;
	bibtexKey: string;
	entryKind: string;
	type: string;
	year: number | null;
	title: string;
	authors: string[];
	journal: string;
	volume: string;
	number: string;
	pages: string;
	doi: string;
	doiUrl: string;
	url: string;
	source: string;
	publicationStage: string;
	citationNote: string;
	highlighted: boolean;
	sourceOrder: number;
};

export function formatVenue(publication: PublicationRecord) {
	const parts = [publication.journal, publication.volume].filter(Boolean);
	const issue = publication.number ? `(${publication.number})` : '';
	const pages = publication.pages ? `, ${publication.pages}` : '';

	return `${parts.join(' ')}${issue}${pages}`;
}

export function formatAuthors(authors: string[], limit = 12) {
	if (authors.length <= limit) return authors.join(', ');

	const visibleAuthors = authors.slice(0, limit).join(', ');
	return `${visibleAuthors}, et al.`;
}
