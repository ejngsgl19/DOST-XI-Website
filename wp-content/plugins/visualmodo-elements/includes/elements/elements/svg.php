<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	SVG
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_svg extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'svg' => '',
			'alignment' => 'left',
			'height' => 'auto',
			'width' => '100%',
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
		
		$svg_img = wp_get_attachment_image_src( $svg );
		$svg_src = $svg_img[0];
		
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
		
		$output .= '<div '.$el_id.' class="visualmodo-elements-svg '.$css_class.' '. $alignment.'">
		<div class="visualmodo-elements-svg-inner" style="height:'.$height.';width:'.$width.';"><img class="visualmodo-elements-svg-img" src="'.$svg_src.'"/></div>
		</div>';
		
		return $output;
	}
}

return array(
	'name' => __( 'SVG', 'visualmodo' ),
	'base' => 'visualmodo_svg',
	'icon' => plugins_url('../images/svg.png', __FILE__),
	'show_settings_on_create' => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Animated or static SVG for your content', 'visualmodo' ),
	'params' => array(
		array(
			'type' => 'attach_image',
			'heading' => __( 'SVG', 'visualmodo' ),
			'param_name' => 'svg',
			'description' => __( 'Select a SVG Icon from media library.', 'visualmodo' ),
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Height', 'visualmodo' ),
			'param_name' => 'height',
			'description' => __( 'Insert the SVG height.', 'visualmodo' ),
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Width', 'visualmodo' ),
			'param_name' => 'width',
			'description' => __( 'Insert the SVG width.', 'visualmodo' ),
		),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Alignment', 'visualmodo' ),
			'param_name' => 'alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'visualmodo-elements-svg-align-left',
				__( 'Right', 'visualmodo' ) => 'visualmodo-elements-svg-align-right',
				__( 'Center', 'visualmodo' ) => 'visualmodo-elements-svg-align-center',
			),
			'description' => __( 'Select icon alignment.', 'visualmodo' ),
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
	