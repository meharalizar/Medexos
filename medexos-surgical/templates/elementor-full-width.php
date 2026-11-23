<?php
/**
 * Template Name: Medexos Full Width
 * Template Post Type: page
 */

if (!defined('ABSPATH')) {
	exit;
}

get_header();
while (have_posts()) {
	the_post();
	the_content();
}
get_footer();
