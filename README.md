# Medexos Surgical

Multipage WordPress theme for **Medexos Surgical Enterprises** with Elementor Free support, 11 importable Elementor Free page templates, dropdown header navigation, a configurable **WhatsApp Enquiry** button, companion catalogue plugin integration, and a standalone multipage AI Studio browser preview.

## Repository Structure

- `medexos-surgical/` — Installable WordPress theme (zip this folder to upload in WordPress).
- `elementor-templates/` — 11 individual Elementor Free JSON templates (`home.json`, `who-we-are.json`, `for-professionals.json`, `for-b2b-sales.json`, `b2b-partnerships.json`, `quality.json`, `portfolio.json`, `contact.json`, `legal-notice.json`, `privacy-policy.json`, `terms-and-conditions.json`).
- `PAGE-MAP.md` — Full 11-page mapping table, reference audit findings (`doppkon.de/en/`), flagged review items, and WordPress setup checklist.
- `preview/` — Standalone multipage Node.js preview (outside `medexos-surgical/`) reusing the theme's real CSS, JavaScript, and images.

---

## Quick WordPress & Elementor Setup

1. **Install Theme**: Compress `medexos-surgical/` into `medexos-surgical.zip`, upload via **Appearance → Themes → Add New → Upload Theme**, and activate.
2. **Configure WhatsApp Button**: Set or verify the number in **Appearance → Customize → Medexos Contact** (default: `+92 329 6324928` / `923296324928`; leave blank to hide).
3. **Create Pages & Import Templates**:
   - Install **Elementor** (Free) and confirm **Flexbox Container** is active under **Elementor → Settings → Features**.
   - Import the JSON files from `elementor-templates/` via **Templates → Saved Templates → Import Templates**.
   - Create each page listed in `PAGE-MAP.md` using the **Medexos Full Width** template and insert its matching template in Elementor.
   - Keep **Legal Notice**, **Privacy Policy**, and **Terms and Conditions** as **Draft** until flagged `[REVIEW REQUIRED]` items are completed; the footer adds their links automatically once published.
4. **Assign Static Homepage**: In **Settings → Reading**, select **A static page** and choose **Home**.
5. **Menus**: Assign a custom menu to **Primary navigation** under **Appearance → Menus** (with dropdowns under **About** and **Solutions**), or rely on the theme's built-in multipage fallback menu.
6. **Catalogues**: Activate the companion catalogues plugin to populate `[medexos_catalogues]` automatically on both Home and Product Portfolio; if inactive, a four-card instrument range fallback renders cleanly.
7. **Media Library Images**: Replace any starter image in Elementor (**Image widget → Choose Image**) when installing in a WordPress subdirectory or swapping `manufacturing.svg` in B2B sections for a final portrait.

---

## Local / AI Studio Multipage Preview

```bash
npm run dev
```

Serves all 11 routes on `http://localhost:3000` (using `medexos-surgical/style.css`, `medexos-surgical/assets/reference-layout.css`, `medexos-surgical/assets/menu.js`, and `medexos-surgical/assets/*`).

```bash
npm run build   # Verifies all theme files, 11 routes, 11 Elementor JSONs, internal links, and asset references
npm run lint    # Checks JS syntax, Elementor Free widget rules, unique node IDs, and CSS integrity
```
