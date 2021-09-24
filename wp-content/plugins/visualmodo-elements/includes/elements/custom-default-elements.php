<?php
/**
 * Customize default elements in Visual Composer
 *
 * @package Visualmodo Elements
 *
 */

/*-----------------------------------------------------------------------------------*/
/*	Customize default elements in Visual Composer
/*-----------------------------------------------------------------------------------*/

add_action( 'vc_after_init', 'vc_after_init_actions' );
 
function vc_after_init_actions() {
    
    // Ref: http://www.wpelixir.com/how-to-customize-default-elements-visual-composer/ 
    // Remove Params Example

    /*
    if( function_exists('vc_remove_param') ){ 
        vc_remove_param( 'vc_row', 'css_animation' ); 
        vc_remove_param( 'vc_row', 'el_class' ); 
    }
 
    // Add Params For Row Element
    $vc_row_new_params = array(
        
        array(
			'type' => 'dropdown',
			'heading' => __( 'Color Mode', 'visualmodo' ),
			'description' => __( 'Select Color Mode For The Row.', 'visualmodo' ),
            'param_name' => 'visualmodo_elements_row_color_mode',
            'group' => 'Visualmodo',
			'value' => array(
				__( 'None', 'visualmodo' ) => '',
                __( 'Light Mode', 'visualmodo' ) => 'light',
                __( 'Dark Mode', 'visualmodo' ) => 'dark',
                __( 'Light to Dark Mode', 'visualmodo' ) => 'light-to-dark',
				__( 'Dark to Light Mode', 'visualmodo' ) => 'dark-to-light',
			),
		),
     
    );
     
    vc_add_params( 'vc_row', $vc_row_new_params ); 


    // Add Params For Column Element
    $vc_column_new_params = array(
        
        array(
			'type' => 'dropdown',
			'heading' => __( 'Color Mode', 'visualmodo' ),
			'description' => __( 'Select Color Mode For The Row.', 'visualmodo' ),
            'param_name' => 'visualmodo_elements_column_color_mode',
            'group' => 'Visualmodo',
			'value' => array(
				__( 'None', 'visualmodo' ) => '',
                __( 'Light Mode', 'visualmodo' ) => 'light',
                __( 'Dark Mode', 'visualmodo' ) => 'dark',
                __( 'Light to Dark Mode', 'visualmodo' ) => 'light-to-dark',
				__( 'Dark to Light Mode', 'visualmodo' ) => 'dark-to-light',
			),
		),
     
    );
     
    vc_add_params( 'vc_column', $vc_column_new_params ); 
    */
}