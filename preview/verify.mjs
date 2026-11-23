import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, renderPageHtml } from './pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const REQUIRED_THEME_FILES = [
	'medexos-surgical/style.css',
	'medexos-surgical/functions.php',
	'medexos-surgical/header.php',
	'medexos-surgical/footer.php',
	'medexos-surgical/front-page.php',
	'medexos-surgical/page.php',
	'medexos-surgical/index.php',
	'medexos-surgical/templates/elementor-full-width.php',
	'medexos-surgical/assets/reference-layout.css',
	'medexos-surgical/assets/menu.js',
	'medexos-surgical/assets/logo.png',
	'medexos-surgical/assets/technical.svg',
	'medexos-surgical/assets/manufacturing.svg',
	'medexos-surgical/assets/generated-professional.jpg',
	'PAGE-MAP.md',
	'README.md',
];

async function verify() {
	for (const relPath of REQUIRED_THEME_FILES) {
		await fs.access(path.join(rootDir, relPath));
	}

	const routes = Object.keys(PAGES);
	let internalLinkChecks = 0;
	let assetChecks = 0;

	for (const route of routes) {
		const page = PAGES[route];
		const templatePath = path.join(rootDir, 'elementor-templates', page.templateFile);
		const raw = await fs.readFile(templatePath, 'utf-8');
		const tpl = JSON.parse(raw);

		if (tpl.type !== 'page' || !Array.isArray(tpl.content) || tpl.content.length < 2) {
			throw new Error(`Invalid Elementor template structure in ${page.templateFile}`);
		}

		const html = renderPageHtml(route);
		if (!html) {
			throw new Error(`Failed to render preview HTML for ${route}`);
		}

		// Verify every internal page link resolves to a valid route in PAGES
		const hrefMatches = [...html.matchAll(/href="(\/[^"#]*)"/g)];
		for (const m of hrefMatches) {
			const target = m[1];
			if (target.startsWith('/medexos-surgical/')) {
				await fs.access(path.join(rootDir, target.slice(1)));
				assetChecks += 1;
			} else {
				const normalized = target === '/' ? '/' : target.endsWith('/') ? target : `${target}/`;
				if (!PAGES[normalized]) {
					throw new Error(`Broken internal link "${target}" found on route ${route}`);
				}
				internalLinkChecks += 1;
			}
		}

		// Verify every image/script asset src resolves to a real file
		const srcMatches = [...html.matchAll(/src="(\/medexos-surgical\/[^"]+)"/g)];
		for (const m of srcMatches) {
			await fs.access(path.join(rootDir, m[1].slice(1)));
			assetChecks += 1;
		}
	}

	console.log(
		`Verified ${REQUIRED_THEME_FILES.length} core files, ${routes.length} multipage routes & Elementor templates, ${internalLinkChecks} internal links, and ${assetChecks} asset references.`
	);
}

verify().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});
