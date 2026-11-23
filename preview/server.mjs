import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, renderPageHtml } from './pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const themeDir = path.join(rootDir, 'medexos-surgical');
const themeAssetsDir = path.join(themeDir, 'assets');
const elementorDir = path.join(rootDir, 'elementor-templates');

const MIME_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.ico': 'image/x-icon',
};

function isInside(parentDir, targetPath) {
	const rel = path.relative(parentDir, targetPath);
	return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function resolveAllowedAsset(urlPathname) {
	if (urlPathname === '/medexos-surgical/style.css') {
		return path.join(themeDir, 'style.css');
	}

	if (urlPathname.startsWith('/medexos-surgical/assets/')) {
		const candidate = path.resolve(rootDir, `.${urlPathname}`);
		if (isInside(themeAssetsDir, candidate)) {
			return candidate;
		}
	}

	if (urlPathname.startsWith('/elementor-templates/') && urlPathname.endsWith('.json')) {
		const candidate = path.resolve(rootDir, `.${urlPathname}`);
		if (isInside(elementorDir, candidate)) {
			return candidate;
		}
	}

	return null;
}

const server = http.createServer(async (req, res) => {
	try {
		const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
		const pathname = decodeURIComponent(requestUrl.pathname);

		// Redirect /index.html to /
		if (pathname === '/index.html') {
			res.writeHead(301, { Location: '/' });
			res.end();
			return;
		}

		// Trailing-slash normalization for multipage routes (e.g. /who-we-are -> /who-we-are/)
		if (pathname !== '/' && !pathname.endsWith('/') && PAGES[`${pathname}/`]) {
			res.writeHead(301, { Location: `${pathname}/` });
			res.end();
			return;
		}

		// Render matching multipage HTML route
		const pageHtml = renderPageHtml(pathname);
		if (pageHtml) {
			res.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8',
				'Cache-Control': 'no-cache',
			});
			res.end(pageHtml);
			return;
		}

		// Serve allowlisted static theme CSS/JS/assets & Elementor JSON templates
		const assetPath = resolveAllowedAsset(pathname);
		if (!assetPath) {
			res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Not found');
			return;
		}

		const data = await fs.readFile(assetPath);
		const ext = path.extname(assetPath).toLowerCase();
		res.writeHead(200, {
			'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
			'Cache-Control': 'no-cache',
		});
		res.end(data);
	} catch (error) {
		if (error && error.code === 'ENOENT') {
			res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
			res.end('Not found');
			return;
		}
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('Internal server error');
	}
});

const port = Number(process.env.PORT) || 3000;
const host = '0.0.0.0';

server.listen(port, host, () => {
	console.log(`Medexos Surgical multipage preview running at http://${host}:${port} (${Object.keys(PAGES).length} routes)`);
});
