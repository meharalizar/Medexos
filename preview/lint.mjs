import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PAGES } from './pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const JS_FILES = [
	'medexos-surgical/assets/menu.js',
	'preview/preview-catalogue.js',
	'preview/pages.mjs',
	'preview/server.mjs',
	'preview/verify.mjs',
	'preview/lint.mjs',
	'preview/build-elementor-templates.mjs',
];

const ALLOWED_FREE_WIDGETS = new Set([
	'heading',
	'text-editor',
	'button',
	'image',
	'icon-list',
	'shortcode',
	'spacer',
	'divider',
]);

async function lint() {
	for (const rel of JS_FILES) {
		execFileSync(process.execPath, ['--check', path.join(rootDir, rel)], { stdio: 'inherit' });
	}

	const routes = Object.keys(PAGES);
	const globalIds = new Set();
	let totalWidgets = 0;

	for (const route of routes) {
		const fileName = PAGES[route].templateFile;
		const fullPath = path.join(rootDir, 'elementor-templates', fileName);
		const tpl = JSON.parse(await fs.readFile(fullPath, 'utf-8'));

		const localIds = new Set();
		let pageWidgets = 0;
		const imageFiles = [];

		function walk(elements) {
			for (const el of elements) {
				if (!el.id || typeof el.id !== 'string') {
					throw new Error(`${fileName}: element missing string id`);
				}
				if (localIds.has(el.id) || globalIds.has(el.id)) {
					throw new Error(`${fileName}: duplicate Elementor id "${el.id}"`);
				}
				localIds.add(el.id);
				globalIds.add(el.id);

				if (el.elType === 'widget') {
					pageWidgets += 1;
					totalWidgets += 1;
					if (!ALLOWED_FREE_WIDGETS.has(el.widgetType)) {
						throw new Error(`${fileName}: disallowed or non-free widgetType "${el.widgetType}"`);
					}
					if (el.widgetType === 'button' && el.settings?.link?.url?.startsWith('/')) {
						const target = el.settings.link.url;
						if (!PAGES[target]) {
							throw new Error(`${fileName}: button link "${target}" does not match a mapped Medexos route`);
						}
					}
					if (el.widgetType === 'image') {
						const url = el.settings?.image?.url || '';
						const alt = el.settings?.image?.alt || '';
						const prefix = '/wp-content/themes/medexos-surgical/assets/';
						if (!url.startsWith(prefix)) {
							throw new Error(`${fileName}: image widget has unexpected url "${url}"`);
						}
						if (!alt.trim()) {
							throw new Error(`${fileName}: image widget "${el.id}" missing descriptive alt text`);
						}
						imageFiles.push(url.slice(prefix.length));
					}
				} else if (el.elType !== 'container') {
					throw new Error(`${fileName}: unexpected elType "${el.elType}"`);
				}

				if (Array.isArray(el.elements)) {
					walk(el.elements);
				}
			}
		}

		walk(tpl.content);

		for (const imgFile of imageFiles) {
			await fs.access(path.join(rootDir, 'medexos-surgical', 'assets', imgFile));
		}

		if (pageWidgets < 6) {
			throw new Error(`${fileName}: expected granular native Elementor widgets, found only ${pageWidgets}`);
		}

		if (!PAGES[route].isDraft && JSON.stringify(tpl).includes('REVIEW REQUIRED')) {
			throw new Error(`${fileName}: public-facing template must not contain unresolved REVIEW REQUIRED markers`);
		}
	}

	const cssFiles = ['medexos-surgical/style.css', 'medexos-surgical/assets/reference-layout.css'];
	for (const rel of cssFiles) {
		const css = await fs.readFile(path.join(rootDir, rel), 'utf-8');
		if (css.includes('\uFFFD')) {
			throw new Error(`Corrupted Unicode replacement character found in ${rel}`);
		}
	}

	console.log(
		`Lint passed: ${JS_FILES.length} JS files valid, ${routes.length} Elementor Free templates (${globalIds.size} unique nodes, ${totalWidgets} Free widgets), all internal button URLs & image assets valid, CSS clean.`
	);
}

lint().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});
