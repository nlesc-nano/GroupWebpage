import { mkdir, rename, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const buildDir = resolve('build');
const flat = resolve(buildDir, 'publications.html');
const nestedDir = resolve(buildDir, 'publications');
const nested = resolve(nestedDir, 'index.html');

try {
	await access(flat, constants.F_OK);
} catch {
	process.exit(0);
}

try {
	await access(nested, constants.F_OK);
	process.exit(0);
} catch {
	// continue
}

await mkdir(nestedDir, { recursive: true });
await rename(flat, nested);
console.log('Moved publications.html -> publications/index.html for GitHub Pages');
