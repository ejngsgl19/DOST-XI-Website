<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	List Group
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_list_group extends WPBakeryShortCodesContainer {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			//Static
			'mode' => 'visualmodo-elements-list-group-item-text',
			'appearance' => '',
			'direction' => 'visualmodo-elements-direction-vertical',
			'alignment' => 'visualmodo-elements-align-left',
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
		
		
		$output .= '<div '.$el_id.' class="visualmodo-elements-list-group '.$css_class.' '.$direction.' '.$appearance.' '.$alignment.' '.$mode.'">'.wpb_js_remove_wpautop($content).'</div>';
		
		return $output;
	}
}

class WPBakeryShortCode_visualmodo_list_group_item extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'title' => '',
			'link' => '',
			'icon' => '',
			'colors' => '',
			'icon_color' => '',
			'title_color' => '',
			//Static
			'el_id' => '',
			'el_class' => '',
			'css' => '',
			'css_animation' => ''
		), $atts ) );
		$output = '';
		
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

		// Start Custom Colors

		$icon_color = $icon_color ? 'style=color:'.$icon_color.'' : '';
		$title_color = $title_color ? 'style=color:'.$title_color.'' : '';

		// End Custom Colors

		// Start Icon

		$icon = $icon ? '<i class="'.$icon.'" '.$icon_color.' aria-hidden="true"></i>' : '';
		
		//End Icon

		// Start Link		
		if($link['url'] != ''){
			$tag = 'a';
			$href = 'href="'.esc_attr( $link['url'] ).'"';
		} else {
			$tag = 'span';
			$href = '';
		}
		// End Link
		
		$output .= '<'.$tag.' '.$href.' '.$el_id.' class="visualmodo-elements-list-group-item '.$css_class.'" '.$title_color.'>'.$icon.$title.'</'.$tag.'>';

		
		return $output;
	}
}

vc_map( array(
	'name' => __( 'List Group', 'visualmodo' ),
	'base' => 'visualmodo_list_group',
	'icon' => plugins_url('../images/list-group.png', __FILE__),
	"as_parent" => array('only' => 'visualmodo_list_group_item'),
	"content_element" => true,
	"show_settings_on_create" => false,
	"is_container" => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Show a flexible and powerful list', 'visualmodo' ),
	'params' => array(
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'List Mode', 'visualmodo' ),
			'param_name' => 'mode',
			'value' => array(
				__( 'Text', 'visualmodo' ) => 'visualmodo-elements-list-group-item-text',
				__( 'Link', 'visualmodo' ) => 'visualmodo-elements-list-group-item-link',
			),
			'description' => __( 'Choose a mode for list group.', 'visualmodo' ),
		),

		array(
			'type' => 'dropdown',
			'heading' => __( 'Appearance', 'visualmodo' ),
			'param_name' => 'appearance',
			'value' => array(
				__( 'No Borders and Separator Lines', 'visualmodo' ) => '',
				__( 'Separator Lines', 'visualmodo' ) => 'visualmodo-elements-separator-lines',
				__( 'Borders and Separator Lines', 'visualmodo' ) => 'visualmodo-elements-borders-separator-lines',
				__( 'Borders With Rounded Corners and Separator Lines', 'visualmodo' ) => 'visualmodo-elements-borders-rounded-corners-separator-lines',
			),
			'description' => __( 'Choose a appearance for list group.', 'visualmodo' ),
		),

		array(
			'type' => 'dropdown',
			'heading' => __( 'Direction', 'visualmodo' ),
			'param_name' => 'direction',
			'value' => array(
				__( 'Vertical', 'visualmodo' ) => 'visualmodo-elements-direction-vertical',
				__( 'Horizontal', 'visualmodo' ) => 'visualmodo-elements-direction-horizontal',
			),
			'description' => __( 'Choose the direction for list group.', 'visualmodo' ),
		),

		array(
			'type' => 'dropdown',
			'heading' => __( 'Alignment', 'visualmodo' ),
			'param_name' => 'alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'visualmodo-elements-align-left',
				__( 'Right', 'visualmodo' ) => 'visualmodo-elements-align-right',
				__( 'Center', 'visualmodo' ) => 'visualmodo-elements-align-center',
			),
			'description' => __( 'Choose the alignment for list group.', 'visualmodo' ),
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
		),
		"js_view" => 'VcColumnView'
		) );
		
		vc_map( array(
			"name" => __("List Item", 'visualmodo'),
			'description' => __( 'Display List Group Item', 'visualmodo' ),
			"base" => "visualmodo_list_group_item",
			'icon' => plugins_url('../images/list-item.png', __FILE__),
			"content_element" => true,
			"as_child" => array('only' => 'visualmodo_elements_list_group'), 
			"params" => array(
				array(
					'type' => 'textfield',
					'heading' => __( 'Title', 'visualmodo' ),
					'param_name' => 'title',
				),
				
				array(
					'type' => 'vc_link',
					'heading' => __( 'URL (Link)', 'visualmodo' ),
					'param_name' => 'link',
					'description' => __( 'Add link to List Item.', 'visualmodo' ),
				),
				
				array(
					'type' => 'iconmanager',
					'heading' => __( 'Icon', 'visualmodo' ),
					'param_name' => 'icon',
					'description' => __( 'Select icon from library.', 'visualmodo' ),
				),

				array(
					'type' => 'dropdown',
					'heading' => __( 'Colors', 'visualmodo' ),
					'param_name' => 'colors',
					'value' => array(
						__( 'Preset Colors', 'visualmodo' ) => '',
						__( 'Custom Colors', 'visualmodo' ) => 'custom',
					),
					'description' => __( 'Choose a color for icons and titles.', 'visualmodo' ),
				),
				
				array(
					'type' => 'colorpicker',
					'heading' => __( 'Icon Color', 'visualmodo' ),
					'param_name' => 'icon_color',
					'description' => __( 'Select custom color for icons.', 'visualmodo' ),
					'dependency' => array(
						'element' => 'colors',
						'value' => array( 'custom' ),
					),
				),

				array(
					'type' => 'colorpicker',
					'heading' => __( 'Title Color', 'visualmodo' ),
					'param_name' => 'title_color',
					'description' => __( 'Select custom color for titles.', 'visualmodo' ),
					'dependency' => array(
						'element' => 'colors',
						'value' => array( 'custom' ),
					),
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