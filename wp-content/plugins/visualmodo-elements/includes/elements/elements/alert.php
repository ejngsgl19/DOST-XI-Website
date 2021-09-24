<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Alert
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_alert extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'type' => 'visualmodo-elements-alert-success',
			'dismissible' => '',
			//Static
			'el_id' => '',
			'el_class' => '',
			'css' => '',
			'css_animation' => ''
		), $atts ) );
		$output = '';
		$visualmodo_elements_global_color = 'visualmodo-elements-global-color'; //General Color
		$visualmodo_elements_global_border_color = 'visualmodo-elements-global-border-color'; //Border Color
		$visualmodo_elements_global_background_color = 'visualmodo-elements-global-background-color'; //Background Color
		
		
		// Start Default Extra Class, CSS and CSS animation
		
		$css = isset( $atts['css'] ) ? $atts['css'] : '';
		$el_id = isset( $atts['el_id'] ) ? 'id="' . esc_attr( $el_id ) . '"' : '';
		$el_class = isset( $atts['el_class'] ) ? $atts['el_class'] : '';
		
		if ( '' !== $css_animation ) {
			wp_enqueue_script( 'waypoints' );
			$css_animation_style = ' wpb_animate_when_almost_visible wpb_' . $css_animation;
		}
		
		$class_to_filter = vc_shortcode_custom_css_class( $css, ' ' ) . $this->getExtraClass( $el_class ) . $this->getCSSAnimation( $css_animation );
		$css_class = apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, $class_to_filter, $this->settings['base'], $atts );
		
		// End Default Extra Class, CSS and CSS animation		

		$q = "'";
		
		$output .= '<div '.$el_id.' class="visualmodo-elements-alert '.$css_class.' '.$type.'">';
		$output .= $content;
		if(!empty($dismissible)) { $output .= '<span class="visualmodo-elements-alert-close-button" onclick="this.parentElement.style.display='.$q.'none'.$q.';">×</span>'; }
		$output .= '</div>';
		
		return $output;
	}
}

return array(
	'name' => __( 'Alert', 'visualmodo' ),
	'base' => 'visualmodo_alert',
	'icon' => plugins_url('../images/alert.png', __FILE__),
	'show_settings_on_create' => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Provide contextual feedback messages', 'visualmodo' ),
	'params' => array(
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Type', 'visualmodo' ),
			'param_name' => 'type',
			'value' => array(
				__( 'Success', 'visualmodo' ) => 'visualmodo-elements-alert-success',
				__( 'Info', 'visualmodo' ) => 'visualmodo-elements-alert-info',
				__( 'Warning', 'visualmodo' ) => 'visualmodo-elements-alert-warning',
				__( 'Danger', 'visualmodo' ) => 'visualmodo-elements-alert-danger',
			),
			'description' => __( 'Select context type.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textarea',
			'holder' => 'div',
			'heading' => __( 'Message', 'visualmodo' ),
			'param_name' => 'content',
			'description' => __( 'Enter short message.', 'visualmodo' ),
		),
		
		array(
			'type' => 'checkbox',
			'heading' => __('Dismissible Alert', 'visualmodo'),
			'param_name' => 'dismissible',
			'value' => array(
				__( 'Add close button.', 'visualmodo' ) => 'dismissible',
			),
		),
		
		// Animation
		vc_map_add_css_animation(),
		
		array(
			'type' => 'el_id',
			'heading' => __( 'Element ID', 'visualmodo' ),
			'param_name' => 'el_id',
			'description' => sprintf( __( 'Enter element ID (Note: make sure it is unique and valid according to %sw3c specification%s).', 'visualmodo' ), '<a href="https://www.w3schools.com/tags/att_global_id.asp" target="_blank">', '</a>' ),
			),
			
			array(
				'type' => 'textfield',
				'heading' => __( 'Extra class name', 'visualmodo' ),
				'param_name' => 'el_class',
				'description' => __( 'Style particular content element differently - add a class name and refer to it in custom CSS.', 'visualmodo' ),
			),
			
			array(
				'type' => 'css_editor',
				'heading' => __( 'CSS box', 'visualmodo' ),
				'param_name' => 'css',
				'group' => __( 'Design Options', 'visualmodo' ),
			),
		),
	);
	