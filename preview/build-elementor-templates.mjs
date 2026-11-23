import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'elementor-templates');

const ASSET_BASE = '/wp-content/themes/medexos-surgical/assets/';
const WHATSAPP_URL = 'https://wa.me/923296324928';

const COLORS = {
	navy: '#07466b',
	navyDark: '#053350',
	ink: '#1e2c3a',
	muted: '#4b5c6e',
	white: '#ffffff',
	softBlue: '#dfeaf7',
	tint: '#f3f7fc',
	border: 'rgba(7, 70, 107, 0.10)',
	borderStrong: 'rgba(7, 70, 107, 0.18)',
	reviewBg: '#fdf8ee',
	reviewBorder: '#d9b66b',
	reviewInk: '#5a4212',
};

function makeIdFactory(prefix) {
	let n = 0;
	return () => {
		n += 1;
		return `${prefix}${String(n).padStart(4, '0')}`;
	};
}

function px(size) {
	return { unit: 'px', size, sizes: [] };
}

function pct(size) {
	return { unit: '%', size, sizes: [] };
}

function em(size) {
	return { unit: 'em', size, sizes: [] };
}

function box(top, right, bottom, left, unit = 'px') {
	const linked = top === right && right === bottom && bottom === left;
	return {
		unit,
		top: String(top),
		right: String(right),
		bottom: String(bottom),
		left: String(left),
		isLinked: linked,
	};
}

function gap(col, row = col) {
	return { column: String(col), row: String(row), isLinked: col === row, unit: 'px' };
}

function container(id, settings, elements = [], isInner = false) {
	return { id, elType: 'container', isInner, settings, elements };
}

function widget(id, widgetType, settings) {
	return { id, elType: 'widget', widgetType, settings, elements: [] };
}

function sectionBox(id, extraSettings, elements) {
	return container(
		id,
		{
			content_width: 'boxed',
			boxed_width: px(1370),
			padding: box(40, 16, 40, 16),
			padding_tablet: box(28, 16, 28, 16),
			padding_mobile: box(24, 12, 24, 12),
			...extraSettings,
		},
		elements,
		false
	);
}

function cardPanel(id, extraSettings, elements) {
	return container(
		id,
		{
			content_width: 'full',
			flex_direction: 'column',
			flex_gap: gap(14),
			background_background: 'classic',
			background_color: COLORS.white,
			border_border: 'solid',
			border_width: box(1, 1, 1, 1),
			border_color: COLORS.border,
			border_radius: box(6, 6, 6, 6),
			padding: box(36, 32, 36, 32),
			padding_mobile: box(24, 20, 24, 20),
			...extraSettings,
		},
		elements,
		true
	);
}

function kickerWidget(id, text) {
	return widget(id, 'heading', {
		title: text,
		header_size: 'p',
		title_color: COLORS.navy,
		typography_typography: 'custom',
		typography_font_family: 'Plus Jakarta Sans',
		typography_font_size: px(15),
		typography_font_weight: '600',
	});
}

function headingWidget(id, title, tag = 'h2', size = 44, extra = {}) {
	return widget(id, 'heading', {
		title,
		header_size: tag,
		title_color: tag === 'h1' ? COLORS.navy : COLORS.ink,
		typography_typography: 'custom',
		typography_font_family: 'Plus Jakarta Sans',
		typography_font_size: px(size),
		typography_font_size_tablet: px(Math.max(24, Math.round(size * 0.78))),
		typography_font_size_mobile: px(Math.max(22, Math.round(size * 0.66))),
		typography_font_weight: '700',
		typography_line_height: em(tag === 'h1' ? 1.12 : 1.2),
		typography_letter_spacing: px(size >= 36 ? -1.1 : -0.4),
		...extra,
	});
}

function textWidget(id, html, extra = {}) {
	return widget(id, 'text-editor', {
		editor: html,
		text_color: COLORS.muted,
		typography_typography: 'custom',
		typography_font_family: 'DM Sans',
		typography_font_size: px(16),
		typography_line_height: em(1.66),
		...extra,
	});
}

function buttonWidget(id, text, url, variant = 'primary', opts = {}) {
	const isExternal = opts.external ? 'on' : '';
	const icon =
		opts.icon === 'whatsapp'
			? { value: 'fab fa-whatsapp', library: 'fa-brands' }
			: opts.icon === 'none'
				? { value: '', library: '' }
				: { value: 'fas fa-arrow-right', library: 'fa-solid' };

	const palettes = {
		primary: {
			background_color: COLORS.navy,
			button_text_color: COLORS.white,
			button_background_hover_color: COLORS.navyDark,
			hover_color: COLORS.white,
		},
		soft: {
			background_color: COLORS.tint,
			button_text_color: COLORS.navy,
			button_background_hover_color: COLORS.softBlue,
			hover_color: COLORS.navyDark,
			border_border: 'solid',
			border_width: box(1, 1, 1, 1),
			border_color: COLORS.borderStrong,
		},
		white: {
			background_color: COLORS.white,
			button_text_color: COLORS.navy,
			button_background_hover_color: COLORS.tint,
			hover_color: COLORS.navyDark,
			border_border: 'solid',
			border_width: box(1, 1, 1, 1),
			border_color: COLORS.borderStrong,
		},
	};

	return widget(id, 'button', {
		text,
		link: { url, is_external: isExternal, nofollow: isExternal },
		selected_icon: icon,
		icon_align: 'right',
		icon_indent: px(8),
		border_radius: box(40, 40, 40, 40),
		text_padding: box(14, 24, 14, 24),
		typography_typography: 'custom',
		typography_font_family: 'Plus Jakarta Sans',
		typography_font_size: px(15),
		typography_font_weight: '600',
		...palettes[variant],
		...(opts.extra || {}),
	});
}

function buttonRow(id, buttons) {
	return container(
		id,
		{
			content_width: 'full',
			flex_direction: 'row',
			flex_wrap: 'wrap',
			flex_gap: gap(12),
			padding: box(8, 0, 0, 0),
		},
		buttons,
		true
	);
}

function imageWidget(id, fileName, alt, opts = {}) {
	const settings = {
		image: { url: `${ASSET_BASE}${fileName}`, id: '', alt },
		image_size: 'full',
		width: pct(100),
		height: px(opts.height || 460),
		height_tablet: px(opts.heightTablet || 340),
		height_mobile: px(opts.heightMobile || 270),
		'object-fit': opts.fit || 'cover',
		image_border_radius: box(6, 6, 6, 6),
	};

	if (opts.position) {
		settings['object-position'] = opts.position;
	}

	if (opts.portrait) {
		settings._css_classes = 'mx-portrait-media';
	}

	return widget(id, 'image', settings);
}

function iconListWidget(id, items, idPrefix) {
	return widget(id, 'icon-list', {
		icon_list: items.map((text, idx) => ({
			_id: `${idPrefix}${idx + 1}`,
			text,
			selected_icon: { value: 'fas fa-check-circle', library: 'fa-solid' },
		})),
		space_between: px(12),
		icon_color: COLORS.navy,
		icon_size: px(20),
		text_color: COLORS.navy,
		text_indent: px(10),
		icon_typography_typography: 'custom',
		icon_typography_font_family: 'Plus Jakarta Sans',
		icon_typography_font_size: px(15),
		icon_typography_font_weight: '600',
	});
}

function reviewNoticeBox(nextId, title, htmlBody) {
	return container(
		nextId(),
		{
			content_width: 'full',
			flex_direction: 'column',
			flex_gap: gap(8),
			background_background: 'classic',
			background_color: COLORS.reviewBg,
			border_border: 'solid',
			border_width: box(1, 1, 1, 1),
			border_color: COLORS.reviewBorder,
			border_radius: box(6, 6, 6, 6),
			padding: box(22, 26, 22, 26),
		},
		[
			headingWidget(nextId(), title, 'h3', 18, { title_color: COLORS.reviewInk }),
			textWidget(nextId(), htmlBody, { text_color: COLORS.reviewInk }),
		],
		true
	);
}

function subpageHero(nextId, { kicker, title, lead, buttons = [], image = null }) {
	const copyCol = container(
		nextId(),
		{
			content_width: 'full',
			width: pct(image ? 58 : 100),
			width_tablet: pct(100),
			width_mobile: pct(100),
			flex_direction: 'column',
			flex_gap: gap(14),
			padding: box(0, 0, 0, 0),
		},
		[
			kickerWidget(nextId(), kicker),
			headingWidget(nextId(), title, 'h1', 50),
			textWidget(nextId(), `<p>${lead}</p>`, { typography_font_size: px(17) }),
			...(buttons.length ? [buttonRow(nextId(), buttons)] : []),
		],
		true
	);

	const children = [copyCol];
	if (image) {
		children.push(
			container(
				nextId(),
				{
					content_width: 'full',
					width: pct(42),
					width_tablet: pct(100),
					width_mobile: pct(100),
					padding: box(0, 0, 0, 0),
				},
				[
					imageWidget(nextId(), image.file, image.alt, {
						height: 360,
						heightTablet: 340,
						heightMobile: image.portrait ? 310 : 270,
						fit: image.fit || 'cover',
						position: image.position,
						portrait: Boolean(image.portrait),
					}),
				],
				true
			)
		);
	}

	return sectionBox(nextId(), { padding: box(0, 16, 28, 16), padding_mobile: box(0, 12, 20, 12) }, [
		container(
			nextId(),
			{
				content_width: 'full',
				flex_direction: 'row',
				flex_direction_tablet: 'column',
				flex_direction_mobile: 'column',
				flex_align_items: 'center',
				flex_gap: gap(48, 28),
				background_background: 'classic',
				background_color: COLORS.white,
				border_border: 'solid',
				border_width: box(1, 1, 1, 1),
				border_color: COLORS.border,
				border_radius: box(6, 6, 6, 6),
				padding: box(56, 60, 56, 60),
				padding_tablet: box(36, 28, 36, 28),
				padding_mobile: box(26, 20, 26, 20),
				css_classes: 'mx-hero-pattern',
			},
			children,
			true
		),
	]);
}

function contactCtaBand(nextId, heading = "Have a question? We're here to help.", copy = 'Speak with our team via WhatsApp, telephone, or email for product specifications, catalogues, or commercial enquiries.') {
	return sectionBox(nextId(), { padding: box(16, 16, 72, 16), padding_mobile: box(12, 12, 48, 12) }, [
		container(
			nextId(),
			{
				content_width: 'full',
				flex_direction: 'row',
				flex_direction_tablet: 'column',
				flex_direction_mobile: 'column',
				flex_align_items: 'center',
				flex_gap: gap(56, 28),
				background_background: 'classic',
				background_color: COLORS.white,
				border_border: 'solid',
				border_width: box(1, 1, 1, 1),
				border_color: COLORS.border,
				border_radius: box(6, 6, 6, 6),
				padding: box(56, 60, 56, 60),
				padding_tablet: box(36, 28, 36, 28),
				padding_mobile: box(26, 20, 26, 20),
			},
			[
				container(
					nextId(),
					{
						content_width: 'full',
						width: pct(48),
						width_tablet: pct(100),
						width_mobile: pct(100),
						flex_direction: 'column',
						flex_gap: gap(12),
						padding: box(0, 0, 0, 0),
					},
					[
						kickerWidget(nextId(), 'Direct enquiry'),
						headingWidget(nextId(), heading, 'h2', 40),
					],
					true
				),
				container(
					nextId(),
					{
						content_width: 'full',
						width: pct(52),
						width_tablet: pct(100),
						width_mobile: pct(100),
						flex_direction: 'column',
						flex_gap: gap(14),
						padding: box(0, 0, 0, 0),
					},
					[
						textWidget(nextId(), `<p>${copy}</p>`),
						buttonRow(nextId(), [
							buttonWidget(nextId(), 'WhatsApp Enquiry', WHATSAPP_URL, 'primary', { external: true, icon: 'whatsapp' }),
							buttonWidget(nextId(), 'Contact page', '/contact/', 'white'),
							buttonWidget(nextId(), '+92 329 6324928', 'tel:+923296324928', 'white', { icon: 'none' }),
						]),
					],
					true
				),
			],
			true
		),
	]);
}

function wrapTemplate(title, content) {
	return {
		title,
		type: 'page',
		version: '0.4',
		page_settings: {
			template: 'templates/elementor-full-width.php',
			hide_title: 'yes',
		},
		content,
	};
}

function buildHomeTemplate() {
	const id = makeIdFactory('mxhm');
	return wrapTemplate('Medexos Surgical — Home', [
		// 1. Split Hero
		sectionBox(
			id(),
			{
				flex_direction: 'row',
				flex_direction_tablet: 'column',
				flex_direction_mobile: 'column',
				flex_align_items: 'stretch',
				flex_gap: gap(24),
				padding: box(0, 16, 0, 16),
				padding_mobile: box(0, 12, 0, 12),
			},
			[
				container(
					id(),
					{
						content_width: 'full',
						width: pct(50),
						width_tablet: pct(100),
						width_mobile: pct(100),
						min_height: px(560),
						min_height_tablet: px(0),
						flex_direction: 'column',
						flex_justify_content: 'center',
						flex_gap: gap(16),
						background_background: 'classic',
						background_color: COLORS.white,
						border_border: 'solid',
						border_width: box(1, 1, 1, 1),
						border_color: COLORS.border,
						border_radius: box(6, 6, 6, 6),
						padding: box(64, 64, 64, 64),
						padding_tablet: box(40, 32, 40, 32),
						padding_mobile: box(28, 20, 28, 20),
						css_classes: 'mx-hero-pattern',
					},
					[
						kickerWidget(id(), 'Your partner for surgical instruments and manufacturing enquiries.'),
						headingWidget(id(), 'MEDEXOS.', 'h1', 68, {
							typography_line_height: em(1.04),
							typography_letter_spacing: px(-2),
							_margin: box(4, 0, -10, 0),
						}),
						headingWidget(id(), 'surgical instruments.', 'p', 60, {
							title_color: COLORS.ink,
							typography_font_weight: '600',
							typography_line_height: em(1.08),
							typography_letter_spacing: px(-1.8),
						}),
						textWidget(
							id(),
							'<p>Explore our surgical instrument portfolio for human healthcare and veterinary applications, backed by responsive product and commercial support.</p>',
							{ typography_font_size: px(17) }
						),
						buttonRow(id(), [
							buttonWidget(id(), 'Who we are', '/who-we-are/', 'primary'),
							buttonWidget(id(), 'Our portfolio', '/portfolio/', 'soft'),
						]),
					],
					true
				),
				container(
					id(),
					{
						content_width: 'full',
						width: pct(50),
						width_tablet: pct(100),
						width_mobile: pct(100),
						min_height: px(560),
						min_height_tablet: px(0),
						flex_direction: 'column',
						flex_justify_content: 'center',
						flex_align_items: 'center',
						background_background: 'classic',
						background_color: COLORS.white,
						border_border: 'solid',
						border_width: box(1, 1, 1, 1),
						border_color: COLORS.border,
						border_radius: box(6, 6, 6, 6),
						padding: box(24, 24, 24, 24),
					},
					[
						imageWidget(id(), 'surgical-instruments-blueprint.jpg', 'Technical engineering blueprint of Medexos surgical instruments', {
							height: 540,
							heightTablet: 380,
							heightMobile: 300,
							fit: 'contain',
						}),
					],
					true
				),
			]
		),

		// 2. Manufacturing Intro
		sectionBox(
			id(),
			{
				_element_id: 'about',
				flex_direction: 'row',
				flex_direction_tablet: 'column',
				flex_direction_mobile: 'column',
				flex_align_items: 'center',
				flex_gap: gap(72, 36),
				padding: box(96, 16, 96, 16),
				padding_tablet: box(60, 16, 56, 16),
				padding_mobile: box(48, 12, 44, 12),
			},
			[
				container(
					id(),
					{
						content_width: 'full',
						width: pct(47),
						width_tablet: pct(100),
						width_mobile: pct(100),
						padding: box(0, 0, 0, 0),
					},
					[
						imageWidget(
							id(),
							'manufacturing-precision.jpg',
							'Precision CNC manufacturing, technical blueprint, and finished Medexos surgical instruments',
							{ height: 540, heightTablet: 380, heightMobile: 320, fit: 'cover', position: 'center center' }
						),
					],
					true
				),
				container(
					id(),
					{
						content_width: 'full',
						width: pct(53),
						width_tablet: pct(100),
						width_mobile: pct(100),
						flex_direction: 'column',
						flex_gap: gap(16),
						padding: box(0, 0, 0, 0),
					},
					[
						kickerWidget(id(), 'What we do'),
						headingWidget(id(), 'Our dedication is to surgical instrumentation.', 'h2', 46),
						textWidget(
							id(),
							'<p>Medexos Surgical Enterprises offers a focused portfolio of instruments across surgical specialities. We work closely with clinical buyers and distribution partners to understand exact requirements and share product documentation.</p><p>From individual instrument enquiries to full catalogue requests and ongoing B2B supply discussions, our team is ready to assist.</p>'
						),
						textWidget(
							id(),
							'<p><strong>Human &amp; Veterinary Ranges &middot; Catalogue Information &middot; Direct B2B Enquiries</strong></p>',
							{
								text_color: COLORS.navy,
								typography_font_family: 'Plus Jakarta Sans',
								typography_font_size: px(14),
								_border_border: 'solid',
								_border_width: box(1, 0, 0, 0),
								_border_color: COLORS.borderStrong,
								_padding: box(16, 0, 0, 0),
							}
						),
						buttonRow(id(), [
							buttonWidget(id(), 'For professionals', '/for-professionals/', 'primary'),
							buttonWidget(id(), 'For B2B / Sales', '/for-b2b-sales/', 'white'),
						]),
					],
					true
				),
			]
		),

		// 3. For Professionals
		sectionBox(
			id(),
			{
				_element_id: 'professionals',
				flex_direction: 'column',
				flex_gap: gap(28),
				padding: box(24, 16, 96, 16),
				padding_tablet: box(20, 16, 56, 16),
			},
			[
				headingWidget(id(), 'For Professionals', 'h2', 46, { title_color: COLORS.navy }),
				container(
					id(),
					{
						content_width: 'full',
						flex_direction: 'row',
						flex_direction_tablet: 'column',
						flex_direction_mobile: 'column',
						flex_align_items: 'center',
						flex_gap: gap(64, 32),
						background_background: 'classic',
						background_color: COLORS.white,
						border_border: 'solid',
						border_width: box(1, 1, 1, 1),
						border_color: COLORS.border,
						border_radius: box(6, 6, 6, 6),
						padding: box(56, 64, 56, 64),
						padding_tablet: box(36, 28, 36, 28),
						padding_mobile: box(26, 20, 26, 20),
					},
					[
						container(
							id(),
							{
								content_width: 'full',
								width: pct(54),
								width_tablet: pct(100),
								width_mobile: pct(100),
								flex_direction: 'column',
								flex_gap: gap(16),
								padding: box(0, 0, 0, 0),
							},
							[
								headingWidget(id(), '01', 'p', 60, { title_color: '#d4e3f4', typography_line_height: em(1) }),
								headingWidget(id(), 'Supporting the people who use our instruments.', 'h3', 25),
								textWidget(
									id(),
									'<p>Browse our instrument ranges for human and veterinary applications and contact our team to discuss product specifications and catalogue details.</p>'
								),
								iconListWidget(
									id(),
									['Specialist product ranges', 'Catalogue information', 'Responsive product enquiries'],
									'hmpl'
								),
								buttonRow(id(), [buttonWidget(id(), 'Learn more', '/for-professionals/', 'soft')]),
							],
							true
						),
						container(
							id(),
							{
								content_width: 'full',
								width: pct(44),
								width_tablet: pct(100),
								width_mobile: pct(100),
								padding: box(0, 0, 0, 0),
								css_classes: 'mx-overlap-media',
							},
							[
								imageWidget(
									id(),
									'healthcare-professional.jpg',
									'Healthcare professional in clinical coat with stethoscope',
									{ height: 500, heightTablet: 360, heightMobile: 320, fit: 'cover', position: 'top center', portrait: true }
								),
							],
							true
						),
					],
					true
				),
			]
		),

		// 4. For B2B / Sales
		sectionBox(
			id(),
			{
				_element_id: 'business',
				flex_direction: 'column',
				flex_gap: gap(28),
				padding: box(24, 16, 96, 16),
				padding_tablet: box(20, 16, 56, 16),
			},
			[
				headingWidget(id(), 'For B2B / Sales', 'h2', 46, {
					title_color: COLORS.navy,
					align: 'right',
					align_tablet: 'left',
					align_mobile: 'left',
				}),
				container(
					id(),
					{
						content_width: 'full',
						flex_direction: 'row',
						flex_direction_tablet: 'column-reverse',
						flex_direction_mobile: 'column-reverse',
						flex_align_items: 'center',
						flex_gap: gap(64, 32),
						background_background: 'classic',
						background_color: COLORS.softBlue,
						border_border: 'solid',
						border_width: box(1, 1, 1, 1),
						border_color: COLORS.borderStrong,
						border_radius: box(6, 6, 6, 6),
						padding: box(56, 64, 56, 64),
						padding_tablet: box(36, 28, 36, 28),
						padding_mobile: box(26, 20, 26, 20),
					},
					[
						container(
							id(),
							{
								content_width: 'full',
								width: pct(44),
								width_tablet: pct(100),
								width_mobile: pct(100),
								padding: box(0, 0, 0, 0),
								css_classes: 'mx-overlap-media',
							},
							[
								imageWidget(
									id(),
									'b2b-consultant.jpg',
									'Medical equipment B2B consultant in a surgical instruments showroom',
									{ height: 500, heightTablet: 360, heightMobile: 320, fit: 'cover', position: 'top center', portrait: true }
								),
							],
							true
						),
						container(
							id(),
							{
								content_width: 'full',
								width: pct(54),
								width_tablet: pct(100),
								width_mobile: pct(100),
								flex_direction: 'column',
								flex_gap: gap(16),
								padding: box(0, 0, 0, 0),
							},
							[
								headingWidget(id(), '02', 'p', 60, { title_color: COLORS.white, typography_line_height: em(1) }),
								headingWidget(id(), 'Your partner for surgical instrument enquiries.', 'h3', 25),
								textWidget(
									id(),
									'<p>Looking for a dependable surgical instrument supplier? Explore our commercial partnership approach or speak with our team about catalogue and volume requirements.</p>'
								),
								iconListWidget(
									id(),
									['Catalogue enquiries', 'Product information', 'Commercial & B2B enquiries'],
									'hmbl'
								),
								buttonRow(id(), [
									buttonWidget(id(), 'Learn more', '/b2b-partnerships/', 'white'),
									buttonWidget(id(), 'For B2B / Sales', '/for-b2b-sales/', 'primary'),
								]),
							],
							true
						),
					],
					true
				),
			]
		),

		// 5. Our Catalogues
		sectionBox(
			id(),
			{
				_element_id: 'catalogues',
				flex_direction: 'column',
				flex_gap: gap(14),
				padding: box(24, 16, 96, 16),
				padding_tablet: box(20, 16, 56, 16),
			},
			[
				kickerWidget(id(), 'Explore our portfolio'),
				headingWidget(id(), 'Our catalogues.', 'h2', 46),
				textWidget(id(), '<p>Discover our surgical instrument ranges across human and veterinary applications.</p>'),
				buttonRow(id(), [buttonWidget(id(), 'View full portfolio', '/portfolio/', 'white')]),
				widget(id(), 'shortcode', { shortcode: '[medexos_catalogues]' }),
			]
		),

		// 6. Contact
		contactCtaBand(id),
	]);
}

function buildAboutTemplate() {
	const id = makeIdFactory('mxab');
	return wrapTemplate('Medexos Surgical — About Medexos', [
		subpageHero(id, {
			kicker: 'Who we are',
			title: 'Medexos Surgical Enterprises.',
			lead: 'A dedicated partner for surgical instruments across human healthcare and veterinary applications — focused on clear product information, responsive enquiry handling, and reliable commercial collaboration.',
			buttons: [
				buttonWidget(id(), 'Explore our portfolio', '/portfolio/', 'primary'),
				buttonWidget(id(), 'Quality practices', '/quality/', 'white'),
			],
			image: {
				file: 'manufacturing-precision.jpg',
				alt: 'Precision CNC manufacturing, technical blueprint, and finished Medexos surgical instruments',
				fit: 'cover',
				position: 'center center',
			},
		}),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(20), padding: box(48, 16, 48, 16) }, [
			kickerWidget(id(), 'Company overview'),
			headingWidget(id(), 'Focused on surgical instrumentation and direct customer support.', 'h2', 40),
			textWidget(
				id(),
				'<p>Medexos Surgical Enterprises works with healthcare professionals, purchasing teams, and B2B distribution partners who require dependable surgical instrument ranges and straightforward technical communication.</p><p>Rather than treating product selection as a catalogue-only transaction, our team supports enquiries from initial range discovery through specification queries and ongoing B2B supply discussions.</p>'
			),
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_gap: gap(22),
					padding: box(12, 0, 0, 0),
				},
				[
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '01', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Clinical & Veterinary Breadth', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Instrument portfolios structured around practical surgical specialities for both human and veterinary clinical environments.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '02', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Clear Catalogue Documentation', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Dedicated speciality catalogues and direct team assistance so buyers can verify instrument patterns before ordering.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '03', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Direct Commercial Communication', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Responsive WhatsApp, phone, and email channels connecting healthcare teams and trade partners directly with Medexos.</p>'),
					]),
				],
				true
			),
		]),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(18), padding: box(16, 16, 48, 16) }, [
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_align_items: 'center',
					flex_gap: gap(48, 28),
					background_background: 'classic',
					background_color: COLORS.softBlue,
					border_border: 'solid',
					border_width: box(1, 1, 1, 1),
					border_color: COLORS.borderStrong,
					border_radius: box(6, 6, 6, 6),
					padding: box(48, 52, 48, 52),
					padding_mobile: box(26, 20, 26, 20),
				},
				[
					container(
						id(),
						{
							content_width: 'full',
							width: pct(55),
							width_tablet: pct(100),
							width_mobile: pct(100),
							flex_direction: 'column',
							flex_gap: gap(14),
							padding: box(0, 0, 0, 0),
						},
						[
							kickerWidget(id(), 'Our approach & capabilities'),
							headingWidget(id(), 'How we support clinical and trade partners.', 'h2', 36),
							iconListWidget(
								id(),
								[
									'Instrument range consultation across human and veterinary portfolios',
									'Catalogue supply and product sheet enquiries',
									'Direct B2B, distributor, and purchasing support',
									'Quality documentation requests handled directly by our team',
								],
								'abcl'
							),
							buttonRow(id(), [
								buttonWidget(id(), 'For Professionals', '/for-professionals/', 'primary'),
								buttonWidget(id(), 'For B2B / Sales', '/for-b2b-sales/', 'white'),
							]),
						],
						true
					),
					container(
						id(),
						{
							content_width: 'full',
							width: pct(45),
							width_tablet: pct(100),
							width_mobile: pct(100),
							padding: box(0, 0, 0, 0),
						},
						[
							imageWidget(
								id(),
								'surgical-instruments-blueprint.jpg',
								'Technical engineering blueprint of Medexos surgical instruments',
								{ height: 380, fit: 'contain' }
							),
						],
						true
					),
				],
				true
			),
		]),
		contactCtaBand(id, 'Want to learn more about Medexos?', 'Contact our team directly to discuss our surgical instrument ranges or request company and catalogue documentation.'),
	]);
}

function buildProfessionalsTemplate() {
	const id = makeIdFactory('mxpr');
	return wrapTemplate('Medexos Surgical — For Professionals', [
		subpageHero(id, {
			kicker: 'For Healthcare & Veterinary Professionals',
			title: 'Instruments built around clinical requirements.',
			lead: 'Discover surgical instrument ranges for human healthcare and veterinary practice, review catalogue options, and request specific product details directly from the Medexos team.',
			buttons: [
				buttonWidget(id(), 'Browse catalogues', '/portfolio/', 'primary'),
				buttonWidget(id(), 'Request product info', '/contact/', 'white'),
			],
			image: {
				file: 'healthcare-professional.jpg',
				alt: 'Healthcare professional in clinical coat with stethoscope',
				fit: 'cover',
				position: 'top center',
				portrait: true,
			},
		}),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(18), padding: box(48, 16, 48, 16) }, [
			kickerWidget(id(), 'How we help clinicians'),
			headingWidget(id(), 'Straightforward range discovery and enquiry support.', 'h2', 40),
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_gap: gap(22),
					padding: box(10, 0, 0, 0),
				},
				[
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '01', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Browse Speciality Ranges', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Explore our product portfolio covering human surgical disciplines and veterinary instrument sets.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '02', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Request Pattern Details', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Share your required instrument patterns, lengths, or speciality focus by WhatsApp, phone, or email.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '03', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Receive Catalogue Sheets', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Our team provides relevant catalogue pages and product documentation to support your clinical review.</p>'),
					]),
				],
				true
			),
		]),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(18), padding: box(16, 16, 48, 16) }, [
			cardPanel(id(), { padding: box(48, 52, 48, 52), padding_mobile: box(26, 20, 26, 20) }, [
				kickerWidget(id(), 'Product information checklist'),
				headingWidget(id(), 'What to include in a clinical product enquiry', 'h2', 34),
				textWidget(id(), '<p>To help our team respond quickly with the most relevant catalogue sections, share any of the following details:</p>'),
				iconListWidget(
					id(),
					[
						'Clinical discipline (human surgical speciality or veterinary practice)',
						'Specific instrument type, pattern name, or reference description',
						'Whether you need full speciality catalogues or individual item details',
						'Your preferred response channel (WhatsApp, phone, or email)',
					],
					'prcl'
				),
				buttonRow(id(), [
					buttonWidget(id(), 'View Product Portfolio', '/portfolio/', 'primary'),
					buttonWidget(id(), 'Contact our team', '/contact/', 'soft'),
				]),
			]),
		]),
		contactCtaBand(id, 'Need details on a specific instrument?', 'Speak directly with Medexos Surgical Enterprises to request product information or catalogue documentation.'),
	]);
}

function buildB2bSalesTemplate() {
	const id = makeIdFactory('mxb2');
	return wrapTemplate('Medexos Surgical — For B2B / Sales', [
		subpageHero(id, {
			kicker: 'For Distributors, Procurement & Trade Buyers',
			title: 'B2B surgical instrument supply & enquiries.',
			lead: 'Medexos Surgical Enterprises supports medical distributors, purchasing departments, and commercial sales partners with responsive catalogue access, product information, and structured trade enquiries.',
			buttons: [
				buttonWidget(id(), 'Start a B2B partnership', '/b2b-partnerships/', 'primary'),
				buttonWidget(id(), 'View catalogues', '/portfolio/', 'white'),
			],
			image: {
				file: 'b2b-consultant.jpg',
				alt: 'Medical equipment B2B consultant in a surgical instruments showroom',
				fit: 'cover',
				position: 'top center',
				portrait: true,
			},
		}),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(18), padding: box(48, 16, 48, 16) }, [
			kickerWidget(id(), 'Commercial support'),
			headingWidget(id(), 'Supported B2B and purchasing enquiries.', 'h2', 40),
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_gap: gap(22),
					padding: box(10, 0, 0, 0),
				},
				[
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '01', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Distributor Catalogue Supply', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Request speciality catalogues and range overviews tailored to your regional clinical or veterinary market.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '02', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Purchasing & Quotation Support', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Submit instrument lists or target range requirements for direct commercial follow-up with our sales team.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '03', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Quality & Documentation Requests', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Coordinate product documentation and quality verification inquiries directly before placing trade orders.</p>'),
					]),
				],
				true
			),
		]),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(18), padding: box(16, 16, 48, 16) }, [
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'column',
					flex_gap: gap(16),
					background_background: 'classic',
					background_color: COLORS.softBlue,
					border_border: 'solid',
					border_width: box(1, 1, 1, 1),
					border_color: COLORS.borderStrong,
					border_radius: box(6, 6, 6, 6),
					padding: box(48, 52, 48, 52),
					padding_mobile: box(26, 20, 26, 20),
				},
				[
					kickerWidget(id(), 'Next steps for trade buyers'),
					headingWidget(id(), 'How a commercial enquiry moves forward', 'h2', 34),
					iconListWidget(
						id(),
						[
							'Review available ranges in our Product Portfolio',
							'Share your target market, instrument categories, and enquiry volume',
							'Discuss documentation, quality requirements, and commercial terms with our team',
						],
						'b2sl'
					),
					buttonRow(id(), [
						buttonWidget(id(), 'Explore B2B Partnerships', '/b2b-partnerships/', 'primary'),
						buttonWidget(id(), 'View Product Portfolio', '/portfolio/', 'white'),
						buttonWidget(id(), 'Contact Sales', '/contact/', 'white'),
					]),
				],
				true
			),
		]),
		contactCtaBand(id, 'Planning a B2B or distributor order?', 'Reach out to discuss catalogue supply, product specifications, and commercial partnership options.'),
	]);
}

function buildB2bPartnershipsTemplate() {
	const id = makeIdFactory('mxbp');
	return wrapTemplate('Medexos Surgical — B2B Partnerships', [
		subpageHero(id, {
			kicker: 'B2B Partnerships',
			title: 'Start a commercial partnership with Medexos.',
			lead: 'A focused entry point for medical distributors, trade buyers, and regional partners looking to evaluate Medexos Surgical Enterprises for long-term surgical instrument supply.',
			buttons: [
				buttonWidget(id(), 'WhatsApp Enquiry', WHATSAPP_URL, 'primary', { external: true, icon: 'whatsapp' }),
				buttonWidget(id(), 'Contact our team', '/contact/', 'white'),
			],
			image: {
				file: 'b2b-consultant.jpg',
				alt: 'Medical equipment B2B consultant in a surgical instruments showroom',
				fit: 'cover',
				position: 'top center',
				portrait: true,
			},
		}),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(18), padding: box(48, 16, 48, 16) }, [
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_gap: gap(24),
					padding: box(0, 0, 0, 0),
				},
				[
					cardPanel(id(), { width: pct(50), width_tablet: pct(100), width_mobile: pct(100) }, [
						kickerWidget(id(), 'Why partner with Medexos'),
						headingWidget(id(), 'Direct access from enquiry to catalogue review.', 'h2', 30),
						iconListWidget(
							id(),
							[
								'Dedicated point of contact for distributor and trade enquiries',
								'Human healthcare and veterinary surgical instrument portfolios',
								'Prompt responses via WhatsApp, telephone, and email',
							],
							'bpwl'
						),
					]),
					cardPanel(
						id(),
						{
							width: pct(50),
							width_tablet: pct(100),
							width_mobile: pct(100),
							background_color: COLORS.softBlue,
							border_color: COLORS.borderStrong,
						},
						[
							kickerWidget(id(), 'Start the conversation'),
							headingWidget(id(), 'Tell us about your market and requirements.', 'h2', 30),
							textWidget(
								id(),
								'<p>Share your company name, target surgical categories, and whether you are seeking general catalogues or specific product quotations. Our team will follow up directly.</p>'
							),
							buttonRow(id(), [
								buttonWidget(id(), 'For B2B / Sales Overview', '/for-b2b-sales/', 'white'),
								buttonWidget(id(), 'Product Portfolio', '/portfolio/', 'primary'),
							]),
						]
					),
				],
				true
			),
		]),
		contactCtaBand(id, 'Ready to begin a partnership enquiry?', 'Message us directly on WhatsApp or visit the Contact page to connect with Medexos Surgical Enterprises.'),
	]);
}

function buildQualityTemplate() {
	const id = makeIdFactory('mxql');
	return wrapTemplate('Medexos Surgical — Quality', [
		subpageHero(id, {
			kicker: 'Quality & Documentation',
			title: 'Committed to reliable surgical instrumentation.',
			lead: 'Medexos Surgical Enterprises prioritizes clear product specifications, responsive documentation support, and transparent communication with clinical and B2B buyers.',
			buttons: [
				buttonWidget(id(), 'Request quality documentation', '/contact/', 'primary'),
				buttonWidget(id(), 'Explore portfolio', '/portfolio/', 'white'),
			],
			image: {
				file: 'manufacturing-precision.jpg',
				alt: 'Precision CNC manufacturing, technical blueprint, and finished Medexos surgical instruments',
				fit: 'cover',
				position: 'center center',
			},
		}),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(20), padding: box(48, 16, 48, 16) }, [
			kickerWidget(id(), 'Confirmed Medexos practices'),
			headingWidget(id(), 'How we handle quality enquiries and product documentation.', 'h2', 40),
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_gap: gap(22),
					padding: box(8, 0, 0, 0),
				},
				[
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '01', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Specification Clarity', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>We work directly with buyers to clarify instrument patterns, intended human or veterinary applications, and catalogue details before order confirmation.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '02', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Direct Documentation Requests', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Customers and procurement teams can request current product sheets and available compliance documentation directly via email, telephone, or WhatsApp.</p>'),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), '03', 'p', 28, { title_color: COLORS.navy }),
						headingWidget(id(), 'Responsive Follow-Up', 'h3', 20, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Questions regarding handling, range suitability, or commercial documentation are routed directly to our team for timely answers.</p>'),
					]),
				],
				true
			),
		]),
		contactCtaBand(id, 'Need quality or product documentation?', 'Contact our team directly to request current documentation for your evaluation or procurement process.'),
	]);
}

function buildPortfolioTemplate() {
	const id = makeIdFactory('mxpf');
	return wrapTemplate('Medexos Surgical — Product Portfolio / Catalogues', [
		subpageHero(id, {
			kicker: 'Product Portfolio',
			title: 'Surgical instrument catalogues.',
			lead: 'Browse our surgical instrument ranges across human healthcare and veterinary applications. Published Medexos catalogues appear automatically below and link directly to their individual catalogue pages.',
			buttons: [
				buttonWidget(id(), 'Request a catalogue', '/contact/', 'primary'),
				buttonWidget(id(), 'For B2B / Sales', '/for-b2b-sales/', 'white'),
			],
			image: {
				file: 'surgical-instruments-blueprint.jpg',
				alt: 'Technical engineering blueprint of Medexos surgical instruments',
				fit: 'contain',
			},
		}),
		sectionBox(id(), { _element_id: 'catalogues', flex_direction: 'column', flex_gap: gap(14), padding: box(40, 16, 64, 16) }, [
			kickerWidget(id(), 'Available ranges'),
			headingWidget(id(), 'Our catalogues.', 'h2', 42),
			textWidget(
				id(),
				'<p>Select a published catalogue below to explore available instrument sets, or contact our team if you require a specific surgical speciality sheet.</p>'
			),
			widget(id(), 'shortcode', { shortcode: '[medexos_catalogues]' }),
		]),
		contactCtaBand(id, 'Looking for a specific instrument or speciality range?', 'Contact Medexos Surgical Enterprises to request product sheets or discuss your catalogue requirements.'),
	]);
}

function buildContactTemplate() {
	const id = makeIdFactory('mxct');
	return wrapTemplate('Medexos Surgical — Contact', [
		subpageHero(id, {
			kicker: 'Contact Medexos Surgical Enterprises',
			title: 'We are here to help with your enquiry.',
			lead: 'Reach our team directly via WhatsApp, telephone, or email for product information, catalogue requests, and B2B commercial discussions.',
			buttons: [
				buttonWidget(id(), 'WhatsApp Enquiry', WHATSAPP_URL, 'primary', { external: true, icon: 'whatsapp' }),
				buttonWidget(id(), 'Email our team', 'mailto:info@medexossurgical.com', 'white', { icon: 'none' }),
			],
		}),
		sectionBox(id(), { flex_direction: 'column', flex_gap: gap(20), padding: box(40, 16, 64, 16) }, [
			kickerWidget(id(), 'Verified contact channels'),
			headingWidget(id(), 'Direct ways to reach our team.', 'h2', 38),
			container(
				id(),
				{
					content_width: 'full',
					flex_direction: 'row',
					flex_direction_tablet: 'column',
					flex_direction_mobile: 'column',
					flex_gap: gap(22),
					padding: box(8, 0, 0, 0),
				},
				[
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), 'WhatsApp Enquiry', 'h3', 22, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Fastest channel for product questions, catalogue requests, and initial B2B introductions. Default number: <strong>+92 329 6324928</strong>.</p>'),
						buttonRow(id(), [
							buttonWidget(id(), 'Message on WhatsApp', WHATSAPP_URL, 'primary', { external: true, icon: 'whatsapp' }),
						]),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), 'Telephone', 'h3', 22, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Speak directly with Medexos Surgical Enterprises for urgent product or commercial queries.</p><p><strong>+92 329 6324928</strong></p>'),
						buttonRow(id(), [
							buttonWidget(id(), 'Call +92 329 6324928', 'tel:+923296324928', 'white', { icon: 'none' }),
						]),
					]),
					cardPanel(id(), { width: pct(33.33), width_tablet: pct(100), width_mobile: pct(100) }, [
						headingWidget(id(), 'Email', 'h3', 22, { title_color: COLORS.navy }),
						textWidget(id(), '<p>Send instrument lists, catalogue requests, or formal procurement enquiries to our inbox.</p><p><strong>info@medexossurgical.com</strong></p>'),
						buttonRow(id(), [
							buttonWidget(id(), 'info@medexossurgical.com', 'mailto:info@medexossurgical.com', 'white', { icon: 'none' }),
						]),
					]),
				],
				true
			),
		]),
	]);
}

function buildLegalTemplate(prefix, pageTitle, lead, reviewItems, sections) {
	const id = makeIdFactory(prefix);
	const docChildren = [
		reviewNoticeBox(
			id,
			'Draft Legal Page — Review Required Before Publishing',
			`<p>Keep this WordPress page in <strong>Draft</strong> status until Medexos Surgical Enterprises reviews and completes every flagged item below. Once approved and published, the theme footer automatically adds the link.</p><ul>${reviewItems.map((item) => `<li><strong>[REVIEW REQUIRED]</strong> ${item}</li>`).join('')}</ul>`
		),
	];

	for (const sec of sections) {
		docChildren.push(headingWidget(id(), sec.heading, 'h2', 24, { title_color: COLORS.navy, _margin: box(16, 0, 0, 0) }));
		docChildren.push(textWidget(id(), sec.body));
	}

	return wrapTemplate(`Medexos Surgical — ${pageTitle} (Draft)`, [
		subpageHero(id, {
			kicker: 'Draft for Review',
			title: pageTitle,
			lead,
		}),
		sectionBox(id(), { flex_direction: 'column', padding: box(24, 16, 72, 16) }, [
			cardPanel(id(), { padding: box(48, 52, 48, 52), padding_mobile: box(24, 20, 24, 20) }, docChildren),
		]),
	]);
}

const TEMPLATES = {
	'home.json': buildHomeTemplate(),
	'who-we-are.json': buildAboutTemplate(),
	'for-professionals.json': buildProfessionalsTemplate(),
	'for-b2b-sales.json': buildB2bSalesTemplate(),
	'b2b-partnerships.json': buildB2bPartnershipsTemplate(),
	'quality.json': buildQualityTemplate(),
	'portfolio.json': buildPortfolioTemplate(),
	'contact.json': buildContactTemplate(),
	'legal-notice.json': buildLegalTemplate(
		'mxln',
		'Legal Notice',
		'Draft corporate and website publisher notice for Medexos Surgical Enterprises. Complete all flagged fields before publishing.',
		[
			'Full registered legal name and business entity type (e.g., sole proprietorship, partnership, private limited company).',
			'Registered physical street address, city, postal code, and country.',
			'Authorized representative / director name(s).',
			'Company registration number, tax / NTN / VAT / sales tax registration numbers (as applicable).',
			'Applicable regulatory authority disclosures, if required in your jurisdiction.',
		],
		[
			{
				heading: '1. Website Publisher',
				body: '<p><strong>Medexos Surgical Enterprises</strong><br>[REVIEW REQUIRED: Legal entity form and registered street address, city, postal code, country]</p>',
			},
			{
				heading: '2. Represented By',
				body: '<p>[REVIEW REQUIRED: Full name(s) and title(s) of authorized managing director(s) or legal representative(s).]</p>',
			},
			{
				heading: '3. Contact Details',
				body: '<p>Telephone / WhatsApp: +92 329 6324928<br>Email: info@medexossurgical.com</p>',
			},
			{
				heading: '4. Registration & Tax Information',
				body: '<p>[REVIEW REQUIRED: Commercial register / SECP / chamber registration number and applicable tax or VAT identifiers.]</p>',
			},
			{
				heading: '5. Responsibility for Content & External Links',
				body: '<p>Information on this website is maintained for product and commercial enquiry purposes. [REVIEW REQUIRED: Confirm jurisdiction-specific liability and copyright notices with legal counsel before publishing.]</p>',
			},
		]
	),
	'privacy-policy.json': buildLegalTemplate(
		'mxpp',
		'Privacy Policy',
		'Draft privacy notice outlining how Medexos Surgical Enterprises handles enquiry and website data. Complete all flagged policy decisions before publishing.',
		[
			'Name and registered physical address of the Data Controller.',
			'Web hosting provider name, server location, and log retention period.',
			'Disclosure of external services used on the live WordPress site (WhatsApp click-to-chat, Google Fonts or self-hosted fonts, contact form plugins, analytics, or cookie consent tool).',
			'Applicable data protection laws (e.g., GDPR for EU visitors, UK GDPR, or local regulations) and data retention periods.',
		],
		[
			{
				heading: '1. Data Controller',
				body: '<p><strong>Medexos Surgical Enterprises</strong><br>[REVIEW REQUIRED: Registered postal address]<br>Email: info@medexossurgical.com<br>Telephone: +92 329 6324928</p>',
			},
			{
				heading: '2. Hosting & Server Access Logs',
				body: '<p>[REVIEW REQUIRED: Insert your WordPress hosting provider name, data centre region, and server log retention period for technical security and site delivery.]</p>',
			},
			{
				heading: '3. Enquiries via Email, Telephone & WhatsApp',
				body: '<p>When you contact us by email, telephone, or WhatsApp, we process the contact and enquiry details you share in order to respond to your request. Note that clicking a WhatsApp enquiry link opens WhatsApp (a third-party messaging service governed by its own privacy policy). [REVIEW REQUIRED: Confirm retention timeframe and lawful basis wording.]</p>',
			},
			{
				heading: '4. Fonts, Cookies & Embedded Services',
				body: '<p>[REVIEW REQUIRED: Document whether Google Fonts are loaded remotely or self-hosted, whether cookies/analytics are enabled, and include your cookie consent policy if applicable.]</p>',
			},
			{
				heading: '5. Your Rights',
				body: '<p>You may contact info@medexossurgical.com to request information about, correction of, or deletion of personal data you have submitted to us. [REVIEW REQUIRED: Align exact statutory rights and supervisory authority disclosures with your target jurisdictions.]</p>',
			},
		]
	),
	'terms-and-conditions.json': buildLegalTemplate(
		'mxtc',
		'Terms and Conditions',
		'Draft general terms and conditions for commercial enquiries, quotations, and supply by Medexos Surgical Enterprises. Review with legal counsel before publishing.',
		[
			'Governing law, place of performance, and court of jurisdiction.',
			'Quotation validity period, Incoterms / shipping terms, delivery lead times, and transfer of risk.',
			'Payment terms, accepted currencies, taxes/customs duties, and title retention clauses.',
			'Inspection window for incoming goods, warranty duration, returns/repairs policy, and liability limits.',
			'Medical device / surgical instrument handling, sterilization, and traceability obligations applicable to buyers.',
		],
		[
			{
				heading: '1. Scope & Applicability',
				body: '<p>These draft Terms and Conditions are intended to govern commercial quotations, orders, and supply of surgical instruments by Medexos Surgical Enterprises to business and professional buyers. [REVIEW REQUIRED: Confirm whether consumer sales are excluded.]</p>',
			},
			{
				heading: '2. Quotations, Orders & Contract Formation',
				body: '<p>Product listings and catalogues on this website serve as non-binding product information. A binding contract is formed only upon written order confirmation by Medexos Surgical Enterprises. [REVIEW REQUIRED: Confirm quotation validity and order modification rules.]</p>',
			},
			{
				heading: '3. Pricing, Payment & Delivery Terms',
				body: '<p>[REVIEW REQUIRED: Specify currency, applicable Incoterms, packaging/freight responsibilities, payment milestones, and late-payment terms.]</p>',
			},
			{
				heading: '4. Inspection, Warranty & Instrument Use',
				body: '<p>Surgical instruments must be inspected upon receipt and handled, cleaned, sterilized, and maintained only by qualified personnel in accordance with applicable clinical standards. [REVIEW REQUIRED: Define defect notification period, warranty terms, and liability limitations.]</p>',
			},
			{
				heading: '5. Confidentiality, Technical Information & Governing Law',
				body: '<p>[REVIEW REQUIRED: Confirm confidentiality obligations, intellectual property terms for custom drawings/specifications, governing law, and exclusive jurisdiction.]</p>',
			},
		]
	),
};

async function run() {
	await fs.mkdir(outDir, { recursive: true });
	const names = Object.keys(TEMPLATES);
	for (const fileName of names) {
		const json = JSON.stringify(TEMPLATES[fileName], null, 2) + '\n';
		await fs.writeFile(path.join(outDir, fileName), json, 'utf-8');
	}
	console.log(`Generated ${names.length} Elementor Free JSON templates in elementor-templates/.`);
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
