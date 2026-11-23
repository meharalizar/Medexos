<?php
if (!defined('ABSPATH')) {
	exit;
}

if (is_page() && medexos_uses_page_builder()) {
	require get_template_directory() . '/templates/elementor-full-width.php';
	return;
}

get_header();

$asset        = get_template_directory_uri() . '/assets/';
$arrow        = medexos_arrow_icon_svg();
$whatsapp_url = medexos_whatsapp_url();
?>

<section class="hero" aria-label="<?php esc_attr_e('Introduction', 'medexos'); ?>">
	<div class="panel hero-copy">
		<p class="hero-kicker"><?php esc_html_e('Your partner for surgical instruments and manufacturing enquiries.', 'medexos'); ?></p>
		<h1>MEDEXOS.<span>surgical<br>instruments.</span></h1>
		<p class="hero-lead"><?php esc_html_e('Explore our surgical instrument portfolio for human healthcare and veterinary applications, backed by responsive product and commercial support.', 'medexos'); ?></p>
		<div class="actions">
			<a class="button" href="<?php echo esc_url(medexos_page_url('who-we-are')); ?>">
				<span><?php esc_html_e('Who we are', 'medexos'); ?></span>
				<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a class="button alt" href="<?php echo esc_url(medexos_page_url('portfolio')); ?>">
				<span><?php esc_html_e('Our portfolio', 'medexos'); ?></span>
				<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
	</div>
	<div class="panel hero-art">
		<img src="<?php echo esc_url($asset . 'surgical-instruments-blueprint.jpg'); ?>" alt="<?php esc_attr_e('Technical engineering blueprint of Medexos surgical instruments', 'medexos'); ?>">
	</div>
</section>

<section class="ref-intro" id="about">
	<div class="intro-visual">
		<img src="<?php echo esc_url($asset . 'manufacturing-precision.jpg'); ?>" alt="<?php esc_attr_e('Precision CNC manufacturing, technical blueprint, and finished Medexos surgical instruments', 'medexos'); ?>">
	</div>
	<div>
		<span class="ref-kicker"><?php esc_html_e('What we do', 'medexos'); ?></span>
		<h2><?php esc_html_e('Our dedication is to surgical instrumentation.', 'medexos'); ?></h2>
		<p><?php esc_html_e('Medexos Surgical Enterprises offers a focused portfolio of instruments across surgical specialities. We work closely with clinical buyers and distribution partners to understand exact requirements and share product documentation.', 'medexos'); ?></p>
		<p><?php esc_html_e('From individual instrument enquiries to full catalogue requests and ongoing B2B supply discussions, our team is ready to assist.', 'medexos'); ?></p>
		<div class="intro-meta" aria-label="<?php esc_attr_e('Key focus areas', 'medexos'); ?>">
			<span><?php esc_html_e('Human & Veterinary Ranges', 'medexos'); ?></span>
			<span class="sep" aria-hidden="true">&middot;</span>
			<span><?php esc_html_e('Catalogue Information', 'medexos'); ?></span>
			<span class="sep" aria-hidden="true">&middot;</span>
			<span><?php esc_html_e('Direct B2B Enquiries', 'medexos'); ?></span>
		</div>
		<div class="actions">
			<a class="button" href="<?php echo esc_url(medexos_page_url('for-professionals')); ?>">
				<span><?php esc_html_e('For professionals', 'medexos'); ?></span>
				<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
			<a class="button white" href="<?php echo esc_url(medexos_page_url('for-b2b-sales')); ?>">
				<span><?php esc_html_e('For B2B / Sales', 'medexos'); ?></span>
				<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
	</div>
</section>

<section class="audience" id="professionals">
	<h2><?php esc_html_e('For Professionals', 'medexos'); ?></h2>
	<div class="audience-panel">
		<div class="audience-copy">
			<div class="audience-num" aria-hidden="true">01</div>
			<h3><?php esc_html_e('Supporting the people who use our instruments.', 'medexos'); ?></h3>
			<p><?php esc_html_e('Browse our instrument ranges for human and veterinary applications and contact our team to discuss product specifications and catalogue details.', 'medexos'); ?></p>
			<ul class="checks">
				<li><?php esc_html_e('Specialist product ranges', 'medexos'); ?></li>
				<li><?php esc_html_e('Catalogue information', 'medexos'); ?></li>
				<li><?php esc_html_e('Responsive product enquiries', 'medexos'); ?></li>
			</ul>
			<a class="button alt" href="<?php echo esc_url(medexos_page_url('for-professionals')); ?>">
				<span><?php esc_html_e('Learn more', 'medexos'); ?></span>
				<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>
		</div>
		<img src="<?php echo esc_url($asset . 'healthcare-professional.jpg'); ?>" alt="<?php esc_attr_e('Healthcare professional in clinical coat with stethoscope', 'medexos'); ?>" loading="lazy">
	</div>
</section>

<section class="audience reverse" id="business">
	<h2><?php esc_html_e('For B2B / Sales', 'medexos'); ?></h2>
	<div class="audience-panel">
		<div class="audience-copy">
			<div class="audience-num" aria-hidden="true">02</div>
			<h3><?php esc_html_e('Your partner for surgical instrument enquiries.', 'medexos'); ?></h3>
			<p><?php esc_html_e('Looking for a dependable surgical instrument supplier? Explore our commercial partnership approach or speak with our team about catalogue and volume requirements.', 'medexos'); ?></p>
			<ul class="checks">
				<li><?php esc_html_e('Catalogue enquiries', 'medexos'); ?></li>
				<li><?php esc_html_e('Product information', 'medexos'); ?></li>
				<li><?php esc_html_e('Commercial & B2B enquiries', 'medexos'); ?></li>
			</ul>
			<div class="actions">
				<a class="button white" href="<?php echo esc_url(medexos_page_url('b2b-partnerships')); ?>">
					<span><?php esc_html_e('Learn more', 'medexos'); ?></span>
					<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
				<a class="button" href="<?php echo esc_url(medexos_page_url('for-b2b-sales')); ?>">
					<span><?php esc_html_e('For B2B / Sales', 'medexos'); ?></span>
					<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
			</div>
		</div>
		<img src="<?php echo esc_url($asset . 'b2b-consultant.jpg'); ?>" alt="<?php esc_attr_e('Medical equipment B2B consultant in a surgical instruments showroom', 'medexos'); ?>" loading="lazy">
	</div>
</section>

<section class="portfolio" id="catalogues">
	<div class="portfolio-head">
		<div class="portfolio-head-copy">
			<span class="ref-kicker"><?php esc_html_e('Explore our portfolio', 'medexos'); ?></span>
			<h2><?php esc_html_e('Our catalogues.', 'medexos'); ?></h2>
			<p><?php esc_html_e('Discover our surgical instrument ranges across human and veterinary applications.', 'medexos'); ?></p>
		</div>
		<a class="button white" href="<?php echo esc_url(medexos_page_url('portfolio')); ?>">
			<span><?php esc_html_e('View full portfolio', 'medexos'); ?></span>
			<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	</div>
	<?php echo medexos_render_catalogues_grid(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</section>

<section class="ref-contact" id="contact">
	<div class="ref-contact-panel">
		<div>
			<span class="ref-kicker"><?php esc_html_e('Feel free to send us a request', 'medexos'); ?></span>
			<h2><?php esc_html_e('Have a question?', 'medexos'); ?><br><?php esc_html_e("We're here to help.", 'medexos'); ?></h2>
			<p><?php esc_html_e('Reach our team via WhatsApp, telephone, or email, or visit our Contact page for full enquiry guidance.', 'medexos'); ?></p>
		</div>
		<div>
			<h3><?php esc_html_e("Let's talk about your requirements.", 'medexos'); ?></h3>
			<p><?php esc_html_e('Our team is available to assist with product specifications, catalogue requests, and commercial enquiries.', 'medexos'); ?></p>
			<div class="actions">
				<?php if ($whatsapp_url) : ?>
					<a class="button medexos-whatsapp" href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer">
						<span><?php esc_html_e('WhatsApp Enquiry', 'medexos'); ?></span>
						<?php echo medexos_whatsapp_icon_svg(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</a>
				<?php endif; ?>
				<a class="button white" href="<?php echo esc_url(medexos_page_url('contact')); ?>">
					<span><?php esc_html_e('Contact page', 'medexos'); ?></span>
					<?php echo $arrow; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
				<a class="button white" href="tel:+923296324928">+92 329 6324928</a>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
