<?php
if (!defined('ABSPATH')) {
	exit;
}

$chevron = medexos_chevron_icon_svg();
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip" href="#main"><?php esc_html_e('Skip to content', 'medexos'); ?></a>

<header class="header wrap">
	<a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
		<?php
		if (has_custom_logo()) {
			$logo = wp_get_attachment_image_url(get_theme_mod('custom_logo'), 'full');
		} else {
			$logo = get_template_directory_uri() . '/assets/logo.png';
		}
		?>
		<img src="<?php echo esc_url($logo); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
	</a>

	<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true" focusable="false">
			<path d="M4 7h16"/>
			<path d="M4 12h16"/>
			<path d="M4 17h16"/>
		</svg>
		<span><?php esc_html_e('Menu', 'medexos'); ?></span>
	</button>

	<nav aria-label="<?php esc_attr_e('Primary navigation', 'medexos'); ?>" id="primary-nav">
		<?php
		if (has_nav_menu('primary')) {
			wp_nav_menu(array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'nav',
			));
		} else {
			$home_active          = medexos_is_active_slug(array(''));
			$about_active         = medexos_is_active_slug(array('who-we-are'));
			$quality_active       = medexos_is_active_slug(array('quality'));
			$about_group_active   = $about_active || $quality_active;
			$prof_active          = medexos_is_active_slug(array('for-professionals'));
			$b2b_active           = medexos_is_active_slug(array('for-b2b-sales'));
			$partner_active       = medexos_is_active_slug(array('b2b-partnerships'));
			$solutions_active     = $prof_active || $b2b_active || $partner_active;
			$portfolio_active     = medexos_is_active_slug(array('portfolio'));
			$contact_active       = medexos_is_active_slug(array('contact'));
			?>
			<ul class="nav">
				<li class="<?php echo $home_active ? 'current-menu-item' : ''; ?>">
					<a href="<?php echo esc_url(home_url('/')); ?>"<?php echo $home_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('Home', 'medexos'); ?></a>
				</li>
				<li class="menu-item-has-children <?php echo $about_group_active ? 'current-menu-ancestor' : ''; ?>">
					<a href="<?php echo esc_url(medexos_page_url('who-we-are')); ?>"<?php echo $about_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('About', 'medexos'); ?></a>
					<button class="submenu-toggle" type="button" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle About submenu', 'medexos'); ?>">
						<?php echo $chevron; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
					<ul class="sub-menu">
						<li class="<?php echo $about_active ? 'current-menu-item' : ''; ?>">
							<a href="<?php echo esc_url(medexos_page_url('who-we-are')); ?>"<?php echo $about_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('About Medexos', 'medexos'); ?></a>
						</li>
						<li class="<?php echo $quality_active ? 'current-menu-item' : ''; ?>">
							<a href="<?php echo esc_url(medexos_page_url('quality')); ?>"<?php echo $quality_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('Quality', 'medexos'); ?></a>
						</li>
					</ul>
				</li>
				<li class="menu-item-has-children <?php echo $solutions_active ? 'current-menu-ancestor' : ''; ?>">
					<a href="<?php echo esc_url(medexos_page_url('for-professionals')); ?>"><?php esc_html_e('Solutions', 'medexos'); ?></a>
					<button class="submenu-toggle" type="button" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle Solutions submenu', 'medexos'); ?>">
						<?php echo $chevron; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
					<ul class="sub-menu">
						<li class="<?php echo $prof_active ? 'current-menu-item' : ''; ?>">
							<a href="<?php echo esc_url(medexos_page_url('for-professionals')); ?>"<?php echo $prof_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('For Professionals', 'medexos'); ?></a>
						</li>
						<li class="<?php echo $b2b_active ? 'current-menu-item' : ''; ?>">
							<a href="<?php echo esc_url(medexos_page_url('for-b2b-sales')); ?>"<?php echo $b2b_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('For B2B / Sales', 'medexos'); ?></a>
						</li>
						<li class="<?php echo $partner_active ? 'current-menu-item' : ''; ?>">
							<a href="<?php echo esc_url(medexos_page_url('b2b-partnerships')); ?>"<?php echo $partner_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('B2B Partnerships', 'medexos'); ?></a>
						</li>
					</ul>
				</li>
				<li class="<?php echo $portfolio_active ? 'current-menu-item' : ''; ?>">
					<a href="<?php echo esc_url(medexos_page_url('portfolio')); ?>"<?php echo $portfolio_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('Catalogues', 'medexos'); ?></a>
				</li>
				<li class="<?php echo $contact_active ? 'current-menu-item' : ''; ?>">
					<a href="<?php echo esc_url(medexos_page_url('contact')); ?>"<?php echo $contact_active ? ' aria-current="page"' : ''; ?>><?php esc_html_e('Contact', 'medexos'); ?></a>
				</li>
			</ul>
			<?php
		}
		?>
	</nav>

	<?php $whatsapp_url = medexos_whatsapp_url(); ?>
	<?php if ($whatsapp_url) : ?>
		<a class="button medexos-whatsapp" href="<?php echo esc_url($whatsapp_url); ?>" target="_blank" rel="noopener noreferrer">
			<span><?php esc_html_e('WhatsApp Enquiry', 'medexos'); ?></span>
			<?php echo medexos_whatsapp_icon_svg(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</a>
	<?php endif; ?>
</header>

<main id="main" class="wrap">
