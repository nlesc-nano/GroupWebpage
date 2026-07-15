import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Resvg } from '@resvg/resvg-js';

const sourcePath = resolve('assets/source-logos/InfanteLab.png');
const source = await readFile(sourcePath);
const sourceData = `data:image/png;base64,${source.toString('base64')}`;

function render(svg, outputPath) {
	const png = new Resvg(svg, {
		background: '#ffffff',
		font: { loadSystemFonts: false }
	})
		.render()
		.asPng();

	return writeFile(resolve(outputPath), png);
}

const headerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="215" viewBox="0 0 2393 1611">
  <image href="${sourceData}" width="2393" height="1611" />
</svg>`;

const socialSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="808" viewBox="0 0 2393 1611">
  <image href="${sourceData}" width="2393" height="1611" />
</svg>`;

const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="250 0 1800 1000">
  <image href="${sourceData}" width="2393" height="1611" />
</svg>`;

await Promise.all([
	render(headerSvg, 'static/logos/infantelab-header.png'),
	render(faviconSvg, 'static/logos/infantelab-favicon.png'),
	render(socialSvg, 'static/logos/infantelab-social.png')
]);

const softwareLogos = [
	{ source: 'quantumdotspace.png', output: 'quantumdotspace-web.png', width: 512, height: 401, sourceWidth: 1220, sourceHeight: 956 },
	{ source: 'orchestrai.png', output: 'orchestrai-web.png', width: 512, height: 342, sourceWidth: 3169, sourceHeight: 2118 },
	{ source: 'qd-builder.png', output: 'qd-builder-web.png', width: 463, height: 512, sourceWidth: 9852, sourceHeight: 10902 },
	{ source: 'minibse.png', output: 'minibse-web.png', width: 512, height: 240, sourceWidth: 10632, sourceHeight: 4980 },
	{ source: 'auto-fox.png', output: 'auto-fox-web.png', width: 512, height: 512, sourceWidth: 5225, sourceHeight: 5225 }
];

await Promise.all(
	softwareLogos.map(async (logo) => {
		const image = await readFile(resolve('assets/source-logos', logo.source));
		const data = `data:image/png;base64,${image.toString('base64')}`;
		const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${logo.width}" height="${logo.height}" viewBox="0 0 ${logo.sourceWidth} ${logo.sourceHeight}">
  <image href="${data}" width="${logo.sourceWidth}" height="${logo.sourceHeight}" />
</svg>`;

		return render(svg, `static/logos/${logo.output}`);
	})
);

console.log('Generated optimized InfanteLab and software logo assets.');
