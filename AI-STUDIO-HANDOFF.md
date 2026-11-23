# Medexos AI Studio handoff

Bring this commit into your existing AI Studio project without replacing the multipage work already underway. Merge the plugin folder and catalogue covers, then continue the full English site build. The WordPress theme and companion plugin are separate installable packages.

## Catalogue integration

- Plugin source: `plugin/medexos-catalogue-requests/`. Zip that folder by itself to install it in WordPress.
- The plugin provides `medexos_catalogues()`, `medexos_asset_url()`, and the single-catalogue shortcode `[medexos_catalogue id="..."]`. Keep the existing theme's plural `[medexos_catalogues]` shortcode for the portfolio grid.
- Under Tools → Medexos catalogue setup, create missing draft catalogue pages, configure the enquiry recipient, and set an approved PDF URL for each catalogue before publishing its page. The original PDF files are kept separately from this public repository. The plugin also accepts locally bundled PDFs in `assets/pdf/`.
- Test the portfolio with the plugin active and inactive. On WordPress staging, verify that published catalogue pages render their forms and that a valid request delivers both emails. Configure SMTP for the test. The static preview can show the real cover thumbnails and mock the form UI without sending email.

## Images

Theme assets already on GitHub: `medexos-surgical/assets/logo.png`, `technical.svg`, `manufacturing.svg`, and `generated-professional.jpg`. The seven catalogue cover thumbnails are in the plugin's `assets/covers/` directory.

The generated hero and alternate portraits are available as separate attachments. Add them once you have access to the image files. Use the blueprint image for the hero, the healthcare portrait for For Professionals, and the consultant portrait for B2B. Keep the existing images as fallbacks until those files are available.

- Blueprints and steel
- Healthcare professional
- Medical equipment consultant

Keep the full English page inventory, Elementor Free templates, original Medexos copy, and working multi-page preview from the current AI Studio brief. Keep the WhatsApp Enquiry button configurable and visible across pages.
