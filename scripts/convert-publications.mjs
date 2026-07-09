import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const inputPath = resolve(process.argv[2] ?? 'scopus_papers.bib');
const outputPath = resolve(process.argv[3] ?? 'src/lib/content/publications.json');

const highlightedTitleGroups = [
	['Interfacial Reconstructions and Engineering in III-V@II-VI Core-Shell Quantum Dots'],
	['Colloidal quantum dots for optoelectronics'],
	[
		'Fuzzy Band Structure of Quantum Dots by Bloch Orbital Expansion',
		'Fuzzy Band Structure of Quantum Dots by Bloch Orbital Expansion: Unconventional Insights into Geometric-Electronic Structure Relations'
	],
	['Surface Reconstructions in II-VI Quantum Dots'],
	[
		'Unveiling the Role of ZnCl2 in Enhancing the Photoluminescence Efficiency of Amino-As-Based InAs@ZnSe Quantum Dots',
		'Unveiling the Role of ZnCl2in Enhancing the Photoluminescence Efficiency of Amino-As-Based InAs@ZnSe Quantum Dots'
	],
	['Surface Chemistry of Lead Halide Perovskite Colloidal Nanocrystals'],
	['Classical Force Field Parameters for InP and InAs Quantum Dots with Various Surface Passivations'],
	['Ligand dynamics on the surface of CdSe nanocrystals']
];

const highlightedTitleKeys = new Set(highlightedTitleGroups.flat().map(normalizeTitle));

function stripBom(value) {
	return value.replace(/^\uFEFF/, '');
}

function normalizeWhitespace(value) {
	return String(value ?? '')
		.replace(/\s+/g, ' ')
		.trim();
}

function cleanValue(value) {
	return normalizeWhitespace(
		String(value ?? '')
			.replace(/[{}]/g, '')
			.replace(/[“”]/g, '"')
			.replace(/[’]/g, "'")
			.replace(/\s+–\s+/g, '-')
	);
}

function normalizeTitle(value) {
	return cleanValue(value)
		.toLowerCase()
		.replace(/[\u2010-\u2015]/g, '-')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();
}

function slugify(value) {
	return normalizeTitle(value).replace(/\s+/g, '-').slice(0, 90);
}

function parseBibtexEntries(text) {
	const normalizedText = text.replace(/}\s*(?=@[A-Z]+{)/g, '}\n\n');
	const entryStarts = [...normalizedText.matchAll(/^@\w+\{/gm)].map((match) => match.index);
	const entries = [];

	for (let index = 0; index < entryStarts.length; index += 1) {
		const start = entryStarts[index];
		const end = entryStarts[index + 1] ?? normalizedText.length;
		const entry = normalizedText.slice(start, end).trim();
		const lastBrace = entry.lastIndexOf('}');

		if (lastBrace !== -1) entries.push(entry.slice(0, lastBrace + 1));
	}

	return entries;
}

function splitFields(body) {
	const fields = [];
	let current = '';
	let depth = 0;
	let inQuotes = false;

	for (let index = 0; index < body.length; index += 1) {
		const char = body[index];
		const previous = body[index - 1];

		if (char === '"' && previous !== '\\') inQuotes = !inQuotes;
		if (!inQuotes && char === '{') depth += 1;
		if (!inQuotes && char === '}') depth -= 1;

		if (!inQuotes && depth === 0 && char === ',') {
			if (current.trim()) fields.push(current.trim());
			current = '';
			continue;
		}

		current += char;
	}

	if (current.trim()) fields.push(current.trim());
	return fields;
}

function unwrapFieldValue(rawValue) {
	let value = rawValue.trim().replace(/,$/, '').trim();

	if (
		(value.startsWith('{') && value.endsWith('}')) ||
		(value.startsWith('"') && value.endsWith('"'))
	) {
		value = value.slice(1, -1);
	}

	return cleanValue(value);
}

function parseEntry(rawEntry, sourceOrder) {
	const headerMatch = rawEntry.match(/^@(\w+)\s*\{\s*([^,]+)\s*,/);
	if (!headerMatch) return null;

	const entryKind = headerMatch[1];
	const bibtexKey = cleanValue(headerMatch[2]);
	const bodyStart = rawEntry.indexOf(',', rawEntry.indexOf('{')) + 1;
	const body = rawEntry.slice(bodyStart, -1);
	const fields = {};

	for (const field of splitFields(body)) {
		const equalIndex = field.indexOf('=');
		if (equalIndex === -1) continue;

		const key = field.slice(0, equalIndex).trim().toLowerCase();
		const value = unwrapFieldValue(field.slice(equalIndex + 1));
		fields[key] = value;
	}

	const title = fields.title ?? '';
	const year = Number.parseInt(fields.year ?? '', 10);
	const doi = fields.doi ?? '';
	const authors = (fields.author ?? '')
		.split(/\s+and\s+/)
		.map(cleanValue)
		.filter(Boolean);

	return {
		id: `${Number.isFinite(year) ? year : 'undated'}-${slugify(title || bibtexKey)}`,
		bibtexKey,
		entryKind,
		type: fields.type || entryKind,
		year: Number.isFinite(year) ? year : null,
		title,
		authors,
		journal: fields.journal ?? fields.booktitle ?? '',
		volume: fields.volume ?? '',
		number: fields.number ?? '',
		pages: fields.pages ?? '',
		doi,
		doiUrl: doi ? `https://doi.org/${doi}` : '',
		url: fields.url ?? '',
		source: fields.source ?? '',
		publicationStage: fields.publication_stage ?? '',
		citationNote: fields.note ?? '',
		highlighted: highlightedTitleKeys.has(normalizeTitle(title)),
		sourceOrder
	};
}

const source = stripBom(await readFile(inputPath, 'utf8'));
const records = parseBibtexEntries(source)
	.map((entry, index) => parseEntry(entry, index))
	.filter(Boolean)
	.sort((left, right) => {
		const yearDiff = (right.year ?? 0) - (left.year ?? 0);
		return yearDiff || left.sourceOrder - right.sourceOrder;
	});

const seenHighlighted = new Set(
	records.filter((record) => record.highlighted).map((record) => normalizeTitle(record.title))
);
const missingHighlighted = highlightedTitleGroups
	.filter((group) => !group.some((title) => seenHighlighted.has(normalizeTitle(title))))
	.map((group) => group[0]);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(`${outputPath}`, `${JSON.stringify(records, null, 2)}\n`);

console.log(`Read ${records.length} publication records from ${inputPath}`);
console.log(`Wrote ${outputPath}`);
console.log(`Highlighted ${records.filter((record) => record.highlighted).length} records`);

if (missingHighlighted.length > 0) {
	console.warn('Highlighted titles not found:');
	for (const title of missingHighlighted) console.warn(`- ${title}`);
}
