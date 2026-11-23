<?php
if (!defined('ABSPATH')) {
	exit;
}

add_action('after_setup_theme', function () {
	add_theme_support('title-tag');
	add_theme_support('custom-logo', array(
		'height'      => 100,
		'width'       => 280,
		'flex-height' => true,
		'flex-width'  => true,
	));
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
	register_nav_menus(array(
		'primary' => __('Primary navigation', 'medexos'),
		'footer'  => __('Footer navigation', 'medexos'),
	));
});

add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'medexos-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style('medexos', get_stylesheet_uri(), array('medexos-fonts'), '0.5.0');
	wp_enqueue_style(
		'medexos-layout',
		get_template_directory_uri() . '/assets/reference-layout.css',
		array('medexos'),
		'0.5.0'
	);
	wp_enqueue_script(
		'medexos-menu',
		get_template_directory_uri() . '/assets/menu.js',
		array(),
		'0.3.0',
		true
	);
});

/**
 * Returns catalogue definitions from the companion plugin when active.
 *
 * @return array
 */
function medexos_items() {
	return function_exists('medexos_catalogues') ? medexos_catalogues() : array();
}

/**
 * Resolves a Medexos inner page URL by slug, using the published page permalink
 * when available and falling back cleanly to the expected root slug URL.
 *
 * @param string $slug Page slug without leading/trailing slashes.
 * @return string
 */
function medexos_page_url($slug) {
	$clean_slug = trim((string) $slug, '/');
	if ($clean_slug === '') {
		return home_url('/');
	}

	$page = get_page_by_path($clean_slug);
	if ($page && $page->post_status === 'publish') {
		return get_permalink($page);
	}

	return home_url('/' . $clean_slug . '/');
}

/**
 * Returns the permalink for a legal page only when it exists and is published.
 *
 * @param string $slug Legal page slug.
 * @return string Empty string if draft or missing.
 */
function medexos_published_page_url($slug) {
	$clean_slug = trim((string) $slug, '/');
	$page       = get_page_by_path($clean_slug);

	if ($page && $page->post_status === 'publish') {
		return get_permalink($page);
	}

	return '';
}

/**
 * Checks whether the current request matches any of the supplied page slugs.
 *
 * @param array $slugs List of page slugs (use '' for front page).
 * @return bool
 */
function medexos_is_active_slug($slugs) {
	foreach ((array) $slugs as $slug) {
		if ($slug === '' && is_front_page()) {
			return true;
		}
		if ($slug !== '' && is_page($slug)) {
			return true;
		}
	}

	return false;
}

/**
 * Detects whether the current page uses the Medexos Full Width template or Elementor.
 *
 * @return bool
 */
function medexos_uses_page_builder() {
	if (is_page_template('templates/elementor-full-width.php')) {
		return true;
	}

	$post_id = get_queried_object_id();
	if (!$post_id || !did_action('elementor/loaded')) {
		return false;
	}

	$document = \Elementor\Plugin::$instance->documents->get($post_id);

	return $document && $document->is_built_with_elementor();
}

/**
 * Sanitizes the Customizer WhatsApp phone number to digits only.
 *
 * @param mixed $value Raw Customizer value.
 * @return string
 */
function medexos_sanitize_whatsapp_number($value) {
	return preg_replace('/[^0-9]/', '', (string) $value);
}

add_action('customize_register', function ($customizer) {
	$customizer->add_section('medexos_contact', array(
		'title' => __('Medexos Contact', 'medexos'),
	));
	$customizer->add_setting('medexos_whatsapp_number', array(
		'default'           => '923296324928',
		'sanitize_callback' => 'medexos_sanitize_whatsapp_number',
	));
	$customizer->add_control('medexos_whatsapp_number', array(
		'section'     => 'medexos_contact',
		'label'       => __('WhatsApp number (with country code)', 'medexos'),
		'description' => __('Leave blank to hide the button.', 'medexos'),
		'type'        => 'tel',
	));
});

/**
 * Builds the WhatsApp enquiry link from the Customizer setting.
 *
 * @return string
 */
function medexos_whatsapp_url() {
	$number = medexos_sanitize_whatsapp_number(get_theme_mod('medexos_whatsapp_number', '923296324928'));

	return preg_match('/^[1-9][0-9]{7,14}$/D', $number) ? 'https://wa.me/' . $number : '';
}

add_filter('body_class', function ($classes) {
	if (is_page() && medexos_uses_page_builder()) {
		$classes[] = 'medexos-builder-page';
	}

	return $classes;
});

/**
 * Returns the inline arrow icon used in theme CTA links.
 *
 * @return string
 */
function medexos_arrow_icon_svg() {
	return '<svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
}

/**
 * Returns the inline chevron icon used in dropdown menu buttons.
 *
 * @return string
 */
function medexos_chevron_icon_svg() {
	return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';
}

/**
 * Returns the inline WhatsApp icon used in the header and contact CTA.
 *
 * @return string
 */
function medexos_whatsapp_icon_svg() {
	return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.6a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.1 8.1c.5 3.6 2.2 5.4 5.9 6.5.7.2 1.5-.3 1.8-1l.2-.6-2.2-1.1-.8 1c-1.3-.6-2.3-1.6-2.8-2.9l.9-.8L10 7l-.6.1c-.7.2-1.3.5-1.3 1Z"/></svg>';
}

/**
 * Renders the surgical catalogues grid.
 * Uses the companion plugin's medexos_catalogues() when active and falls back
 * gracefully to core Medexos instrument ranges when the plugin is inactive.
 *
 * @return string
 */
function medexos_render_catalogues_grid() {
	$items       = medexos_items();
	$arrow       = medexos_arrow_icon_svg();
	$contact_url = medexos_page_url('contact');

	ob_start();

	if (!empty($items) && is_array($items)) :
		?>
		<div class="grid medexos-catalogue-grid">
			<?php
			foreach ($items as $key => $item) :
				$title       = isset($item['title']) ? (string) $item['title'] : (string) $key;
				$description = !empty($item['description']) ? (string) $item['description'] : '';
				$page        = get_page_by_path($key);
				$has_cover   = function_exists('medexos_asset_url');
				?>
				<article class="card">
					<div class="card-media">
						<?php if ($has_cover) : ?>
							<img src="<?php echo esc_url(medexos_asset_url('covers/' . $key . '.jpg')); ?>" alt="<?php echo esc_attr($title . ' catalogue cover'); ?>" loading="lazy">
						<?php else : ?>
							<div class="card-emblem" aria-hidden="true">
								<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
								<span class="card-emblem-code"><?php esc_html_e('CATALOGUE', 'medexos'); ?></span>
							</div>
						<?php endif; ?>
					</div>
					<div class="card-body">
						<h3><?php echo esc_html($title); ?></h3>
						<?php if ($description !== '') : ?>
							<p><?php echo esc_html($description); ?></p>
						<?php endif; ?>
						<?php if ($page && $page->post_status === 'publish') : ?>
							<a class="card-link" href="<?php echo esc_url(get_permalink($page)); ?>">
								<?php esc_html_e('Explore catalogue', 'medexos'); ?>
								<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						<?php else : ?>
							<a class="card-link" href="<?php echo esc_url($contact_url); ?>">
								<?php esc_html_e('Request catalogue', 'medexos'); ?>
								<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</a>
						<?php endif; ?>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
		<?php
	else :
		$fallback_ranges = array(
			array(
				'code'        => 'RANGE 01',
				'title'       => __('General & Diagnostic Instruments', 'medexos'),
				'description' => __('Forceps, scissors, retractors, and theatre essentials manufactured to consistent clinical tolerances.', 'medexos'),
				'icon'        => '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/></svg>',
			),
			array(
				'code'        => 'RANGE 02',
				'title'       => __('Dental & Oral Surgery', 'medexos'),
				'description' => __('Elevators, extraction forceps, scalers, and restorative sets designed for precision handling.', 'medexos'),
				'icon'        => '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3c-2.5 0-4 2.2-4 5.2 0 3.2 1.7 5.5 2.4 9.2.3 1.7 1.2 3.6 2.4 3.6 1.1 0 1.6-1.8 2.2-4 .5-1.7 1.5-2.5 2-2.5s1.5.8 2 2.5c.6 2.2 1.1 4 2.2 4 1.2 0 2.1-1.9 2.4-3.6.7-3.7 2.4-6 2.4-9.2C21 5.2 19.5 3 17 3c-1.8 0-3.1.9-5 .9S8.8 3 7 3Z"/></svg>',
			),
			array(
				'code'        => 'RANGE 03',
				'title'       => __('ENT, Ophthalmic & Microsurgery', 'medexos'),
				'description' => __('Fine-tip micro-instruments, specula, and needle holders engineered for delicate procedures.', 'medexos'),
				'icon'        => '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
			),
			array(
				'code'        => 'RANGE 04',
				'title'       => __('Veterinary Surgical Ranges', 'medexos'),
				'description' => __('Durable small-animal and large-animal instrument sets supporting modern veterinary practices.', 'medexos'),
				'icon'        => '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="4"/></svg>',
			),
		);
		?>
		<div class="grid medexos-catalogue-grid">
			<?php foreach ($fallback_ranges as $range) : ?>
				<article class="card">
					<div class="card-media">
						<div class="card-emblem" aria-hidden="true">
							<?php echo $range['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span class="card-emblem-code"><?php echo esc_html($range['code']); ?></span>
						</div>
					</div>
					<div class="card-body">
						<h3><?php echo esc_html($range['title']); ?></h3>
						<p><?php echo esc_html($range['description']); ?></p>
						<a class="card-link" href="<?php echo esc_url($contact_url); ?>">
							<?php esc_html_e('Request catalogue', 'medexos'); ?>
							<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</a>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
		<p class="catalogue-fallback-note">
			<?php esc_html_e('Downloadable catalogue editions publish here automatically when the Medexos Catalogues plugin is active. Contact our team directly for full product sheets.', 'medexos'); ?>
		</p>
		<?php
	endif;

	return ob_get_clean();
}

add_shortcode('medexos_catalogues', 'medexos_render_catalogues_grid');
