<?php
if (!defined('ABSPATH')) {
	exit;
}

if (medexos_uses_page_builder()) {
	require get_template_directory() . '/templates/elementor-full-width.php';
	return;
}

get_header();
?>
<section class="content panel">
	<?php while (have_posts()) : the_post(); ?>
		<article <?php post_class(); ?>>
			<h1><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</article>
	<?php endwhile; ?>
</section>
<?php
get_footer();
