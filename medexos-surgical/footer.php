<?php
if (!defined('ABSPATH')) {
	exit;
}

$whatsapp_url      = medexos_whatsapp_url();
$legal_notice_url  = medexos_published_page_url('legal-notice');
$privacy_url       = get_privacy_policy_url() ? get_privacy_policy_url() : medexos_published_page_url('privacy-policy');
$terms_url         = medexos_published_page_url('terms-and-conditions');
?>
</main>

<footer class="footer">
	<div class="footer-inner">
		<div>
			<p class="footer-brand">MEDEXOS SURGICAL ENTERPRISES</p>
			<p class="footer-tagline"><?php esc_html_e('Surgical instruments for professional clinical and B2B requirements.', 'medexos'); ?></p>
		</div>

		<div>
			<p class="footer-heading"><?php esc_html_e('Company', 'medexos'); ?></p>
			<ul class="footer-links">
				<li><a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home', 'medexos'); ?></a></li>
				<li><a href="<?php echo esc_url(medexos_page_url('who-we-are')); ?>"><?php esc_html_e('About Medexos', 'medexos'); ?></a></li>
				<li><a href="<?php echo esc_url(medexos_page_url('quality')); ?>"><?php esc_html_e('Quality', 'medexos'); ?></a></li>
				<li><a href="<?php echo esc_url(medexos_page_url('portfolio')); ?>"><?php esc_html_e('Product Portfolio', 'medexos'); ?></a></li>
			</ul>
		</div>

		<div>
			<p class="footer-heading"><?php esc_html_e('Solutions', 'medexos'); ?></p>
			<ul class="footer-links">
				<li><a href="<?php echo esc_url(medexos_page_url('for-professionals')); ?>"><?php esc_html_e('For Professionals', 'medexos'); ?></a></li>
				<li><a href="<?php echo esc_url(medexos_page_url('for-b2b-sales')); ?>"><?php esc_html_e('For B2B / Sales', 'medexos'); ?></a></li>
				<li><a href="<?php echo esc_url(medexos_page_url('b2b-partnerships')); ?>"><?php esc_html_e('B2B Partnerships', 'medexos'); ?></a></li>
				<li><a href="<?php echo esc_url(medexos_page_url('contact')); ?>"><?php esc_html_e('Contact', 'medexos'); ?></a></li>
			</ul>
		</div>

		<div>
			<p class="footer-heading"><?php esc_html_e('Direct Contact', 'medexos'); ?></p>
			<ul class="footer-links">
				<li><a href="mailto:info@medexossurgical.com">info@medexossurgical.com</a></li>
				<li><a href="tel:+923296324928">+92 329 6324928</a></li>
				<?php if ($whatsapp_url) : ?>
					<li><a href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e('WhatsApp Enquiry', 'medexos'); ?></a></li>
				<?php endif; ?>
			</ul>
		</div>
	</div>

	<div class="footer-bottom">
		<span>&copy; <?php echo esc_html(gmdate('Y')); ?> Medexos Surgical Enterprises</span>
		<div class="footer-legal">
			<?php if ($legal_notice_url) : ?>
				<a href="<?php echo esc_url($legal_notice_url); ?>"><?php esc_html_e('Legal Notice', 'medexos'); ?></a>
			<?php endif; ?>
			<?php if ($privacy_url) : ?>
				<a href="<?php echo esc_url($privacy_url); ?>"><?php esc_html_e('Privacy Policy', 'medexos'); ?></a>
			<?php endif; ?>
			<?php if ($terms_url) : ?>
				<a href="<?php echo esc_url($terms_url); ?>"><?php esc_html_e('Terms and Conditions', 'medexos'); ?></a>
			<?php endif; ?>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
