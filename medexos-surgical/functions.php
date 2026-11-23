<?php
if (!defined('ABSPATH')) exit;
add_action('after_setup_theme',function(){add_theme_support('title-tag');add_theme_support('custom-logo',array('height'=>100,'width'=>280,'flex-height'=>true,'flex-width'=>true));add_theme_support('post-thumbnails');add_theme_support('html5',array('search-form','gallery','caption','style','script'));register_nav_menus(array('primary'=>'Primary navigation'));});
add_action('wp_enqueue_scripts',function(){wp_enqueue_style('medexos',get_stylesheet_uri(),array(),'0.3.0');wp_enqueue_style('medexos-layout',get_template_directory_uri().'/assets/reference-layout.css',array('medexos'),'0.3.0');wp_enqueue_script('medexos-menu',get_template_directory_uri().'/assets/menu.js',array(),'0.1.0',true);});
function medexos_items(){return function_exists('medexos_catalogues') ? medexos_catalogues() : array();}

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

function medexos_sanitize_whatsapp_number($value) {
    return preg_replace('/[^0-9]/', '', (string) $value);
}

add_action('customize_register', function ($customizer) {
    $customizer->add_section('medexos_contact', array(
        'title' => __('Medexos Contact', 'medexos'),
    ));
    $customizer->add_setting('medexos_whatsapp_number', array(
        'default' => '923296324928',
        'sanitize_callback' => 'medexos_sanitize_whatsapp_number',
    ));
    $customizer->add_control('medexos_whatsapp_number', array(
        'section' => 'medexos_contact',
        'label' => __('WhatsApp number (with country code)', 'medexos'),
        'description' => __('Leave blank to hide the button.', 'medexos'),
        'type' => 'tel',
    ));
});

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
