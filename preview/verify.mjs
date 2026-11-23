import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, CATALOGUES, CATALOGUE_PAGES, ALL_PREVIEW_PAGES, renderPageHtml } from './pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const NEW_WEBSITE_IMAGES = [
	'surgical-instruments-blueprint.jpg',
	'manufacturing-precision.jpg',
	'healthcare-professional.jpg',
	'b2b-consultant.jpg',
];

const REQUIRED_FILES = [
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
	...NEW_WEBSITE_IMAGES.map((file) => `medexos-surgical/assets/${file}`),
	'plugin/medexos-catalogue-requests/medexos-catalogue-requests.php',
	...CATALOGUES.map((item) => `plugin/medexos-catalogue-requests/assets/covers/${item.slug}.jpg`),
	'preview/preview-catalogue.js',
	'AI-STUDIO-HANDOFF.md',
	'AI-STUDIO-IMAGE-HANDOFF.md',
	'PAGE-MAP.md',
	'README.md',
];

function collectImageUrls(elements, out = []) {
	for (const el of elements) {
		if (el.elType === 'widget' && el.widgetType === 'image' && el.settings?.image?.url) {
			out.push(el.settings.image.url);
		}
		if (Array.isArray(el.elements)) {
			collectImageUrls(el.elements, out);
		}
	}
	return out;
}

async function verify() {
	for (const relPath of REQUIRED_FILES) {
		await fs.access(path.join(rootDir, relPath));
	}

	const frontPagePhp = await fs.readFile(path.join(rootDir, 'medexos-surgical', 'front-page.php'), 'utf-8');
	for (const file of NEW_WEBSITE_IMAGES) {
		if (!frontPagePhp.includes(file)) {
			throw new Error(`medexos-surgical/front-page.php is missing expected image "${file}"`);
		}
	}

	const siteRoutes = Object.keys(PAGES);
	const allRoutes = Object.keys(ALL_PREVIEW_PAGES);
	const templateImagesSeen = new Set();
	const previewImagesSeen = new Set();
	let internalLinkChecks = 0;
	let assetChecks = 0;
	let templateImageChecks = 0;

	for (const route of siteRoutes) {
		const page = PAGES[route];
		const templatePath = path.join(rootDir, 'elementor-templates', page.templateFile);
		const raw = await fs.readFile(templatePath, 'utf-8');
		const tpl = JSON.parse(raw);

		if (tpl.type !== 'page' || !Array.isArray(tpl.content) || tpl.content.length < 2) {
			throw new Error(`Invalid Elementor template structure in ${page.templateFile}`);
		}

		const imageUrls = collectImageUrls(tpl.content);
		for (const url of imageUrls) {
			const prefix = '/wp-content/themes/medexos-surgical/assets/';
			if (!url.startsWith(prefix)) {
				throw new Error(`${page.templateFile}: unexpected image URL "${url}"`);
			}
			const fileName = url.slice(prefix.length);
			await fs.access(path.join(rootDir, 'medexos-surgical', 'assets', fileName));
			templateImagesSeen.add(fileName);
			templateImageChecks += 1;
		}
	}

	for (const file of NEW_WEBSITE_IMAGES) {
		if (!templateImagesSeen.has(file)) {
			throw new Error(`Elementor templates are missing expected image "${file}"`);
		}
	}

	for (const route of allRoutes) {
		const html = renderPageHtml(route);
		if (!html) {
			throw new Error(`Failed to render preview HTML for ${route}`);
		}

		if (/\sstyle="/.test(html)) {
			throw new Error(`Inline style attribute found in rendered HTML for ${route}`);
		}

		const hrefMatches = [...html.matchAll(/href="(\/[^"#]*)"/g)];
		for (const m of hrefMatches) {
			const target = m[1];
			if (target.startsWith('/medexos-surgical/')) {
				await fs.access(path.join(rootDir, target.slice(1)));
				assetChecks += 1;
			} else {
				const normalized = target === '/' ? '/' : target.endsWith('/') ? target : `${target}/`;
				if (!ALL_PREVIEW_PAGES[normalized]) {
					throw new Error(`Broken internal link "${target}" found on route ${route}`);
				}
				internalLinkChecks += 1;
			}
		}

		const srcMatches = [...html.matchAll(/src="(\/(?:medexos-surgical|plugin|preview)\/[^"]+)"/g)];
		for (const m of srcMatches) {
			const rel = m[1].slice(1);
			await fs.access(path.join(rootDir, rel));
			previewImagesSeen.add(path.basename(rel));
			assetChecks += 1;
		}
	}

	for (const file of NEW_WEBSITE_IMAGES) {
		if (!previewImagesSeen.has(file)) {
			throw new Error(`Multipage preview is missing expected image "${file}"`);
		}
	}

	for (const item of CATALOGUES) {
		const coverFile = `${item.slug}.jpg`;
		if (!previewImagesSeen.has(coverFile)) {
			throw new Error(`Multipage preview is missing catalogue cover "${coverFile}"`);
		}
	}

	console.log(
		`Verified ${REQUIRED_FILES.length} core theme/plugin/doc files, ${siteRoutes.length} site routes & Elementor templates (${templateImageChecks} template image refs), ${Object.keys(CATALOGUE_PAGES).length} catalogue preview routes, ${internalLinkChecks} internal links, and ${assetChecks} asset references.`
	);
}

verify().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});
