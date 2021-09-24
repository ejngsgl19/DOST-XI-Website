<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Progress Bar
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_progress_bar extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'title' => '',
			'percentage' => '',
			'height' => '16px',
			'corner' => 'progress-bar-rounded',
			'colors' => '',
			'title_color' => '',
			'icon_color' => '',
			'percentage_color' => '',
			'bar_color' => '',
			'track_color' => '',
			'checkicon' => '',
			'icon' => '',
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
		
		// Start Get Colors for Visualmodo Elements Settings
		$options = get_option('visualmodo_elements');
		if ( $options['visualmodo_elements_color_switch'] == '1' ) {
			$visualmodo_elements_global_color_value = $options['visualmodo_elements_global_color'];
		} else {
			$visualmodo_elements_global_color_value = $options['visualmodo_elements_background_color'];
		}
		// End Get Colors for Visualmodo Elements Settings

		// Start Custom Colors		
		$title_color = $title_color ? 'style=color:'.$title_color.'' : 'style=color:'.$visualmodo_elements_global_color_value.'';
		
		$icon_color = $icon_color ? 'style=color:'.$icon_color.'' : 'style=color:'.$visualmodo_elements_global_color_value.'';
		
		$bar_color = $bar_color ? $bar_color : $visualmodo_elements_global_color_value;

		$track_color = $track_color ? $track_color : '#f9f9f9';
		
		// End Custom Colors
		
		$height = $height ? 'style="height:'.$height.';"' : '';
		
		if ($checkicon=="custom_icon") { $icon = '<i class="visualmodo-elements-progress-bar-icon '.$icon.'" '.$icon_color.'></i>'; } else { $icon = ""; }
		
		// Start Output
		
		$output .= '<div '.$el_id.' class="visualmodo-elements-progress-bar '.$css_class.'">';
		$output .= $icon;
		$output .= '<div class="visualmodo-elements-progress-bar-inner">';
		$output .= '<span '.$title_color.' class="progress-bar-title">'.$title.'</span>';
		$output .= '<div class="visualmodo-elements-progress-bar-params '.$corner.'" '.$height.' percentage="'.$percentage.'" bar_color="'.$bar_color.'" track_color="'.$track_color.'" percentage_color="'.$percentage_color.'"></div>';
		$output .= '</div></div>';
		
		return $output;
		
		// End Output
	}
}

return array(
	'name' => __( 'Progress Bar', 'visualmodo' ),
	'base' => 'visualmodo_progress_bar',
	'icon' => plugins_url('../images/progress-bar.png', __FILE__),
	'show_settings_on_create' => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Animated progress bar', 'visualmodo' ),
	'params' => array(
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title', 'visualmodo' ),
			'param_name' => 'title',
			'description' => __( 'Enter the Progress Bar Field title here.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Progress in %', 'visualmodo' ),
			'param_name' => 'percentage',
			'description' => __( 'Enter a number between 0 and 100', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Height', 'visualmodo' ),
			'param_name' => 'height',
			'description' => __( 'Enter a value for height. Ex: 16px.', 'visualmodo' ),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Corner Style', 'visualmodo' ),
			'description' => __( 'Select style.', 'visualmodo' ),
			'param_name' => 'corner',
			'value' => array(
				__( 'Rounded', 'visualmodo' ) => 'progress-bar-rounded',
				__( 'Square', 'visualmodo' ) => 'progress-bar-square',
				__( 'Round', 'visualmodo' ) => 'progress-bar-round',
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Colors', 'visualmodo' ),
			'param_name' => 'colors',
			'value' => array(
				__( 'Preset Color', 'visualmodo' ) => '',
				__( 'Custom Color', 'visualmodo' ) => 'custom',
			),
			'description' => __( 'Choose a color for your progress bar here.', 'visualmodo' ),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Title Color', 'visualmodo' ),
			'param_name' => 'title_color',
			'description' => __( 'Select custom color for the title.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'colors',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Icon Color', 'visualmodo' ),
			'param_name' => 'icon_color',
			'description' => __( 'Select custom color for icon.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'colors',
				'value' => array( 'custom' ),
			),
		),

		array(
			'type' => 'colorpicker',
			'heading' => __( 'Percentage Color', 'visualmodo' ),
			'param_name' => 'percentage_color',
			'description' => __( 'Select custom color for the percentage.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'colors',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Bar Color', 'visualmodo' ),
			'param_name' => 'bar_color',
			'description' => __( 'Select custom color for the bar.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'colors',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Track Color', 'visualmodo' ),
			'param_name' => 'track_color',
			'description' => __( 'Select custom color for the track.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'colors',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Icon library', 'visualmodo' ),
			'param_name' => 'checkicon',
			'value' => array(
				__( 'No', 'visualmodo' ) => 'no_icon',
				__( 'Yes', 'visualmodo' ) => 'custom_icon',
			),
			'description' => __( 'Should an icon be displayed at the left side of the progress bar.', 'visualmodo' ),
		),
		
		array(
			'type' => 'iconmanager',
			'heading' => __( 'Icon', 'visualmodo' ),
			'param_name' => 'icon',
			'description' => __( 'Select icon from library.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'checkicon',
				'value' => 'custom_icon'
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
