<?php
if (!defined('ABSPATH')) {
	exit;
}

get_header();
?>
<section class="content panel">
	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
			<article <?php post_class(); ?>>
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</article>
		<?php endwhile; ?>
		<?php the_posts_navigation(); ?>
	<?php else : ?>
		<h1><?php esc_html_e('Nothing found', 'medexos'); ?></h1>
	<?php endif; ?>
</section>
<?php
get_footer();
