<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Icon
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_icon extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'icon' => '',
			'icon_color' => '',
			'custom_icon_color' => '',
			'shape' => '',
			'color_shape' => '',
			'icon_size' => '32px',
			'spacing' => '',
			'icon_alignment' => 'left',
			'link' => '',
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

	  
	  // URL Builder

	  $link = vc_build_link( $link );


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


	  $color = $default_color = '';	
	  if($icon_color == 'custom') {
	  	$color = 'color:'.$custom_icon_color.';';
	  } else {
	  	$default_color = ' '.$visualmodo_elements_global_color;
	  }

	  $font_size_reference = $icon_size;
	  if($icon_size != '') {
	  	$icon_size = ' font-size:'.$icon_size.';';
	  } else {
	  	$icon_size = ' font-size:4rem;';
	  }

	  
	  if($icon_alignment != '') {
	  	$icon_alignment = 'text-align:'.$icon_alignment.';';
	  }

	  if($shape != '') {

	  	if($shape == 'rounded' || $shape == 'square' || $shape == 'round') {

	  		if($color_shape != '') {
	  			$color_shape = 'background-color:'.$color_shape.';';
	  			$default_color_shape = '';
	  		} else {
	  			$color_shape = '';
	  			$default_color_shape = 'visualmodo-elements-global-background-color';
	  		}

	  	} else {

	  		if($color_shape != '') {    
	  			$color_shape = 'border-color:'.$color_shape.';';
	  			$default_color_shape = '';
	  		} else {
	  			$color_shape = '';
	  			$default_color_shape = 'visualmodo-elements-global-border-color';
	  		}

	  	}

	  } else {
	  	$color_shape = '';
	  	$default_color_shape = '';
	  }

	  if($spacing != '') {
	  	$spacing = 'height:'.$spacing.'; width:'.$spacing.';';
	  } else {
	  	$spacing = 'height:calc('.$font_size_reference.' + 2em); width:calc('.$font_size_reference.' + 2em);';
	  }


	  $output .= '<div '.$el_id.' class="visualmodo-elements-icon background-shape '.$css_class.'" style="'.$icon_alignment.'">';
	  if($link['url'] != ''){$output .= '<a href="'.esc_attr( $link['url'] ).'">';}
	  $output .= '<div style="'.$color_shape.''.$spacing.'" class="single-icon '.$shape.' '.$default_color_shape.'">';
	  $output .= '<i class="'.$icon.$default_color.'" style="'.$color.$icon_size.'" aria-hidden="true"></i>';
	  $output .= '</div>';
	  if($link['url'] != ''){$output .= '</a>';}
	  $output .= '</div>';

	  return $output;
	}
}

return array(
	'name' => __( 'Icon', 'visualmodo' ),
	'base' => 'visualmodo_icon',
	'icon' => plugins_url('../images/icon.png', __FILE__),
	'show_settings_on_create' => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Choose an icon from libraries', 'visualmodo' ),
	'params' => array(
		array(
			'type' => 'iconmanager',
			'heading' => __( 'Icon', 'visualmodo' ),
			'param_name' => 'icon',
			'description' => __( 'Select icon from library.', 'visualmodo' ),
			),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Icon color', 'visualmodo' ),
			'param_name' => 'icon_color',
			'value' => array(
				__( 'Preset Color', 'visualmodo' ) => '',
				__( 'Custom Color', 'visualmodo' ) => 'custom',
				),
			'description' => __( 'Select icon color.', 'visualmodo' ),
			),
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Custom Icon Color', 'visualmodo' ),
			'param_name' => 'custom_icon_color',
			'description' => __( 'Select custom icon color.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'icon_color',
				'value' => array( 'custom' ),
				),
			),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Shape', 'visualmodo' ),
			'description' => __( 'Select icon shape.', 'visualmodo' ),
			'param_name' => 'shape',
			'value' => array(
				__( 'None', 'visualmodo' ) => '',
				__( 'Rounded', 'visualmodo' ) => 'rounded',
				__( 'Square', 'visualmodo' ) => 'square',
				__( 'Round', 'visualmodo' ) => 'round',
				__( 'Outline Rounded', 'visualmodo' ) => 'outline-rounded',
				__( 'Outline Square', 'visualmodo' ) => 'outline-square',
				__( 'Outline Round', 'visualmodo' ) => 'outline-round',
				),
			),
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Color Shape', 'visualmodo' ),
			'param_name' => 'color_shape',
			'description' => __( 'Select custom shape background color.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'shape',
				'value' => array( 'rounded','square','round','outline-rounded','outline-square','outline-round',  ),
				),
			),
		array(
			'type' => 'textfield',
			'heading' => __( 'Size', 'visualmodo' ),
			'param_name' => 'icon_size',
			'description' => __( 'Icon size. Default value is 32px.', 'visualmodo' ),
			'value' => '32px',
			),
		array(
			'type' => 'textfield',
			'heading' => __( 'Spacing', 'visualmodo' ),
			'param_name' => 'spacing',
			'description' => __( 'Select icon spacing.', 'visualmodo' ),
			),
			array(
				'type' => 'textfield',
				'heading' => __( 'Gap', 'visualmodo' ),
				'param_name' => 'gap',
				'description' => __( 'Select icon gap.', 'visualmodo' ),
				),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Alignment', 'visualmodo' ),
			'param_name' => 'icon_alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'left',
				__( 'Right', 'visualmodo' ) => 'right',
				__( 'Center', 'visualmodo' ) => 'center',
				),
			'description' => __( 'Select icon alignment.', 'visualmodo' ),
			),
		array(
			'type' => 'vc_link',
			'heading' => __( 'URL (Link)', 'visualmodo' ),
			'param_name' => 'link',
			'description' => __( 'Add link to icon.', 'visualmodo' ),
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
