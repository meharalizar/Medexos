# Medexos Surgical — Page Map & Reference Audit

This document maps the audited English reference site (`https://www.doppkon.de/en/`) to the English-only **Medexos Surgical Enterprises** WordPress site at root URLs (no `/en/` prefix required).

---

## 1. Medexos Page Map (11 Mapped Pages)

| Reference URL (`doppkon.de`) | Medexos Slug / URL | Page Title | Elementor JSON Template | Navigation Placement | Publication Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/en/` | `/` | Home | `elementor-templates/home.json` | Header (top-level), Footer (Company) | **Publish** (Static Homepage) |
| `/en/who-we-are/` | `/who-we-are/` | About Medexos | `elementor-templates/who-we-are.json` | Header (`About` parent + dropdown), Footer (Company), Hero CTA | **Publish** |
| `/en/for-professionals/` | `/for-professionals/` | For Professionals | `elementor-templates/for-professionals.json` | Header (`Solutions` dropdown), Footer (Solutions), Home CTAs | **Publish** |
| `/en/for-b2b-sales/` | `/for-b2b-sales/` | For B2B / Sales | `elementor-templates/for-b2b-sales.json` | Header (`Solutions` dropdown), Footer (Solutions), Home CTAs | **Publish** |
| `/en/b2b-2/` *(via `/en/b2b/` redirect)* | `/b2b-partnerships/` | B2B Partnerships | `elementor-templates/b2b-partnerships.json` | Header (`Solutions` dropdown), Footer (Solutions), Home B2B `Learn more` CTA | **Publish** |
| `/en/quality/` | `/quality/` | Quality | `elementor-templates/quality.json` | Header (`About` dropdown), Footer (Company), About Hero CTA | **Publish** *(omits unverified claims; review items tracked in Section 3)* |
| `/en/portfolio/` | `/portfolio/` | Product Portfolio / Catalogues | `elementor-templates/portfolio.json` | Header (`Catalogues` top-level), Footer (Company), Home CTAs | **Publish** *(uses `[medexos_catalogues]` shortcode)* |
| `/en/contact/` | `/contact/` | Contact | `elementor-templates/contact.json` | Header (`Contact` top-level), Footer (Solutions), page-wide CTAs | **Publish** *(verified channels only; optional items tracked in Section 3)* |
| `/en/legal-notice/` | `/legal-notice/` | Legal Notice | `elementor-templates/legal-notice.json` | Footer legal bar *(WordPress shows link automatically once published)* | **Draft — Review Required** |
| `/en/privacy-policy/` | `/privacy-policy/` | Privacy Policy | `elementor-templates/privacy-policy.json` | Footer legal bar *(WordPress shows link automatically once published)* | **Draft — Review Required** |
| `/en/gtc/` | `/terms-and-conditions/` | Terms and Conditions | `elementor-templates/terms-and-conditions.json` | Footer legal bar *(WordPress shows link automatically once published)* | **Draft — Review Required** |

---

## 2. Reference Site Audit Log (`https://www.doppkon.de/en/`)

Live HTTP crawl and link inspection of `https://www.doppkon.de/en/` verified the following redirects, misrouted German links, downloads, and omitted pages so they are not mistaken for separate Medexos English pages:

### A. Redirects & Shorthand Relative Links
- `/en/b2b/` (linked from the English homepage B2B `Learn more` CTA as relative `b2b`) → **HTTP 301/200 resolves to `/en/b2b-2/`** (mapped to Medexos `/b2b-partnerships/`).
- `/en/for-professionals/port` (linked from For Professionals `Portfolio` CTA as relative `port`) → **resolves to `/en/portfolio/`** (mapped to Medexos `/portfolio/`).
- `/en/who-we-are/kont` (linked from Who We Are `Career` CTA as relative `kont`) → **resolves to `/en/contact/`** (mapped to Medexos `/contact/`).

### B. Misrouted German or Staging Links on Reference English Pages (Mapped to English Equivalents)
- Reference `/en/` internal CTAs link to German slugs (`/wer-wir-sind/`, `/portfolio/`, `/fuer-professionals/`, `/fuer-b2b-sales/`) → mapped cleanly to Medexos English pages (`/who-we-are/`, `/portfolio/`, `/for-professionals/`, `/for-b2b-sales/`).
- Reference `/en/for-professionals/` and `/en/portfolio/` `Contact` CTAs link to German `/kontakt/` → mapped to Medexos `/contact/`.
- Reference `/en/who-we-are/` `make contact` CTA points to an external staging host (`https://neu-doppkon.innoconcept.dev/kontakt/`) → mapped to Medexos `/contact/`.
- Reference header/footer language switcher (`English` / `Deutsch`) → intentionally omitted on the English-only Medexos site.

### C. Downloadable Files & Media (Not Separate Pages)
- Quality certificates on DOPPKON (`/wp-content/uploads/2025/03/...MP2021.pdf`, `...MDSAP16-2.pdf`) — DOPPKON-specific certificates, **never** copied or claimed for Medexos.
- Product PDFs on DOPPKON (`/wp-content/uploads/2025/12/Endoscopic-Spine-Surgery-V3_2025.pdf`, `Arthroscopic-Instruments.pdf`, `Hysteroscopy-and-Urology.pdf`) — replaced by Medexos's companion **Medexos Catalogue Requests** plugin (`plugin/medexos-catalogue-requests/`) via `[medexos_catalogues]` and `[medexos_catalogue id="..."]`.
- Video asset on DOPPKON `/en/b2b-2/` (`B2B.mp4`) — replaced by Medexos's supplied `b2b-consultant.jpg` imagery (`medexos-surgical/assets/`).

### D. Additional Reference URLs Audited & Intentionally Omitted
- `/en/career/` (HTTP 200, not linked in the DOPPKON English header or footer; German `/karriere/` is the primary jobs page) — omitted until Medexos provides recruitment copy, open roles, and an HR contact email.
- `/en/news/` (HTTP 200, single 2024 trade-show post, not linked in the DOPPKON English header or footer) — omitted until Medexos has verified news/events to publish.
- DOPPKON blog-style specialty posts (`/en/2023/10/26/spinal-surgery/`, `/en/2023/10/26/arthroscopy/`, `/en/2023/10/26/hysteroscopy-urology/`) — replaced by Medexos's own dynamic catalogue pages managed by the companion catalogues plugin.
- German-only sitemap utility pages (`/impressum/`, `/datenschutz/`, `/agb/`, `/qualitaet/`, `/kontakt/`, `/karriere/`, `/aktuelle-news/`, `/suchergebnis-seite/`, `/404-seite-nicht-gefunden/`, `/beitrags-seite/`).

---

## 3. Items Flagged for Medexos Review (Not Published as Unverified Claims)

Public-facing pages (**Quality** and **Contact**) contain **no** `[REVIEW REQUIRED]` markers or unverified claims; omitted items are recorded here for internal review, while the three legal pages remain in **Draft** status:

- **Quality (`/quality/`)**: Confirm whether Medexos Surgical Enterprises holds verified quality management certifications (e.g., ISO 13485, ISO 9001), certificate numbers, issuing bodies, regional regulatory marks/registrations (e.g., CE/MDR, UKCA, FDA, DRAP), and downloadable PDF certificates before adding certification claims to the page.
- **Contact (`/contact/`)**: Confirm whether to add a physical street address, city/postal code, country, optional map link, business hours/time zone, or an on-page WordPress contact form plugin shortcode alongside the verified email (`info@medexossurgical.com`), phone (`+92 329 6324928`), and configurable WhatsApp Enquiry button.
- **About Medexos (`/who-we-are/`)**: A company timeline is omitted until verified Medexos founding milestones are supplied.
- **Legal Notice (`/legal-notice/`) — Draft**: Supply registered legal entity name/form, physical address, authorized representative(s), and company/tax/VAT registration numbers.
- **Privacy Policy (`/privacy-policy/`) — Draft**: Supply Data Controller postal address, WordPress hosting provider & region, font/cookie/analytics choices, and target legal jurisdictions.
- **Terms and Conditions (`/terms-and-conditions/`) — Draft**: Supply governing law, jurisdiction, Incoterms/delivery, payment terms, warranty period, and return/inspection terms.

---

## 4. Image Asset Placement Map (`medexos-surgical/assets/`)

| Asset Filename | Applied Placement (Theme, Elementor Templates & Preview) | Framing Notes |
| :--- | :--- | :--- |
| `surgical-instruments-blueprint.jpg` | Home hero, Product Portfolio hero, About Medexos secondary panel | `object-fit: contain` on white panel so blueprint lines never clip |
| `manufacturing-precision.jpg` | Home manufacturing introduction (`#about`), About Medexos hero, Quality hero | `object-fit: cover; object-position: center center` |
| `healthcare-professional.jpg` | Home *For Professionals* (`#professionals`), For Professionals hero | `object-fit: cover; object-position: center 18%` (`mx-portrait-media`) |
| `b2b-consultant.jpg` | Home *For B2B / Sales* (`#business`), For B2B / Sales hero, B2B Partnerships hero | `object-fit: cover; object-position: center 18%` (`mx-portrait-media`) |

---

## 5. WordPress, Companion Plugin & Elementor Free Setup Checklist

1. **Install & Activate Theme (Package 1)**: Zip `medexos-surgical/` alone and upload via **Appearance → Themes → Add New → Upload Theme**, then activate **Medexos Surgical**.
2. **Install & Configure Companion Catalogue Plugin (Package 2)**:
   - Zip `plugin/medexos-catalogue-requests/` alone and upload via **Plugins → Add New → Upload Plugin**, then activate **Medexos Catalogue Requests**.
   - Go to **Tools → Medexos catalogue setup** and click **Create missing catalogue page drafts** to create all 7 draft pages (`orthopedic-spinal-instruments`, `ophthalmic-instruments`, `laryngoscopes`, `liposuction-cannulas-accessories`, `plastic-surgery-instruments`, `retractor-systems`, `veterinary-orthopedic-implants`) containing `[medexos_catalogue id="..."]`.
   - Set **Enquiry recipient** (`medexos_recipient`) and paste the approved **PDF URL** (`medexos_pdf_<slug>`) for each catalogue, then click **Save settings**. *(Alternatively, upload matching PDFs to `plugin/medexos-catalogue-requests/assets/pdf/` using the filenames `orthopedic-spinal.pdf`, `ophthalmic.pdf`, `laryngoscope.pdf`, `liposuction.pdf`, `plastic-surgery.pdf`, `retractors.pdf`, `veterinary.pdf` and leave the URL field blank.)*
   - Configure WordPress **SMTP**, test a catalogue submission on staging to verify dual email delivery, and then publish the 7 catalogue draft pages so `[medexos_catalogues]` links directly to them.
3. **Verify Elementor Settings**: Install and activate **Elementor** (Free). Confirm **Elementor → Settings → Features → Flexbox Container** is active (default in Elementor 3.16+).
4. **Create the 11 WordPress Pages**:
   - Create pages with the exact slugs in the Page Map above (`who-we-are`, `for-professionals`, `for-b2b-sales`, `b2b-partnerships`, `quality`, `portfolio`, `contact`, `legal-notice`, `privacy-policy`, `terms-and-conditions`, plus `home`).
   - Set **Template** to **Medexos Full Width** on each page.
   - Save **Legal Notice**, **Privacy Policy**, and **Terms and Conditions** as **Draft** until reviewed and approved.
5. **Import Elementor JSON Templates**:
   - Go to **Templates → Saved Templates → Import Templates** and import the 11 JSON files from `elementor-templates/`.
   - Open each page with **Edit with Elementor**, click the folder icon (**Add Template → My Templates**), insert the matching template, and save/publish.
6. **Assign Static Homepage**: Go to **Settings → Reading → Your homepage displays → A static page**, pick **Home**, and save.
7. **Configure Navigation Menu** *(optional — the theme also provides a complete built-in fallback menu with dropdowns)*:
   - Go to **Appearance → Menus**, create a menu assigned to **Primary navigation**, and nest **About Medexos** + **Quality** under **About**, and **For Professionals** + **For B2B / Sales** + **B2B Partnerships** under **Solutions**, alongside **Home**, **Catalogues**, and **Contact**.
8. **Configure WhatsApp Number**: Go to **Appearance → Customize → Medexos Contact** to verify or update the default number (`923296324928` / `+92 329 6324928`).
9. **Publish Approved Legal Pages**: Once reviewed, publish **Legal Notice**, **Privacy Policy** (and optionally assign it in **Settings → Privacy**), and **Terms and Conditions**. The theme footer detects published legal pages automatically.
10. **Subdirectory Media Library Swap (if needed)**: If WordPress runs in a subdirectory rather than domain root, click each Image widget in Elementor (**Content → Choose Image**) and select the matching uploaded image from the WordPress Media Library.
