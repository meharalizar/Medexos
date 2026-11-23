export const SITE_META = {
	brand: 'Medexos Surgical Enterprises',
	shortBrand: 'Medexos Surgical',
	email: 'info@medexossurgical.com',
	phoneDisplay: '+92 329 6324928',
	phoneHref: 'tel:+923296324928',
	whatsappHref: 'https://wa.me/923296324928',
	assets: '/medexos-surgical/assets',
};

const ARROW_SVG =
	'<svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

const WHATSAPP_SVG =
	'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.6a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.1 8.1c.5 3.6 2.2 5.4 5.9 6.5.7.2 1.5-.3 1.8-1l.2-.6-2.2-1.1-.8 1c-1.3-.6-2.3-1.6-2.8-2.9l.9-.8L10 7l-.6.1c-.7.2-1.3.5-1.3 1Z"/></svg>';

const CHEVRON_SVG =
	'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';

function catalogueGridMarkup() {
	const ranges = [
		{
			code: 'RANGE 01',
			title: 'General &amp; Diagnostic Instruments',
			desc: 'Forceps, scissors, retractors, and theatre essentials manufactured to consistent clinical tolerances.',
			icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/></svg>',
		},
		{
			code: 'RANGE 02',
			title: 'Dental &amp; Oral Surgery',
			desc: 'Elevators, extraction forceps, scalers, and restorative sets designed for precision handling.',
			icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3c-2.5 0-4 2.2-4 5.2 0 3.2 1.7 5.5 2.4 9.2.3 1.7 1.2 3.6 2.4 3.6 1.1 0 1.6-1.8 2.2-4 .5-1.7 1.5-2.5 2-2.5s1.5.8 2 2.5c.6 2.2 1.1 4 2.2 4 1.2 0 2.1-1.9 2.4-3.6.7-3.7 2.4-6 2.4-9.2C21 5.2 19.5 3 17 3c-1.8 0-3.1.9-5 .9S8.8 3 7 3Z"/></svg>',
		},
		{
			code: 'RANGE 03',
			title: 'ENT, Ophthalmic &amp; Microsurgery',
			desc: 'Fine-tip micro-instruments, specula, and needle holders engineered for delicate procedures.',
			icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
		},
		{
			code: 'RANGE 04',
			title: 'Veterinary Surgical Ranges',
			desc: 'Durable small-animal and large-animal instrument sets supporting modern veterinary practices.',
			icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="4"/></svg>',
		},
	];

	return `
		<div class="grid medexos-catalogue-grid">
			${ranges
				.map(
					(r) => `
				<article class="card">
					<div class="card-media">
						<div class="card-emblem" aria-hidden="true">
							${r.icon}
							<span class="card-emblem-code">${r.code}</span>
						</div>
					</div>
					<div class="card-body">
						<h3>${r.title}</h3>
						<p>${r.desc}</p>
						<a class="card-link" href="/contact/">
							Request catalogue
							${ARROW_SVG}
						</a>
					</div>
				</article>`
				)
				.join('')}
		</div>
		<p class="catalogue-fallback-note">
			Downloadable catalogue editions publish here automatically when the Medexos Catalogues plugin is active. Contact our team directly for full product sheets.
		</p>
	`;
}

function contactBandMarkup(
	heading = "Have a question?<br>We're here to help.",
	copy = 'Our team is available to assist with product specifications, catalogue requests, and commercial enquiries.'
) {
	return `
		<section class="ref-contact" id="contact">
			<div class="ref-contact-panel">
				<div>
					<span class="ref-kicker">Feel free to send us a request</span>
					<h2>${heading}</h2>
					<p>Reach our team via WhatsApp, telephone, or email, or visit our Contact page for full enquiry guidance.</p>
				</div>
				<div>
					<h3>Let's talk about your requirements.</h3>
					<p>${copy}</p>
					<div class="actions">
						<a class="button medexos-whatsapp" href="${SITE_META.whatsappHref}" target="_blank" rel="noopener noreferrer">
							<span>WhatsApp Enquiry</span>
							${WHATSAPP_SVG}
						</a>
						<a class="button white" href="/contact/">
							<span>Contact page</span>
							${ARROW_SVG}
						</a>
						<a class="button white" href="${SITE_META.phoneHref}">${SITE_META.phoneDisplay}</a>
					</div>
				</div>
			</div>
		</section>
	`;
}

export const PAGES = {
	'/': {
		slug: '',
		title: 'Medexos Surgical',
		description:
			'Medexos Surgical Enterprises — surgical instrument portfolio for human healthcare, veterinary applications, and B2B commercial enquiries.',
		templateFile: 'home.json',
		bodyClass: 'home',
		render: () => `
			<section class="hero" aria-label="Introduction">
				<div class="panel hero-copy">
					<p class="hero-kicker">Your partner for surgical instruments and manufacturing enquiries.</p>
					<h1>MEDEXOS.<span>surgical<br>instruments.</span></h1>
					<p class="hero-lead">Explore our surgical instrument portfolio for human healthcare and veterinary applications, backed by responsive product and commercial support.</p>
					<div class="actions">
						<a class="button" href="/who-we-are/">
							<span>Who we are</span>
							${ARROW_SVG}
						</a>
						<a class="button alt" href="/portfolio/">
							<span>Our portfolio</span>
							${ARROW_SVG}
						</a>
					</div>
				</div>
				<div class="panel hero-art">
					<img src="${SITE_META.assets}/technical.svg" alt="Illustrated technical drawing of Medexos surgical instruments">
				</div>
			</section>

			<section class="ref-intro" id="about">
				<div class="intro-visual">
					<img src="${SITE_META.assets}/manufacturing.svg" alt="Conceptual surgical instrument manufacturing illustration">
				</div>
				<div>
					<span class="ref-kicker">What we do</span>
					<h2>Our dedication is to surgical instrumentation.</h2>
					<p>Medexos Surgical Enterprises offers a focused portfolio of instruments across surgical specialities. We work closely with clinical buyers and distribution partners to understand exact requirements and share product documentation.</p>
					<p>From individual instrument enquiries to full catalogue requests and ongoing B2B supply discussions, our team is ready to assist.</p>
					<div class="intro-meta" aria-label="Key focus areas">
						<span>Human &amp; Veterinary Ranges</span>
						<span class="sep" aria-hidden="true">&middot;</span>
						<span>Catalogue Information</span>
						<span class="sep" aria-hidden="true">&middot;</span>
						<span>Direct B2B Enquiries</span>
					</div>
					<div class="actions">
						<a class="button" href="/for-professionals/">
							<span>For professionals</span>
							${ARROW_SVG}
						</a>
						<a class="button white" href="/for-b2b-sales/">
							<span>For B2B / Sales</span>
							${ARROW_SVG}
						</a>
					</div>
				</div>
			</section>

			<section class="audience" id="professionals">
				<h2>For Professionals</h2>
				<div class="audience-panel">
					<div class="audience-copy">
						<div class="audience-num" aria-hidden="true">01</div>
						<h3>Supporting the people who use our instruments.</h3>
						<p>Browse our instrument ranges for human and veterinary applications and contact our team to discuss product specifications and catalogue details.</p>
						<ul class="checks">
							<li>Specialist product ranges</li>
							<li>Catalogue information</li>
							<li>Responsive product enquiries</li>
						</ul>
						<a class="button alt" href="/for-professionals/">
							<span>Learn more</span>
							${ARROW_SVG}
						</a>
					</div>
					<img src="${SITE_META.assets}/generated-professional.jpg" alt="Healthcare professional in clinical coat with stethoscope" loading="lazy">
				</div>
			</section>

			<section class="audience reverse" id="business">
				<h2>For B2B / Sales</h2>
				<div class="audience-panel">
					<div class="audience-copy">
						<div class="audience-num" aria-hidden="true">02</div>
						<h3>Your partner for surgical instrument enquiries.</h3>
						<p>Looking for a dependable surgical instrument supplier? Explore our commercial partnership approach or speak with our team about catalogue and volume requirements.</p>
						<ul class="checks">
							<li>Catalogue enquiries</li>
							<li>Product information</li>
							<li>Commercial &amp; B2B enquiries</li>
						</ul>
						<div class="actions">
							<a class="button white" href="/b2b-partnerships/">
								<span>Learn more</span>
								${ARROW_SVG}
							</a>
							<a class="button" href="/for-b2b-sales/">
								<span>For B2B / Sales</span>
								${ARROW_SVG}
							</a>
						</div>
					</div>
					<img src="${SITE_META.assets}/manufacturing.svg" alt="Surgical instrument manufacturing illustration" loading="lazy">
				</div>
			</section>

			<section class="portfolio" id="catalogues">
				<div class="portfolio-head">
					<div class="portfolio-head-copy">
						<span class="ref-kicker">Explore our portfolio</span>
						<h2>Our catalogues.</h2>
						<p>Discover our surgical instrument ranges across human and veterinary applications.</p>
					</div>
					<a class="button white" href="/portfolio/">
						<span>View full portfolio</span>
						${ARROW_SVG}
					</a>
				</div>
				${catalogueGridMarkup()}
			</section>

			${contactBandMarkup()}
		`,
	},

	'/who-we-are/': {
		slug: 'who-we-are',
		title: 'About Medexos — Medexos Surgical',
		description: 'Learn about Medexos Surgical Enterprises, our approach to surgical instrumentation, and how we support clinical and B2B partners.',
		templateFile: 'who-we-are.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>About Medexos</span></nav>
					<span class="ref-kicker">Who we are</span>
					<h1>Medexos Surgical <span>Enterprises.</span></h1>
					<p class="page-hero-lead">A dedicated partner for surgical instruments across human healthcare and veterinary applications — focused on clear product information, responsive enquiry handling, and reliable commercial collaboration.</p>
					<div class="actions">
						<a class="button" href="/portfolio/"><span>Explore our portfolio</span>${ARROW_SVG}</a>
						<a class="button white" href="/quality/"><span>Quality practices</span>${ARROW_SVG}</a>
					</div>
				</div>
				<div class="page-hero-media">
					<img src="${SITE_META.assets}/manufacturing.svg" alt="Conceptual surgical instrument manufacturing illustration">
				</div>
			</section>

			<section class="subpage-section">
				<span class="ref-kicker">Company overview</span>
				<h2>Focused on surgical instrumentation and direct customer support.</h2>
				<p>Medexos Surgical Enterprises works with healthcare professionals, purchasing teams, and B2B distribution partners who require dependable surgical instrument ranges and straightforward technical communication.</p>
				<p>Rather than treating product selection as a catalogue-only transaction, our team supports enquiries from initial range discovery through specification queries and ongoing B2B supply discussions.</p>

				<div class="pillars-grid">
					<article class="surface-card">
						<div class="surface-card-num">01</div>
						<h3>Clinical &amp; Veterinary Breadth</h3>
						<p>Instrument portfolios structured around practical surgical specialities for both human and veterinary clinical environments.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">02</div>
						<h3>Clear Catalogue Documentation</h3>
						<p>Dedicated speciality catalogues and direct team assistance so buyers can verify instrument patterns before ordering.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">03</div>
						<h3>Direct Commercial Communication</h3>
						<p>Responsive WhatsApp, phone, and email channels connecting healthcare teams and trade partners directly with Medexos.</p>
					</article>
				</div>
			</section>

			<section class="subpage-section compact">
				<div class="audience-panel audience-panel-soft">
					<div class="audience-copy">
						<span class="ref-kicker">Our approach &amp; capabilities</span>
						<h2>How we support clinical and trade partners.</h2>
						<ul class="checks">
							<li>Instrument range consultation across human and veterinary portfolios</li>
							<li>Catalogue supply and product sheet enquiries</li>
							<li>Direct B2B, distributor, and purchasing support</li>
							<li>Quality documentation requests handled directly by our team</li>
						</ul>
						<div class="actions">
							<a class="button" href="/for-professionals/"><span>For Professionals</span>${ARROW_SVG}</a>
							<a class="button white" href="/for-b2b-sales/"><span>For B2B / Sales</span>${ARROW_SVG}</a>
						</div>
					</div>
					<img class="audience-img-contain" src="${SITE_META.assets}/technical.svg" alt="Technical illustration of Medexos surgical instruments">
				</div>
			</section>

			${contactBandMarkup('Want to learn more<br>about Medexos?', 'Contact our team directly to discuss our surgical instrument ranges or request company and catalogue documentation.')}
		`,
	},

	'/for-professionals/': {
		slug: 'for-professionals',
		title: 'For Professionals — Medexos Surgical',
		description: 'Instrument range discovery and product enquiry support for human healthcare and veterinary professionals.',
		templateFile: 'for-professionals.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>For Professionals</span></nav>
					<span class="ref-kicker">For Healthcare &amp; Veterinary Professionals</span>
					<h1>Instruments built around <span>clinical requirements.</span></h1>
					<p class="page-hero-lead">Discover surgical instrument ranges for human healthcare and veterinary practice, review catalogue options, and request specific product details directly from the Medexos team.</p>
					<div class="actions">
						<a class="button" href="/portfolio/"><span>Browse catalogues</span>${ARROW_SVG}</a>
						<a class="button white" href="/contact/"><span>Request product info</span>${ARROW_SVG}</a>
					</div>
				</div>
				<div class="page-hero-media">
					<img src="${SITE_META.assets}/generated-professional.jpg" alt="Healthcare professional in clinical coat with stethoscope">
				</div>
			</section>

			<section class="subpage-section">
				<span class="ref-kicker">How we help clinicians</span>
				<h2>Straightforward range discovery and enquiry support.</h2>
				<div class="pillars-grid">
					<article class="surface-card">
						<div class="surface-card-num">01</div>
						<h3>Browse Speciality Ranges</h3>
						<p>Explore our product portfolio covering human surgical disciplines and veterinary instrument sets.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">02</div>
						<h3>Request Pattern Details</h3>
						<p>Share your required instrument patterns, lengths, or speciality focus by WhatsApp, phone, or email.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">03</div>
						<h3>Receive Catalogue Sheets</h3>
						<p>Our team provides relevant catalogue pages and product documentation to support your clinical review.</p>
					</article>
				</div>
			</section>

			<section class="subpage-section compact">
				<div class="surface-card surface-card-lg">
					<span class="ref-kicker">Product information checklist</span>
					<h2>What to include in a clinical product enquiry</h2>
					<p>To help our team respond quickly with the most relevant catalogue sections, share any of the following details:</p>
					<ul class="checks">
						<li>Clinical discipline (human surgical speciality or veterinary practice)</li>
						<li>Specific instrument type, pattern name, or reference description</li>
						<li>Whether you need full speciality catalogues or individual item details</li>
						<li>Your preferred response channel (WhatsApp, phone, or email)</li>
					</ul>
					<div class="actions">
						<a class="button" href="/portfolio/"><span>View Product Portfolio</span>${ARROW_SVG}</a>
						<a class="button alt" href="/contact/"><span>Contact our team</span>${ARROW_SVG}</a>
					</div>
				</div>
			</section>

			${contactBandMarkup('Need details on a<br>specific instrument?', 'Speak directly with Medexos Surgical Enterprises to request product information or catalogue documentation.')}
		`,
	},

	'/for-b2b-sales/': {
		slug: 'for-b2b-sales',
		title: 'For B2B / Sales — Medexos Surgical',
		description: 'B2B surgical instrument supply, distributor catalogue requests, and purchasing enquiries with Medexos Surgical Enterprises.',
		templateFile: 'for-b2b-sales.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>For B2B / Sales</span></nav>
					<span class="ref-kicker">For Distributors, Procurement &amp; Trade Buyers</span>
					<h1>B2B surgical instrument <span>supply &amp; enquiries.</span></h1>
					<p class="page-hero-lead">Medexos Surgical Enterprises supports medical distributors, purchasing departments, and commercial sales partners with responsive catalogue access, product information, and structured trade enquiries.</p>
					<div class="actions">
						<a class="button" href="/b2b-partnerships/"><span>Start a B2B partnership</span>${ARROW_SVG}</a>
						<a class="button white" href="/portfolio/"><span>View catalogues</span>${ARROW_SVG}</a>
					</div>
				</div>
				<div class="page-hero-media">
					<img src="${SITE_META.assets}/manufacturing.svg" alt="Surgical instrument manufacturing illustration">
				</div>
			</section>

			<section class="subpage-section">
				<span class="ref-kicker">Commercial support</span>
				<h2>Supported B2B and purchasing enquiries.</h2>
				<div class="pillars-grid">
					<article class="surface-card">
						<div class="surface-card-num">01</div>
						<h3>Distributor Catalogue Supply</h3>
						<p>Request speciality catalogues and range overviews tailored to your regional clinical or veterinary market.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">02</div>
						<h3>Purchasing &amp; Quotation Support</h3>
						<p>Submit instrument lists or target range requirements for direct commercial follow-up with our sales team.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">03</div>
						<h3>Quality &amp; Documentation Requests</h3>
						<p>Coordinate product documentation and quality verification inquiries directly before placing trade orders.</p>
					</article>
				</div>
			</section>

			<section class="subpage-section compact">
				<div class="surface-card soft surface-card-lg">
					<span class="ref-kicker">Next steps for trade buyers</span>
					<h2>How a commercial enquiry moves forward</h2>
					<ul class="checks">
						<li>Review available ranges in our Product Portfolio</li>
						<li>Share your target market, instrument categories, and enquiry volume</li>
						<li>Discuss documentation, quality requirements, and commercial terms with our team</li>
					</ul>
					<div class="actions">
						<a class="button" href="/b2b-partnerships/"><span>Explore B2B Partnerships</span>${ARROW_SVG}</a>
						<a class="button white" href="/portfolio/"><span>View Product Portfolio</span>${ARROW_SVG}</a>
						<a class="button white" href="/contact/"><span>Contact Sales</span>${ARROW_SVG}</a>
					</div>
				</div>
			</section>

			${contactBandMarkup('Planning a B2B or<br>distributor order?', 'Reach out to discuss catalogue supply, product specifications, and commercial partnership options.')}
		`,
	},

	'/b2b-partnerships/': {
		slug: 'b2b-partnerships',
		title: 'B2B Partnerships — Medexos Surgical',
		description: 'Start a commercial partnership with Medexos Surgical Enterprises for surgical instrument distribution and B2B enquiries.',
		templateFile: 'b2b-partnerships.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/for-b2b-sales/">For B2B / Sales</a><span aria-hidden="true">/</span><span>B2B Partnerships</span></nav>
					<span class="ref-kicker">B2B Partnerships</span>
					<h1>Start a commercial <span>partnership with Medexos.</span></h1>
					<p class="page-hero-lead">A focused entry point for medical distributors, trade buyers, and regional partners looking to evaluate Medexos Surgical Enterprises for long-term surgical instrument supply.</p>
					<div class="actions">
						<a class="button medexos-whatsapp" href="${SITE_META.whatsappHref}" target="_blank" rel="noopener noreferrer"><span>WhatsApp Enquiry</span>${WHATSAPP_SVG}</a>
						<a class="button white" href="/contact/"><span>Contact our team</span>${ARROW_SVG}</a>
					</div>
				</div>
				<div class="page-hero-media">
					<img src="${SITE_META.assets}/manufacturing.svg" alt="Surgical instrument manufacturing illustration">
				</div>
			</section>

			<section class="subpage-section compact">
				<div class="two-col-grid">
					<div class="surface-card">
						<span class="ref-kicker">Why partner with Medexos</span>
						<h2>Direct access from enquiry to catalogue review.</h2>
						<ul class="checks">
							<li>Dedicated point of contact for distributor and trade enquiries</li>
							<li>Human healthcare and veterinary surgical instrument portfolios</li>
							<li>Prompt responses via WhatsApp, telephone, and email</li>
						</ul>
					</div>
					<div class="surface-card soft">
						<span class="ref-kicker">Start the conversation</span>
						<h2>Tell us about your market and requirements.</h2>
						<p>Share your company name, target surgical categories, and whether you are seeking general catalogues or specific product quotations. Our team will follow up directly.</p>
						<div class="actions">
							<a class="button white" href="/for-b2b-sales/"><span>For B2B / Sales Overview</span>${ARROW_SVG}</a>
							<a class="button" href="/portfolio/"><span>Product Portfolio</span>${ARROW_SVG}</a>
						</div>
					</div>
				</div>
			</section>

			${contactBandMarkup('Ready to begin a<br>partnership enquiry?', 'Message us directly on WhatsApp or visit the Contact page to connect with Medexos Surgical Enterprises.')}
		`,
	},

	'/quality/': {
		slug: 'quality',
		title: 'Quality — Medexos Surgical',
		description: 'Medexos Surgical Enterprises quality practices, documentation requests, and compliance verification checklist.',
		templateFile: 'quality.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/who-we-are/">About</a><span aria-hidden="true">/</span><span>Quality</span></nav>
					<span class="ref-kicker">Quality &amp; Documentation</span>
					<h1>Committed to reliable <span>surgical instrumentation.</span></h1>
					<p class="page-hero-lead">Medexos Surgical Enterprises prioritizes clear product specifications, responsive documentation support, and transparent communication with clinical and B2B buyers.</p>
					<div class="actions">
						<a class="button" href="/contact/"><span>Request quality documentation</span>${ARROW_SVG}</a>
						<a class="button white" href="/portfolio/"><span>Explore portfolio</span>${ARROW_SVG}</a>
					</div>
				</div>
				<div class="page-hero-media contain">
					<img src="${SITE_META.assets}/technical.svg" alt="Technical illustration of surgical instruments">
				</div>
			</section>

			<section class="subpage-section">
				<span class="ref-kicker">Confirmed Medexos practices</span>
				<h2>How we handle quality enquiries and product documentation.</h2>
				<div class="pillars-grid">
					<article class="surface-card">
						<div class="surface-card-num">01</div>
						<h3>Specification Clarity</h3>
						<p>We work directly with buyers to clarify instrument patterns, intended human or veterinary applications, and catalogue details before order confirmation.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">02</div>
						<h3>Direct Documentation Requests</h3>
						<p>Customers and procurement teams can request current product sheets and available compliance documentation directly via email, telephone, or WhatsApp.</p>
					</article>
					<article class="surface-card">
						<div class="surface-card-num">03</div>
						<h3>Responsive Follow-Up</h3>
						<p>Questions regarding handling, range suitability, or commercial documentation are routed directly to our team for timely answers.</p>
					</article>
				</div>
			</section>

			${contactBandMarkup('Need quality or product<br>documentation?', 'Contact our team directly to request current documentation for your evaluation or procurement process.')}
		`,
	},

	'/portfolio/': {
		slug: 'portfolio',
		title: 'Product Portfolio / Catalogues — Medexos Surgical',
		description: 'Browse surgical instrument catalogues and ranges from Medexos Surgical Enterprises.',
		templateFile: 'portfolio.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Product Portfolio</span></nav>
					<span class="ref-kicker">Product Portfolio</span>
					<h1>Surgical instrument <span>catalogues.</span></h1>
					<p class="page-hero-lead">Browse our surgical instrument ranges across human healthcare and veterinary applications. Published Medexos catalogues render dynamically via the <code>[medexos_catalogues]</code> shortcode when the companion plugin is active.</p>
					<div class="actions">
						<a class="button" href="/contact/"><span>Request a catalogue</span>${ARROW_SVG}</a>
						<a class="button white" href="/for-b2b-sales/"><span>For B2B / Sales</span>${ARROW_SVG}</a>
					</div>
				</div>
				<div class="page-hero-media contain">
					<img src="${SITE_META.assets}/technical.svg" alt="Technical drawing of Medexos surgical instruments">
				</div>
			</section>

			<section class="portfolio portfolio-subpage" id="catalogues">
				<div class="portfolio-head">
					<div class="portfolio-head-copy">
						<span class="ref-kicker">Available ranges</span>
						<h2>Our catalogues.</h2>
						<p>Select a published catalogue below to explore available instrument sets, or contact our team if you require a specific surgical speciality sheet.</p>
					</div>
				</div>
				${catalogueGridMarkup()}
			</section>

			${contactBandMarkup('Looking for a specific<br>instrument range?', 'Contact Medexos Surgical Enterprises to request product sheets or discuss your catalogue requirements.')}
		`,
	},

	'/contact/': {
		slug: 'contact',
		title: 'Contact — Medexos Surgical',
		description: 'Contact Medexos Surgical Enterprises by WhatsApp, telephone, or email for surgical instrument and catalogue enquiries.',
		templateFile: 'contact.json',
		bodyClass: 'page',
		render: () => `
			<section class="page-hero single-col">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Contact</span></nav>
					<span class="ref-kicker">Contact Medexos Surgical Enterprises</span>
					<h1>We are here to help <span>with your enquiry.</span></h1>
					<p class="page-hero-lead">Reach our team directly via WhatsApp, telephone, or email for product information, catalogue requests, and B2B commercial discussions.</p>
					<div class="actions">
						<a class="button medexos-whatsapp" href="${SITE_META.whatsappHref}" target="_blank" rel="noopener noreferrer"><span>WhatsApp Enquiry</span>${WHATSAPP_SVG}</a>
						<a class="button white" href="mailto:${SITE_META.email}"><span>Email our team</span></a>
					</div>
				</div>
			</section>

			<section class="subpage-section">
				<span class="ref-kicker">Verified contact channels</span>
				<h2>Direct ways to reach our team.</h2>

				<div class="contact-channels">
					<article class="surface-card">
						<h3>WhatsApp Enquiry</h3>
						<p>Fastest channel for product questions, catalogue requests, and initial B2B introductions.</p>
						<p class="channel-meta">Configured default: ${SITE_META.phoneDisplay}</p>
						<div class="actions actions-bottom">
							<a class="button medexos-whatsapp" href="${SITE_META.whatsappHref}" target="_blank" rel="noopener noreferrer"><span>Message on WhatsApp</span>${WHATSAPP_SVG}</a>
						</div>
					</article>

					<article class="surface-card">
						<h3>Telephone</h3>
						<p>Speak directly with Medexos Surgical Enterprises for product or commercial queries.</p>
						<p class="channel-meta">${SITE_META.phoneDisplay}</p>
						<div class="actions actions-bottom">
							<a class="button white" href="${SITE_META.phoneHref}">Call ${SITE_META.phoneDisplay}</a>
						</div>
					</article>

					<article class="surface-card">
						<h3>Email</h3>
						<p>Send instrument lists, catalogue requests, or formal procurement enquiries to our inbox.</p>
						<p class="channel-meta">${SITE_META.email}</p>
						<div class="actions actions-bottom">
							<a class="button white" href="mailto:${SITE_META.email}">${SITE_META.email}</a>
						</div>
					</article>
				</div>
			</section>
		`,
	},

	'/legal-notice/': {
		slug: 'legal-notice',
		title: 'Legal Notice (Draft) — Medexos Surgical',
		description: 'Draft Legal Notice page for Medexos Surgical Enterprises — review required before publishing.',
		templateFile: 'legal-notice.json',
		bodyClass: 'page',
		isDraft: true,
		render: () => `
			<section class="page-hero single-col">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Legal Notice (Draft)</span></nav>
					<span class="ref-kicker">Draft for Review</span>
					<h1>Legal Notice</h1>
					<p class="page-hero-lead">Draft corporate and website publisher notice for Medexos Surgical Enterprises. Complete all flagged fields before publishing in WordPress.</p>
				</div>
			</section>

			<section class="subpage-section compact">
				<article class="legal-doc">
					<div class="review-banner review-banner-flush">
						<strong>Draft Legal Page — Review Required Before Publishing</strong>
						<p>Keep this WordPress page in <strong>Draft</strong> status until Medexos confirms all details below. In the live WordPress theme, footer links to legal pages appear automatically only after each page is published.</p>
						<ul>
							<li><strong>[REVIEW REQUIRED]</strong> Registered legal entity name and form.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Full physical street address, city, postal code, and country.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Authorized managing director / legal representative name(s).</li>
							<li><strong>[REVIEW REQUIRED]</strong> Commercial registration and tax / VAT identifiers.</li>
						</ul>
					</div>

					<h2>1. Website Publisher</h2>
					<p><strong>Medexos Surgical Enterprises</strong><br>[REVIEW REQUIRED: Registered entity form and physical postal address]</p>

					<h2>2. Represented By</h2>
					<p>[REVIEW REQUIRED: Full name(s) and title(s) of authorized representative(s).]</p>

					<h2>3. Contact Details</h2>
					<p>Telephone / WhatsApp: <a href="${SITE_META.phoneHref}">${SITE_META.phoneDisplay}</a><br>Email: <a href="mailto:${SITE_META.email}">${SITE_META.email}</a></p>

					<h2>4. Registration &amp; Tax Information</h2>
					<p>[REVIEW REQUIRED: Company registration number and applicable tax / VAT registration numbers.]</p>

					<h2>5. Content &amp; External Links</h2>
					<p>Information on this website is maintained for product and commercial enquiry purposes. [REVIEW REQUIRED: Confirm jurisdiction-specific liability and copyright notices with legal counsel before publishing.]</p>
				</article>
			</section>
		`,
	},

	'/privacy-policy/': {
		slug: 'privacy-policy',
		title: 'Privacy Policy (Draft) — Medexos Surgical',
		description: 'Draft Privacy Policy page for Medexos Surgical Enterprises — review required before publishing.',
		templateFile: 'privacy-policy.json',
		bodyClass: 'page',
		isDraft: true,
		render: () => `
			<section class="page-hero single-col">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Privacy Policy (Draft)</span></nav>
					<span class="ref-kicker">Draft for Review</span>
					<h1>Privacy Policy</h1>
					<p class="page-hero-lead">Draft privacy notice outlining how Medexos Surgical Enterprises handles enquiry and website data. Complete all flagged policy decisions before publishing.</p>
				</div>
			</section>

			<section class="subpage-section compact">
				<article class="legal-doc">
					<div class="review-banner review-banner-flush">
						<strong>Draft Legal Page — Review Required Before Publishing</strong>
						<p>Keep this WordPress page in <strong>Draft</strong> status until policy decisions below are approved. Once published (or selected under Settings &rarr; Privacy), the theme footer displays the link automatically.</p>
						<ul>
							<li><strong>[REVIEW REQUIRED]</strong> Data Controller postal address and privacy contact person.</li>
							<li><strong>[REVIEW REQUIRED]</strong> WordPress hosting provider name, region, and server log retention period.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Font hosting choice (remote Google Fonts vs. self-hosted) and any cookies/analytics/forms used.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Applicable privacy laws (e.g., GDPR / UK GDPR / local laws) and retention schedules.</li>
						</ul>
					</div>

					<h2>1. Data Controller</h2>
					<p><strong>Medexos Surgical Enterprises</strong><br>[REVIEW REQUIRED: Registered postal address]<br>Email: <a href="mailto:${SITE_META.email}">${SITE_META.email}</a><br>Telephone: <a href="${SITE_META.phoneHref}">${SITE_META.phoneDisplay}</a></p>

					<h2>2. Hosting &amp; Server Access Logs</h2>
					<p>[REVIEW REQUIRED: Insert hosting provider name, data centre location, and technical access-log retention details.]</p>

					<h2>3. Enquiries via Email, Telephone &amp; WhatsApp</h2>
					<p>When you contact us by email, telephone, or WhatsApp, we process the contact and enquiry information you provide in order to respond. Clicking a WhatsApp enquiry link opens WhatsApp (a third-party messaging service governed by its own privacy policy). [REVIEW REQUIRED: Confirm lawful basis and retention timeframe.]</p>

					<h2>4. Fonts, Cookies &amp; Third-Party Services</h2>
					<p>[REVIEW REQUIRED: Specify whether fonts are self-hosted or loaded from Google Fonts, whether analytics or cookie banners are active, and list any form plugins.]</p>

					<h2>5. Your Rights</h2>
					<p>You may contact <a href="mailto:${SITE_META.email}">${SITE_META.email}</a> to request access to, correction of, or deletion of personal data you have submitted to us. [REVIEW REQUIRED: Confirm exact statutory rights and supervisory authority details for your markets.]</p>
				</article>
			</section>
		`,
	},

	'/terms-and-conditions/': {
		slug: 'terms-and-conditions',
		title: 'Terms and Conditions (Draft) — Medexos Surgical',
		description: 'Draft Terms and Conditions page for Medexos Surgical Enterprises — review required before publishing.',
		templateFile: 'terms-and-conditions.json',
		bodyClass: 'page',
		isDraft: true,
		render: () => `
			<section class="page-hero single-col">
				<div>
					<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Terms and Conditions (Draft)</span></nav>
					<span class="ref-kicker">Draft for Review</span>
					<h1>Terms and Conditions</h1>
					<p class="page-hero-lead">Draft general terms and conditions for commercial enquiries, quotations, and supply by Medexos Surgical Enterprises. Review with legal counsel before publishing.</p>
				</div>
			</section>

			<section class="subpage-section compact">
				<article class="legal-doc">
					<div class="review-banner review-banner-flush">
						<strong>Draft Legal Page — Review Required Before Publishing</strong>
						<p>Keep this WordPress page in <strong>Draft</strong> status until commercial and legal terms below are finalized.</p>
						<ul>
							<li><strong>[REVIEW REQUIRED]</strong> Governing law, place of performance, and jurisdiction.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Quotation validity, Incoterms / delivery terms, and risk transfer.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Payment milestones, currencies, customs/tax allocation, and title retention.</li>
							<li><strong>[REVIEW REQUIRED]</strong> Inspection window, warranty duration, returns policy, and liability limits.</li>
						</ul>
					</div>

					<h2>1. Scope &amp; Applicability</h2>
					<p>These draft Terms and Conditions are intended to govern commercial quotations, orders, and supply of surgical instruments by Medexos Surgical Enterprises to business and professional buyers. [REVIEW REQUIRED: Confirm B2B scope.]</p>

					<h2>2. Quotations, Orders &amp; Contract Formation</h2>
					<p>Product listings and catalogues on this website serve as non-binding product information. A binding contract is formed only upon written order confirmation by Medexos Surgical Enterprises. [REVIEW REQUIRED: Confirm quotation validity and cancellation rules.]</p>

					<h2>3. Pricing, Payment &amp; Delivery Terms</h2>
					<p>[REVIEW REQUIRED: Specify accepted currencies, Incoterms, freight/packaging terms, and payment schedule.]</p>

					<h2>4. Inspection, Warranty &amp; Instrument Use</h2>
					<p>Surgical instruments must be inspected upon receipt and handled, cleaned, sterilized, and maintained only by qualified personnel in accordance with applicable clinical standards. [REVIEW REQUIRED: Define defect reporting period, warranty scope, and liability caps.]</p>

					<h2>5. Confidentiality &amp; Governing Law</h2>
					<p>[REVIEW REQUIRED: Confirm confidentiality obligations, technical documentation IP terms, governing law, and exclusive court of jurisdiction.]</p>
				</article>
			</section>
		`,
	},
};

export function renderPageHtml(pathname) {
	const page = PAGES[pathname];
	if (!page) {
		return null;
	}

	const isHome = pathname === '/';
	const isAbout = pathname === '/who-we-are/';
	const isQuality = pathname === '/quality/';
	const isAboutGroup = isAbout || isQuality;
	const isProf = pathname === '/for-professionals/';
	const isB2b = pathname === '/for-b2b-sales/';
	const isPartner = pathname === '/b2b-partnerships/';
	const isSolutionsGroup = isProf || isB2b || isPartner;
	const isPortfolio = pathname === '/portfolio/';
	const isContact = pathname === '/contact/';

	return `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${page.title}</title>
	<meta name="description" content="${page.description}">
	<meta property="og:title" content="${page.title}">
	<meta property="og:description" content="${page.description}">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap">
	<link rel="stylesheet" href="/medexos-surgical/style.css">
	<link rel="stylesheet" href="/medexos-surgical/assets/reference-layout.css">
</head>
<body class="${page.bodyClass}">
	<a class="skip" href="#main">Skip to content</a>

	<header class="header wrap">
		<a class="brand" href="/">
			<img src="${SITE_META.assets}/logo.png" alt="${SITE_META.brand}">
		</a>

		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true" focusable="false">
				<path d="M4 7h16"/>
				<path d="M4 12h16"/>
				<path d="M4 17h16"/>
			</svg>
			<span>Menu</span>
		</button>

		<nav aria-label="Primary navigation" id="primary-nav">
			<ul class="nav">
				<li class="${isHome ? 'current-menu-item' : ''}">
					<a href="/"${isHome ? ' aria-current="page"' : ''}>Home</a>
				</li>
				<li class="menu-item-has-children ${isAboutGroup ? 'current-menu-ancestor' : ''}">
					<a href="/who-we-are/"${isAbout ? ' aria-current="page"' : ''}>About</a>
					<button class="submenu-toggle" type="button" aria-expanded="false" aria-label="Toggle About submenu">${CHEVRON_SVG}</button>
					<ul class="sub-menu">
						<li class="${isAbout ? 'current-menu-item' : ''}"><a href="/who-we-are/"${isAbout ? ' aria-current="page"' : ''}>About Medexos</a></li>
						<li class="${isQuality ? 'current-menu-item' : ''}"><a href="/quality/"${isQuality ? ' aria-current="page"' : ''}>Quality</a></li>
					</ul>
				</li>
				<li class="menu-item-has-children ${isSolutionsGroup ? 'current-menu-ancestor' : ''}">
					<a href="/for-professionals/">Solutions</a>
					<button class="submenu-toggle" type="button" aria-expanded="false" aria-label="Toggle Solutions submenu">${CHEVRON_SVG}</button>
					<ul class="sub-menu">
						<li class="${isProf ? 'current-menu-item' : ''}"><a href="/for-professionals/"${isProf ? ' aria-current="page"' : ''}>For Professionals</a></li>
						<li class="${isB2b ? 'current-menu-item' : ''}"><a href="/for-b2b-sales/"${isB2b ? ' aria-current="page"' : ''}>For B2B / Sales</a></li>
						<li class="${isPartner ? 'current-menu-item' : ''}"><a href="/b2b-partnerships/"${isPartner ? ' aria-current="page"' : ''}>B2B Partnerships</a></li>
					</ul>
				</li>
				<li class="${isPortfolio ? 'current-menu-item' : ''}">
					<a href="/portfolio/"${isPortfolio ? ' aria-current="page"' : ''}>Catalogues</a>
				</li>
				<li class="${isContact ? 'current-menu-item' : ''}">
					<a href="/contact/"${isContact ? ' aria-current="page"' : ''}>Contact</a>
				</li>
			</ul>
		</nav>

		<a class="button medexos-whatsapp" href="${SITE_META.whatsappHref}" target="_blank" rel="noopener noreferrer">
			<span>WhatsApp Enquiry</span>
			${WHATSAPP_SVG}
		</a>
	</header>

	<main id="main" class="wrap">
		${page.render()}
	</main>

	<footer class="footer">
		<div class="footer-inner">
			<div>
				<p class="footer-brand">MEDEXOS SURGICAL ENTERPRISES</p>
				<p class="footer-tagline">Surgical instruments for professional clinical and B2B requirements.</p>
			</div>

			<div>
				<p class="footer-heading">Company</p>
				<ul class="footer-links">
					<li><a href="/">Home</a></li>
					<li><a href="/who-we-are/">About Medexos</a></li>
					<li><a href="/quality/">Quality</a></li>
					<li><a href="/portfolio/">Product Portfolio</a></li>
				</ul>
			</div>

			<div>
				<p class="footer-heading">Solutions</p>
				<ul class="footer-links">
					<li><a href="/for-professionals/">For Professionals</a></li>
					<li><a href="/for-b2b-sales/">For B2B / Sales</a></li>
					<li><a href="/b2b-partnerships/">B2B Partnerships</a></li>
					<li><a href="/contact/">Contact</a></li>
				</ul>
			</div>

			<div>
				<p class="footer-heading">Direct Contact</p>
				<ul class="footer-links">
					<li><a href="mailto:${SITE_META.email}">${SITE_META.email}</a></li>
					<li><a href="${SITE_META.phoneHref}">${SITE_META.phoneDisplay}</a></li>
					<li><a href="${SITE_META.whatsappHref}" target="_blank" rel="noopener noreferrer">WhatsApp Enquiry</a></li>
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<span>&copy; 2026 Medexos Surgical Enterprises</span>
			<div class="footer-legal" aria-label="Draft legal pages for preview review">
				<a href="/legal-notice/">Legal Notice (Draft)</a>
				<a href="/privacy-policy/">Privacy Policy (Draft)</a>
				<a href="/terms-and-conditions/">Terms and Conditions (Draft)</a>
			</div>
		</div>
	</footer>

	<script src="/medexos-surgical/assets/menu.js" defer></script>
</body>
</html>
`;
}
