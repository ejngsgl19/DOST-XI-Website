<?php
/**
 * Visualmodo Elements Shortcodes settings Lazy mapping
 *
 * @package Visualmodo Elements
 *
 */



$options = get_option('visualmodo_elements');
$visualmodo_root = dirname(__FILE__);
$visualmodo_element_path = $visualmodo_root . "/elements/";
require_once $visualmodo_root . '/custom-default-elements.php';

/*-----------------------------------------------------------------------------------*/
/*	Essencial Elements
/*-----------------------------------------------------------------------------------*/
if ( $options['visualmodo_element_alert'] == true ) { vc_lean_map( 'visualmodo_wpbakery_alert', null, $visualmodo_element_path . 'alert.php' ); }

if ( $options['visualmodo_element_circular_progress_bar'] == true ) { vc_lean_map( 'visualmodo_wpbakery_circular_progress_bar', null, $visualmodo_element_path . 'circular-progress-bar.php' ); }

if ( $options['visualmodo_element_counter'] == true ) { vc_lean_map( 'visualmodo_wpbakery_counter', null, $visualmodo_element_path . 'counter.php' ); }

if ( $options['visualmodo_element_icon'] == true ) { vc_lean_map( 'visualmodo_wpbakery_icon', null, $visualmodo_element_path . 'icon.php' ); }

if ( $options['visualmodo_element_infobox'] == true ) { vc_lean_map( 'visualmodo_wpbakery_infobox', null, $visualmodo_element_path . 'infobox.php' ); }

if ( $options['visualmodo_element_progress_bar'] == true ) { vc_lean_map( 'visualmodo_wpbakery_progress_bar', null, $visualmodo_element_path . 'progress-bar.php' ); }

if ( $options['visualmodo_element_semi_circular_progress_bar'] == true ) { vc_lean_map( 'visualmodo_wpbakery_semi_circular_progress_bar', null, $visualmodo_element_path . 'semi-circular-progress-bar.php' ); }

if ( $options['visualmodo_element_svg'] == true ) { vc_lean_map( 'visualmodo_wpbakery_svg', null, $visualmodo_element_path . 'svg.php' ); }

/*-----------------------------------------------------------------------------------*/
/*	Essencial Nested Elements
/*-----------------------------------------------------------------------------------*/
if ( $options['visualmodo_element_icon_group'] == true ) { require_once $visualmodo_element_path . 'icon-group.php'; }

if ( $options['visualmodo_element_list_group'] == true ) { require_once $visualmodo_element_path . 'list-group.php'; }

if ( $options['visualmodo_element_modal'] == true ) { require_once $visualmodo_element_path . 'modal.php' ; }

if ( $options['visualmodo_element_pricing'] == true ) { require_once $visualmodo_element_path . 'pricing.php' ; }

if ( $options['visualmodo_element_testimonial'] == true ) { require_once $visualmodo_element_path . 'testimonial.php' ; }

/*-----------------------------------------------------------------------------------*/
/*	Premium Elements
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
/*	Premium Nested Elements
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
/*	Unlimited Elements
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
/*	Unlimited Nested Elements
/*-----------------------------------------------------------------------------------*/