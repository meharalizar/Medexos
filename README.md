# Medexos Surgical

Multipage WordPress theme and companion catalogue plugin for **Medexos Surgical Enterprises** with Elementor Free support, 11 importable Elementor Free page templates, dropdown header navigation, a configurable **WhatsApp Enquiry** button, seven speciality catalogue request pages with cover artwork, and a standalone multipage AI Studio browser preview.

## Repository Structure

- `medexos-surgical/` — Separately installable WordPress theme (compress this folder alone into `medexos-surgical.zip`).
- `plugin/medexos-catalogue-requests/` — Separately installable companion WordPress plugin with seven catalogue cover images (`assets/covers/*.jpg`) and single-catalogue request forms (`[medexos_catalogue id="..."]`). Compress this folder alone into `medexos-catalogue-requests.zip`.
- `elementor-templates/` — 11 individual Elementor Free JSON templates (`home.json`, `who-we-are.json`, `for-professionals.json`, `for-b2b-sales.json`, `b2b-partnerships.json`, `quality.json`, `portfolio.json`, `contact.json`, `legal-notice.json`, `privacy-policy.json`, `terms-and-conditions.json`).
- `PAGE-MAP.md` — Full 11-page mapping table, reference audit log (`doppkon.de/en/`), flagged internal review items, and complete WordPress setup checklist.
- `AI-STUDIO-HANDOFF.md` & `AI-STUDIO-IMAGE-HANDOFF.md` — Integration and image placement handoff notes.
- `preview/` — Standalone multipage Node.js preview (strictly outside both installable WordPress packages) reusing the theme CSS, JavaScript, images, and the plugin's real catalogue covers.

---

## Quick WordPress & Elementor Setup

### 1. Install the Theme (Package 1)
1. Compress `medexos-surgical/` into `medexos-surgical.zip`.
2. In WordPress, go to **Appearance → Themes → Add New → Upload Theme**, upload the zip, and activate **Medexos Surgical**.
3. Verify or update the header WhatsApp button in **Appearance → Customize → Medexos Contact** (default: `+92 329 6324928` / `923296324928`; leave blank to hide).

### 2. Install & Configure the Companion Catalogue Plugin (Package 2)
1. Compress `plugin/medexos-catalogue-requests/` by itself into `medexos-catalogue-requests.zip`.
2. Upload and activate it under **Plugins → Add New → Upload Plugin**.
3. Open **Tools → Medexos catalogue setup**:
   - Click **Create missing catalogue page drafts** to generate draft WordPress pages for all 7 catalogues with `[medexos_catalogue id="..."]` (existing pages with matching slugs are left untouched).
   - Set the **Enquiry recipient** email (`medexos_recipient`, defaults to WordPress `admin_email`).
   - Enter an approved, publicly shareable **PDF URL** (`medexos_pdf_<slug>`) for each catalogue and click **Save settings**:
     - `orthopedic-spinal-instruments` — *Orthopedic Spinal Instruments* (optional local fallback: `assets/pdf/orthopedic-spinal.pdf`)
     - `ophthalmic-instruments` — *Ophthalmic Instruments* (optional local fallback: `assets/pdf/ophthalmic.pdf`)
     - `laryngoscopes` — *Laryngoscopes* (optional local fallback: `assets/pdf/laryngoscope.pdf`)
     - `liposuction-cannulas-accessories` — *Liposuction Cannulas & Accessories* (optional local fallback: `assets/pdf/liposuction.pdf`)
     - `plastic-surgery-instruments` — *Plastic Surgery Instruments* (optional local fallback: `assets/pdf/plastic-surgery.pdf`)
     - `retractor-systems` — *Retractor Systems* (optional local fallback: `assets/pdf/retractors.pdf`)
     - `veterinary-orthopedic-implants` — *Veterinary Orthopedic Implants* (optional local fallback: `assets/pdf/veterinary.pdf`)
   - *Note*: Original catalogue PDFs are intentionally excluded from this public repository. Leave a PDF URL blank **only** if you place the matching PDF file inside `plugin/medexos-catalogue-requests/assets/pdf/` on the server.
4. Configure WordPress **SMTP** and submit a test request on staging to verify that both emails deliver (one enquiry email to the Medexos recipient and one download-link email to the requester).
5. Publish each reviewed catalogue draft page under **Pages**. Published catalogue pages automatically link from the theme's `[medexos_catalogues]` grid on Home and Product Portfolio; if the plugin is deactivated, the theme gracefully renders a 4-card instrument range fallback.

### 3. Create the 11 Site Pages & Import Elementor Free Templates
1. Install **Elementor** (Free) and confirm **Flexbox Container** is active under **Elementor → Settings → Features**.
2. Import the 11 JSON files from `elementor-templates/` via **Templates → Saved Templates → Import Templates**.
3. Create each page listed in `PAGE-MAP.md` using the **Medexos Full Width** template and insert its matching saved template in Elementor.
4. Keep **Legal Notice**, **Privacy Policy**, and **Terms and Conditions** as **Draft** until flagged items are completed; the footer adds their links automatically once published.
5. In **Settings → Reading**, select **A static page** and choose **Home**.
6. Optionally assign a custom menu to **Primary navigation** under **Appearance → Menus** (with dropdowns under **About** and **Solutions**), or rely on the theme's built-in multipage fallback menu.
7. **Media Library Images (Subdirectory Installs)**: The theme and templates ship with the four web-ready images under `medexos-surgical/assets/` (`surgical-instruments-blueprint.jpg`, `manufacturing-precision.jpg`, `healthcare-professional.jpg`, `b2b-consultant.jpg`). If WordPress runs in a subdirectory (e.g. `/staging/`), re-select each Image widget in Elementor (**Content → Choose Image**) from the WordPress Media Library.

---

## Local / AI Studio Multipage Preview

```bash
npm run dev
```

Serves all 11 site routes plus 7 individual catalogue preview pages (with real cover thumbnails and mocked form UI without sending email) on `http://localhost:3000`.

```bash
npm run build   # Verifies theme/plugin files, 11 site routes, 7 catalogue routes, 11 Elementor JSONs, links, and images
npm run lint    # Checks JS syntax, Elementor Free widget rules, unique node IDs, image alt text, and CSS integrity
```
