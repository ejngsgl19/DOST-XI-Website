<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Testimonials
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_testimonial_section extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'title' => '',
			'occupation' => '',
			'photo' => '',
			'content' => $content,
			'testimonial_color' => '',
			'testimonial_name_color' => '',
			'testimonial_occupation_color' => '',
			//Static
			'el_id' => '',
			'el_class' => '',
			'css' => '',
			'css_animation' => ''
		), $atts ) );
		$output = '';
		
		// Picture
		
		$img = wp_get_attachment_image_src( $photo, 'thumbnail' );
		$imgSrc = $img[0];
		
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
		
		if($testimonial_color != '') {
			$testimonial_color = 'style= "color:'.$testimonial_color.'"';
		} else {
			$testimonial_color = '';
		}
		
		if($testimonial_name_color != '') {
			$testimonial_name_color = 'style= "color:'.$testimonial_name_color.'"';
		} else {
			$testimonial_name_color = '';
		}
		
		if($testimonial_occupation_color != '') {
			$testimonial_occupation_color = 'style= "color:'.$testimonial_occupation_color.'"';
		} else {
			$testimonial_occupation_color = '';
		}
		
		
		$output .= '<div '.$el_id.' class="visualmodo-elements-testimonial-section carousel-cell '.$css_class.'">';
		$output .= '<p '.$testimonial_color.' class="testimonial-quote">'.$content.'</p>';
		$output .= '<div class="testimonial-photo-title-occupation">'; 
		if(!empty($photo)){ $output .= '<div class="testimonial-photo"><img src="'.$imgSrc.'" /></div>'; }
		$output .= '<div class="testimonial-title-occupation">';
		$output .= '<span '.$testimonial_name_color.' class="testimonial-title">'.$title.'</span>';
		$output .= '<span '.$testimonial_occupation_color.' class="testimonial-occupation">'.$occupation.'</span>';
		$output .= '</div></div></div>';
		
		return $output;
	}
}

class WPBakeryShortCode_visualmodo_wpbakery_testimonial extends WPBakeryShortCodesContainer {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			//Static
			'el_id' => '',
			'el_class' => '',
			'css' => '',
			'css_animation' => ''
		), $atts ) );
		$output = '';
		
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
		
		
		$output .= '<div '.$el_id.' class="visualmodo-elements-testimonial'.' '.$css_class.'">
		<div class="testimonials">
		<div class="testimonials-container">
		<div class="testimonial">
		<div class="main-carousel">'.wpb_js_remove_wpautop($content).'</div>
		</div>
		</div>
		</div>
		</div>';
		
		return $output;
	}
}

vc_map( array(
	'name' => __( 'Testimonial', 'visualmodo' ),
	'base' => 'visualmodo_testimonial',
	'icon' => plugins_url('../images/testimonial.png', __FILE__),
	"as_parent" => array('only' => 'visualmodo_testimonial_section'),
	"content_element" => true,
	"show_settings_on_create" => false,
	"is_container" => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Display testimonials', 'visualmodo' ),
	'params' => array(
		
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
	"js_view" => 'VcColumnView'
	) );
	
	vc_map( array(
		"name" => __("Testimonial Section", 'visualmodo'),
		'description' => __( 'Testimonial content panels item.', 'visualmodo' ),
		"base" => "visualmodo_testimonial_section",
		'icon' => plugins_url('../images/testimonial-section.png', __FILE__),
		"content_element" => true,
		"as_child" => array('only' => 'visualmodo_elements_testimonial_container'),
		'category' => __( 'Visualmodo', 'visualmodo' ), 
		"params" => array(
			array(
				'type' => 'textfield',
				'heading' => __( 'Name', 'visualmodo' ),
				'param_name' => 'title',
			),
			array(
				'type' => 'textfield',
				'heading' => __( 'Occupation', 'visualmodo' ),
				'param_name' => 'occupation',
			),
			array(
				'type' => 'attach_image',
				'heading' => __( 'Photo', 'visualmodo' ),
				'param_name' => 'photo',
				'value' => '',
				'description' => __( 'Select image from media library.', 'visualmodo' ),
			),
			array(
				'type' => 'textarea_html',
				'holder' => 'div',
				'heading' => __( 'Content', 'visualmodo' ),
				'param_name' => 'content',
				'value' => __( '<p>I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>', 'visualmodo' ),
			),
			
			array(
				'type' => 'colorpicker',
				'heading' => __( 'Testimonial Color', 'visualmodo' ),
				'param_name' => 'testimonial_color',
				'description' => __( 'Select testimonial content color.', 'visualmodo' ),
				'group' => 'Color',
			),
			
			array(
				'type' => 'colorpicker',
				'heading' => __( 'Testimonial Name Color', 'visualmodo' ),
				'param_name' => 'testimonial_name_color',
				'description' => __( 'Select testimonial name color.', 'visualmodo' ),
				'group' => 'Color',
			),
			
			array(
				'type' => 'colorpicker',
				'heading' => __( 'Testimonial Occupation Color', 'visualmodo' ),
				'param_name' => 'testimonial_occupation_color',
				'description' => __( 'Select testimonial occupation color.', 'visualmodo' ),
				'group' => 'Color',
			),
			
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
			)
			) );