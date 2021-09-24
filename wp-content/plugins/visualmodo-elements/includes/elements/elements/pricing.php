<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Pricing
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_pricing extends WPBakeryShortCodesContainer {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'title' => '',
			'price' => '',
			'currency' => '',
			'plan' => '',
			'features_spacing' => '',
			'features_line_list' => '',
			'features_line_list_color' => '',
			'icon_display' => '',
			'custom_image_icon' => '',
			'custom_svg_icon' => '',
			'icon' => '',
			'icon_color' => '',
			'custom_icon_color' => '',
			'shape' => '',
			'color_shape' => '',
			'icon_size' => '8rem',
			'icon_spacing' => '',
			'icon_alignment' => 'left',
			'button_title' => 'Link Button',
			'button_link' => '#',
			'button_text_color' => '#ffffff',
			'button_background_color' => '',
			'button_shape' => 'rounded',
			'button_size' => 'btn-lg',
			'button_extra_size' => '',
			'button_alignment' => 'text-left',
			'area_1' => 'icon',
			'margin_area_1' => '0',
			'padding_area_1' => '0',
			'background_area_1' => 'transparent',
			'area_2' => 'title',
			'margin_area_2' => '0',
			'padding_area_2' => '0',
			'background_area_2' => '',
			'area_3' => 'sub_heading',
			'margin_area_3' => '0',
			'padding_area_3' => '0',
			'background_area_3' => 'transparent',
			'area_4' => 'price',
			'margin_area_4' => '0',
			'padding_area_4' => '0',
			'background_area_4' => '',
			'area_5' => 'featured_list',
			'margin_area_5' => '0',
			'padding_area_5' => '0',
			'background_area_5' => '',
			'area_6' => 'pricing_button',
			'margin_area_6' => '0',
			'padding_area_6' => '0',
			'background_area_6' => '',
			'title_tag' => 'h3',
			'title_size' => '',
			'title_line_height' => '',
			'title_spacing' => '',
			'title_alignment' => '',
			'title_color' => '',
			'price_size' => '',
			'price_line_height' => '',
			'price_spacing' => 'auto',
			'price_alignment' => '',
			'price_color' => '',
			'currency_size' => '',
			'currency_spacing' => '',
			'shadow_pricing_table' => '',
			'el_class' => '',
			'css' => '',
			'css_animation' => ''
		), $atts ) );
		$output = '';
		$ve_global_color = 've-global-color'; //General Color
		$ve_global_border_color = 've-global-border-color'; //Border Color
		$ve_global_background_color = 've-global-background-color'; //Background Color
		
		
		// Start Default Extra Class, CSS and CSS animation
		
		$css = isset( $atts['css'] ) ? $atts['css'] : '';
		$el_class = isset( $atts['el_class'] ) ? $atts['el_class'] : '';
		
		if ( '' !== $css_animation ) {
			wp_enqueue_script( 'waypoints' );
			$css_animation_style = ' wpb_animate_when_almost_visible wpb_' . $css_animation;
		}
		
		$class_to_filter = vc_shortcode_custom_css_class( $css, ' ' ) . $this->getExtraClass( $el_class ) . $this->getCSSAnimation( $css_animation );
		$css_class = apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, $class_to_filter, $this->settings['base'], $atts );
		
		// End Default Extra Class, CSS and CSS animation
		
		// Icon
		if ($icon_display == 'image_icon') {
			
			if($icon_alignment != '') {
				$icon_alignment = 'text-align:'.$icon_alignment.';';
			}
			
			$default_src = vc_asset_url( 'vc/no_image.png' );
			$img = wp_get_attachment_image_src( $custom_image_icon );
			$src = $img[0];
			$custom_src = $src ? esc_attr( $src ) : $default_src;
			
			$icon_content = '<div style="'.$icon_alignment.'"><img src="'.$custom_src.'" ></div>';
			
		} elseif ($icon_display == 'svg_icon') {
			
			if($icon_alignment != '') {
				$icon_alignment = 'text-align:'.$icon_alignment.';';
			}
			
			$default_src = vc_asset_url( 'vc/no_image.png' );
			$img = wp_get_attachment_image_src( $custom_svg_icon );
			$src = $img[0];
			$custom_src = $src ? esc_attr( $src ) : $default_src;
			
			$icon_content = '<div class="elvn" style="'.$icon_alignment.'"><img class="vesvg" src="'.$custom_src.'" ></div>';
			
		} else {
			
			$iconClass = isset( $icon ) ? esc_attr( $icon ) : 'fa fa-adjust';
			
			if($icon_color != '') {
				$custom_icon_color = 'color:'.$custom_icon_color.';';
				$global_icon_color = '';
			} else {
				$icon_color = '';
				$global_icon_color = 've-global-color';
			}
			
			$font_size_reference = $icon_size;
			
			if($icon_size != '') {
				$icon_size = 'font-size:'.$icon_size.';';
			}
			
			if($icon_alignment != '') {
				$icon_alignment = 'text-align:'.$icon_alignment.';display: block;';
			}
			
			if($shape != '') {
				
				if($shape == 'rounded' || $shape == 'square' || $shape == 'round') {
					
					if($color_shape != '') {
						$color_shape = 'background-color:'.$color_shape.';';
						$default_color_shape = '';
					} else {
						$color_shape = '';
						$default_color_shape = 've-global-background-color';
					}
					
				} else {
					
					if($color_shape != '') {    
						$color_shape = 'border-color:'.$color_shape.';';
						$default_color_shape = '';
					} else {
						$color_shape = '';
						$default_color_shape = 've-global-border-color';
					}
					
				}
				
				if($icon_spacing != '') {
					$icon_spacing = 'height:'.$icon_spacing.'; width:'.$icon_spacing.';';
				} else {
					$icon_spacing = 'height:calc('.$font_size_reference.' + 2em); width:calc('.$font_size_reference.' + 2em);';
				}
				
				$shape_render_start = '<div style="'.$icon_alignment.'"><div class="icon-pricing '.$shape.' '.$default_color_shape.'" style="'.$color_shape.''.$icon_spacing.'">';
				$shape_render_finish = '</div></div>';
				
			} else {
				$shape_render_start = '';
				$shape_render_finish = '';
			}
			
			$icon_content = ''.$shape_render_start.'<span style="'.$custom_icon_color.' '.$icon_size.' '.$icon_alignment.'" class="vc_icon_element-icon '.$global_icon_color.' '.$iconClass.'"></span>'.$shape_render_finish.'';
		}
		
		
		
		// Title
		$title_content = '<'.$title_tag.' style="font-size:'.$title_size.';line-height:'.$title_line_height.';margin:'.$title_spacing.';text-align:'.$title_alignment.';color:'.$title_color.';">'.$title.'</'.$title_tag.'>';
		
		//Price
		$price_content = '<p class="price" style="line-height:'.$price_line_height.';margin:'.$price_spacing.';text-align:'.$price_alignment.';color:'.$price_color.';">
		<span class="pricing-currency" style="font-size:'.$currency_size.';margin:'.$currency_spacing.';">'.$currency.'</span><span class="pricing-value" style="font-size:'.$price_size.';">'.$price.'</span>
		<span class="pricing-plan">'.$plan.'</span>
		</p>';
		
		//Sub Heading
		
		$sub_heading_content = $content;
		
		//Featured List
		if($features_icon == 'features-arrow') {
			$features_icon = 'fa-chevron-right';
		} else if($features_icon == 'features-check') {
			$features_icon = 'fa-check';
		} else if($features_icon == 'features-more') {
			$features_icon = 'fa-plus';
		} else {
			$features_icon = 'fa-star';
		}
		
		$featured_list = '';
		
		if($features_icon_color != '') {
			$features_icon_color = 'style="color:'.$features_icon_color.'"';
		} else {
			$features_icon_color = '';
		}
		
		if($features_line_list == 'line_list' ) {
			$features_line_list = 'line-list';
			if($features_line_list_color != '') {
				$features_line_list_color = 'border-bottom-color:'.$features_line_list_color.';';
			} else {
				$features_line_list_color = '';
			}
		} else {
			$features_line_list = '';
			$features_line_list_color = '';
		}
		
		$features_counter = 1;
		
		while( $features_counter <= 15 ){
			if(${'feature_' . $features_counter} != ''){
				$featured_list = $featured_list .'<li class="'.$features_line_list.'" style="color:'.$features_color.';padding:'.$features_spacing.';'.$features_line_list_color.'"><i '.$features_icon_color.' class="fa '.$features_icon.'"></i>'.${'feature_' . $features_counter}.'</li>';
			}
			$features_counter++;
		}
		
		
		$featured_list_content = '<div><ul class="featured-list">'.$featured_list.'</ul></div>';
		
		
		if($shadow_pricing_table != '') {
			$shadow_pricing_table = 'shadow-pricing';
		}
		
		//Button
		
		$link = vc_build_link( $button_link );
		
		if( $button_shape == 'rounded' || $button_shape == 'square' || $button_shape == 'round' ){
			if($button_background_color != '') {
				$button_background_color = 'background-color:'.$button_background_color.';';
				$global_button_background_color = '';
			} else {
				$button_background_color = '';
				$global_button_background_color = 've-global-background-color';
			}
		} else {
			if($button_background_color != '') {
				$button_background_color = 'border-width: 2px;border-style: solid;border-color:'.$button_background_color.';';
				$global_button_background_color = '';
			} else {
				$button_background_color = 'border-width: 2px;border-style: solid;';
				$global_button_background_color = 've-global-border-color';
			}
		}
		
		$pricing_button_content = '<div class="'.$button_alignment.'"><a style="'.$button_background_color.' color:'.$button_text_color.';padding:'.$button_extra_size.';" href="'.esc_attr( $link['url'] ).'" class="'.$global_button_background_color.' '.$button_shape.' pricing-button btn '.$button_size.'" role="button">'.$button_title.'</a></div>';
		
		//Layout
		
		$layout = 1;
		
		$output .= '<div class="pricing-table '.$css_class.' '.$shadow_pricing_table.'">';
		
		while( $layout <= 6 ){
			if(${'area_' . $layout} != '' && ${'area_' . $layout} != 'disable'){
				
				$data_content = ${'area_' . $layout} . '_content';
				
				$output .= '<div class="'.${'area_' . $layout}.'" style="margin:'.${'margin_area_' . $layout}.';padding:'.${'padding_area_' . $layout}.';background-color:'.${'background_area_' . $layout}.';">'.${$data_content}.'</div>';
				
			}
			$layout++;
		}
		
		$output .= '</div>';
		
		return $output;
	}
}

class WPBakeryShortCode_visualmodo_feature extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'description' => '',
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
	'name' => __( 'Pricing', 'visualmodo' ),
	'base' => 'visualmodo_pricing',
	'icon' => plugins_url('../images/pricing.png', __FILE__),
	"as_parent" => array('only' => 'visualmodo_elements_feature'),
	"content_element" => true,
	"show_settings_on_create" => false,
	"is_container" => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Show a flexible and powerful list', 'visualmodo' ),
	'params' => array(
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title', 'visualmodo' ),
			'param_name' => 'title',
			'description' => __( 'Enter the title here.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Price', 'visualmodo' ),
			'param_name' => 'price',
			'description' => __( 'Enter the price for this package. e.g. 999.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Currency', 'visualmodo' ),
			'param_name' => 'currency',
			'description' => __( 'Enter the price unit for this package. e.g. $.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Plan', 'visualmodo' ),
			'param_name' => 'plan',
			'description' => __( 'Enter the plan for this package. e.g. per month.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textarea_html',
			'heading' => __( 'Sub Heading', 'visualmodo' ),
			'param_name' => 'content',
			'description' => __( 'Enter short description.', 'visualmodo' ),
		),
		
		/*
		* Features Tab
		*/
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Features Spacing', 'visualmodo' ),
			'param_name' => 'features_spacing',
			'description' => __( 'Select features spacing. e.g. 16px.', 'visualmodo' ),
			'group' => 'Features',
		),
		
		array(
			'type' => 'checkbox',
			'heading' => __('Features Line List', 'visualmodo'),
			'param_name' => 'features_line_list',
			'group' => 'Features',
			'value' => array(
				__( 'Enable Features Line List.', 'visualmodo' ) => 'line_list',
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Features Line List Color', 'visualmodo' ),
			'param_name' => 'features_line_list_color',
			'description' => __( 'Select custom line color.', 'visualmodo' ),
			'group' => 'Features',
			'dependency' => array(
				'element' => 'features_line_list',
				'value' => array( 'line_list' ),
			),
		),
		
		array(
			'type' => 'checkbox',
			'heading' => __('Shadow Pricing Table', 'visualmodo'),
			'param_name' => 'shadow_pricing_table',
			'value' => array(
				__( 'Apply shadow on the Pricing table.', 'visualmodo' ) => 'shadow_pricing',
			),
		),
		
		/*
		* Icon Tab
		*/
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Icon to display', 'visualmodo' ),
			'param_name' => 'icon_display',
			'value' => array(
				__( 'Icon Manager', 'visualmodo' ) => 'icon_manager',
				__( 'Image Icon', 'visualmodo' ) => 'image_icon',
				__( 'SVG Icon', 'visualmodo' ) => 'svg_icon',
			),
			'description' => __( 'Enable Icon Library.', 'visualmodo' ),
			'group' => 'Icon',
		),
		
		array(
			'type' => 'attach_image',
			'heading' => __( 'Upload Image Icon', 'visualmodo' ),
			'param_name' => 'custom_image_icon',
			'description' => __( 'Upload the custom image icon.', 'visualmodo' ),
			'group' => 'Icon',
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'image_icon' ),
			),
		),
		
		array(
			'type' => 'attach_image',
			'heading' => __( 'Upload SVG Icon', 'visualmodo' ),
			'param_name' => 'custom_svg_icon',
			'description' => __( 'Upload the custom svg icon.', 'visualmodo' ),
			'group' => 'Icon',
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'svg_icon' ),
			),
		),
		
		array(
			'type' => 'iconmanager',
			'heading' => __( 'Icon', 'visualmodo' ),
			'param_name' => 'icon',
			'description' => __( 'Select icon from library.', 'visualmodo' ),
			'group' => 'Icon',
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager' ),
			),
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
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager' ),
			),
			'group' => 'Icon',
		),
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Custom Icon Color', 'visualmodo' ),
			'param_name' => 'custom_icon_color',
			'description' => __( 'Select custom icon color.', 'visualmodo' ),
			'group' => 'Icon',
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
			'group' => 'Icon',
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager' ),
			),
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
			'group' => 'Icon',
			'dependency' => array(
				'element' => 'shape',
				'value' => array( 'rounded','boxed','rounded-less','rounded-outline','boxed-outline','rounded-less-outline'  ),
			),
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Size', 'visualmodo' ),
			'param_name' => 'icon_size',
			'description' => __( 'Icon size. Default value is 16px.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager' ),
			),
			'group' => 'Icon',
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Icon Spacing', 'visualmodo' ),
			'param_name' => 'icon_spacing',
			'description' => __( 'Select icon spacing. e.g. 16px.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager' ),
			),
			'group' => 'Icon',
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
			'group' => 'Icon',
		),
		
		/*
		* Button Tab
		*/
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title', 'visualmodo' ),
			'param_name' => 'button_title',
			'description' => __( 'Enter the title here.', 'visualmodo' ),
			'group' => 'Button',			
		),
		
		array(
			'type' => 'vc_link',
			'heading' => __( 'URL (Link)', 'visualmodo' ),
			'param_name' => 'button_link',
			'description' => __( 'Add link to button.', 'visualmodo' ),
			'group' => 'Button',
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Text Color', 'visualmodo' ),
			'param_name' => 'button_text_color',
			'description' => __( 'Select button text color.', 'visualmodo' ),
			//CURIOSIDADE'param_holder_class' => 'vc_colored-dropdown vc_btn3-colored-dropdown',
			'value' => '#ffffff',
			'group' => 'Button',
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Color', 'visualmodo' ),
			'param_name' => 'button_background_color',
			'description' => __( 'Select button background color.', 'visualmodo' ),
			'group' => 'Button',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Shape', 'visualmodo' ),
			'description' => __( 'Select button shape.', 'visualmodo' ),
			'param_name' => 'button_shape',
			'group' => 'Button',
			'value' => array(
				__( 'Rounded', 'visualmodo' ) => 'rounded',
				__( 'Square', 'visualmodo' ) => 'square',
				__( 'Round', 'visualmodo' ) => 'round',
				__( 'Outline Rounded', 'visualmodo' ) => 'outline-rounded',
				__( 'Outline Square', 'visualmodo' ) => 'outline-square',
				__( 'Outline Round', 'visualmodo' ) => 'outline-round',
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Size', 'visualmodo' ),
			'param_name' => 'button_size',
			'value' => array(
				__( 'Extra Small', 'visualmodo' ) => 'btn-xs',
				__( 'Small', 'visualmodo' ) => 'btn-sm',
				__( 'Medium', 'visualmodo' ) => 'btn-md',
				__( 'Large', 'visualmodo' ) => 'btn-lg',
				__( 'Block', 'visualmodo' ) => 'btn-block',
			),
			'description' => __( 'Select button display size.', 'visualmodo' ),
			'group' => 'Button',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Extra Size', 'visualmodo' ),
			'param_name' => 'button_extra_size',
			'description' => __( 'Enter extra size.', 'visualmodo' ),
			'group' => 'Button',			
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Alignment', 'visualmodo' ),
			'param_name' => 'button_alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'text-left',
				__( 'Right', 'visualmodo' ) => 'text-right',
				__( 'Center', 'visualmodo' ) => 'text-center',
			),
			'description' => __( 'Select button alignment.', 'visualmodo' ),
			'group' => 'Button',
		),
		
		/*
		* Layout Tab
		*/
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'First Area', 'visualmodo' ),
			'param_name' => 'area_1',
			'group' => 'Layout',
			'value' => array(
				__( 'Icon', 'visualmodo' ) => 'icon',
				__( 'Title', 'visualmodo' ) => 'title',
				__( 'Sub Heading', 'visualmodo' ) => 'sub_heading',
				__( 'Price and Plan', 'visualmodo' ) => 'price',
				__( 'Featured List', 'visualmodo' ) => 'featured_list',
				__( 'Button', 'visualmodo' ) => 'pricing_button',
				__( 'Disable', 'visualmodo' ) => 'disable',
			),
			'default' => 'icon_image',
			'description' => __( 'Choose the element.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Margin First Area', 'visualmodo' ),
			'param_name' => 'margin_area_1',
			'description' => __( 'Enter margin. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_1',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Padding First Area', 'visualmodo' ),
			'param_name' => 'padding_area_1',
			'description' => __( 'Enter padding. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_1',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background First Area', 'visualmodo' ),
			'param_name' => 'background_area_1',
			'description' => __( 'Select custom background color for first area.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_1',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Second Area', 'visualmodo' ),
			'param_name' => 'area_2',
			'group' => 'Layout',
			'value' => array(
				__( 'Icon', 'visualmodo' ) => 'icon',
				__( 'Title', 'visualmodo' ) => 'title',
				__( 'Sub Heading', 'visualmodo' ) => 'sub_heading',
				__( 'Price and Plan', 'visualmodo' ) => 'price',
				__( 'Featured List', 'visualmodo' ) => 'featured_list',
				__( 'Button', 'visualmodo' ) => 'pricing_button',
				__( 'Disable', 'visualmodo' ) => 'disable',
			),
			'default' => 'title',
			'description' => __( 'Choose the element.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Margin Second Area', 'visualmodo' ),
			'param_name' => 'margin_area_2',
			'description' => __( 'Enter margin. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_2',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Padding Second Area', 'visualmodo' ),
			'param_name' => 'padding_area_2',
			'description' => __( 'Enter padding. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_2',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Second Area', 'visualmodo' ),
			'param_name' => 'background_area_2',
			'description' => __( 'Select custom background color for second area.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_2',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Third Area', 'visualmodo' ),
			'param_name' => 'area_3',
			'group' => 'Layout',
			'value' => array(
				__( 'Icon', 'visualmodo' ) => 'icon',
				__( 'Title', 'visualmodo' ) => 'title',
				__( 'Sub Heading', 'visualmodo' ) => 'sub_heading',
				__( 'Price and Plan', 'visualmodo' ) => 'price',
				__( 'Featured List', 'visualmodo' ) => 'featured_list',
				__( 'Button', 'visualmodo' ) => 'pricing_button',
				__( 'Disable', 'visualmodo' ) => 'disable',
			),
			'default' => 'value',
			'description' => __( 'Choose the element.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Margin Third Area', 'visualmodo' ),
			'param_name' => 'margin_area_3',
			'description' => __( 'Enter margin. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_3',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Padding Third Area', 'visualmodo' ),
			'param_name' => 'padding_area_3',
			'description' => __( 'Enter padding. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_3',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Third Area', 'visualmodo' ),
			'param_name' => 'background_area_3',
			'description' => __( 'Select custom background color for third area.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_3',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Fourth Area', 'visualmodo' ),
			'param_name' => 'area_4',
			'group' => 'Layout',
			'value' => array(
				__( 'Icon', 'visualmodo' ) => 'icon',
				__( 'Title', 'visualmodo' ) => 'title',
				__( 'Sub Heading', 'visualmodo' ) => 'sub_heading',
				__( 'Price and Plan', 'visualmodo' ) => 'price',
				__( 'Featured List', 'visualmodo' ) => 'featured_list',
				__( 'Button', 'visualmodo' ) => 'pricing_button',
				__( 'Disable', 'visualmodo' ) => 'disable',
			),
			'default' => 'featured_list',
			'description' => __( 'Choose the element.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Margin Fourth Area', 'visualmodo' ),
			'param_name' => 'margin_area_4',
			'description' => __( 'Enter margin. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_4',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Padding Fourth Area', 'visualmodo' ),
			'param_name' => 'padding_area_4',
			'description' => __( 'Enter padding. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_4',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Fourth Area', 'visualmodo' ),
			'param_name' => 'background_area_4',
			'description' => __( 'Select custom background color for fourth area.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_4',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Fifth Area', 'visualmodo' ),
			'param_name' => 'area_5',
			'group' => 'Layout',
			'value' => array(
				__( 'Icon', 'visualmodo' ) => 'icon',
				__( 'Title', 'visualmodo' ) => 'title',
				__( 'Sub Heading', 'visualmodo' ) => 'sub_heading',
				__( 'Price and Plan', 'visualmodo' ) => 'price',
				__( 'Featured List', 'visualmodo' ) => 'featured_list',
				__( 'Button', 'visualmodo' ) => 'pricing_button',
				__( 'Disable', 'visualmodo' ) => 'disable',
			),
			'default' => 'btn',
			'description' => __( 'Choose the element.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Margin Fifth Area', 'visualmodo' ),
			'param_name' => 'margin_area_5',
			'description' => __( 'Enter margin. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_5',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Padding Fifth Area', 'visualmodo' ),
			'param_name' => 'padding_area_5',
			'description' => __( 'Enter padding. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_5',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Fifth Area', 'visualmodo' ),
			'param_name' => 'background_area_5',
			'description' => __( 'Select custom background color for fifth area.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_5',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Sixth Area', 'visualmodo' ),
			'param_name' => 'area_6',
			'group' => 'Layout',
			'value' => array(
				__( 'Icon', 'visualmodo' ) => 'icon',
				__( 'Title', 'visualmodo' ) => 'title',
				__( 'Sub Heading', 'visualmodo' ) => 'sub_heading',
				__( 'Price and Plan', 'visualmodo' ) => 'price',
				__( 'Featured List', 'visualmodo' ) => 'featured_list',
				__( 'Button', 'visualmodo' ) => 'pricing_button',
				__( 'Disable', 'visualmodo' ) => 'disable',
			),
			'default' => 'btn',
			'description' => __( 'Choose the element.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Margin Sixth Area', 'visualmodo' ),
			'param_name' => 'margin_area_6',
			'description' => __( 'Enter margin. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_6',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Padding Sixth Area', 'visualmodo' ),
			'param_name' => 'padding_area_6',
			'description' => __( 'Enter padding. e.g. 16px.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_6',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Sixth Area', 'visualmodo' ),
			'param_name' => 'background_area_6',
			'description' => __( 'Select custom background color for sixth area.', 'visualmodo' ),
			'group' => 'Layout',
			'dependency' => array(
				'element' => 'area_6',
				'value_not_equal_to' => array( '' ),
			),
		),
		
		/*
		* Typography Tab
		*/
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Title Tag', 'visualmodo' ),
			'param_name' => 'title_tag',
			'group' => 'Typography',
			'value' => array(
				__( 'H1', 'visualmodo' ) => 'h1',
				__( 'H2', 'visualmodo' ) => 'h2',
				__( 'H3', 'visualmodo' ) => 'h3',
				__( 'H4', 'visualmodo' ) => 'h4',
				__( 'H5', 'visualmodo' ) => 'h5',
				__( 'H6', 'visualmodo' ) => 'h6',
				__( 'p', 'visualmodo' ) => 'p',
				__( 'div', 'visualmodo' ) => 'div',
			),
			'description' => __( 'Select title tag.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title Font Size', 'visualmodo' ),
			'param_name' => 'title_size',
			'description' => __( 'Enter font size.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title Line Height', 'visualmodo' ),
			'param_name' => 'title_line_height',
			'description' => __( 'Enter line height.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title Spacing', 'visualmodo' ),
			'param_name' => 'title_spacing',
			'description' => __( 'Select title spacing. e.g. 16px.', 'visualmodo' ),
			'group' => 'Typography',
		),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Title Alignment', 'visualmodo' ),
			'param_name' => 'title_alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'left',
				__( 'Right', 'visualmodo' ) => 'right',
				__( 'Center', 'visualmodo' ) => 'center',
			),
			'description' => __( 'Select title alignment.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Title Color', 'visualmodo' ),
			'param_name' => 'title_color',
			'description' => __( 'Select custom color for the title.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Price Font Size', 'visualmodo' ),
			'param_name' => 'price_size',
			'description' => __( 'Enter font size.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Price Line Height', 'visualmodo' ),
			'param_name' => 'price_line_height',
			'description' => __( 'Enter line height.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Price Spacing', 'visualmodo' ),
			'param_name' => 'price_spacing',
			'description' => __( 'Select title spacing. e.g. 16px.', 'visualmodo' ),
			'group' => 'Typography',
		),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Price Alignment', 'visualmodo' ),
			'param_name' => 'price_alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'left',
				__( 'Right', 'visualmodo' ) => 'right',
				__( 'Center', 'visualmodo' ) => 'center',
			),
			'description' => __( 'Select price alignment.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Price Color', 'visualmodo' ),
			'param_name' => 'price_color',
			'description' => __( 'Select custom color for the price.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Currency Font Size', 'visualmodo' ),
			'param_name' => 'currency_size',
			'description' => __( 'Enter font size.', 'visualmodo' ),
			'group' => 'Typography',
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Currency Spacing', 'visualmodo' ),
			'param_name' => 'currency_spacing',
			'description' => __( 'Select spacing. e.g. 16px.', 'visualmodo' ),
			'group' => 'Typography',
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
		"js_view" => 'VcColumnView'
		) );
		
		vc_map( array(
			"name" => __("Feature", 'visualmodo'),
			'description' => __( 'Display List Group Item', 'visualmodo' ),
			"base" => "visualmodo_elements_feature",
			'icon' => plugins_url('../images/feature.png', __FILE__),
			"content_element" => true,
			"as_child" => array('only' => 'visualmodo_elements_pricing'), 
			"params" => array(
				array(
					'type' => 'textarea_html',
					'heading' => __( 'Description', 'visualmodo' ),
					'param_name' => 'description',
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