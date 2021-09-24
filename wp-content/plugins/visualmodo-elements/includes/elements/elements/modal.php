<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Modal
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_modal extends WPBakeryShortCodesContainer {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'trigger' => 'trigger-button',
			'title' => 'Title',
			'title_tag' => 'span',
			'text_color' => '',
			'alignment' => 'trigger-left',
			'initial_height' => '',
			'button_shape' => 'visualmodo-elements-rounded',
			'button_outline_shape' => '',
			'button_color' => '',
			'button_title_color' => '',
			'button_background_color' => '',
			'button_outline_color' => '',
			'button_size' => 'button-size-small',
			'icon_display' => '',
			'custom_image_icon' => '',
			'custom_svg_icon' => '',
			'icon' => '',
			'icon_color' => '',
			'custom_icon_color' => '',
			'shape' => '',
			'color_shape' => '',
			'icon_size' => '',
			'icon_spacing' => '',
			'icon_gap' => '0',
			'height' => 'auto',
			'width' => '100px',
			'animations' => '',
			'animation_delay' => '',
			'animation_speed' => 'slower animated infinite',
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
		
		$uniqid = md5(uniqid(rand(), true));
		$uniqid = preg_replace('/[0-9]+/', '', $uniqid);
		
		// End Default Extra Class, CSS and CSS animation	
		
		// Start Trigger Mode
		
		$output .= '<div class="visualmodo-elements-modal-trigger '.$alignment.'">';
		
		if ($trigger == 'trigger-button') {
			
			if (!empty($button_color)) {
				
				// Button Background Color
				
				if ( empty($button_background_color) && !empty($button_outline_color)  ) {
					
					$button_background_color = $visualmodo_elements_global_background_color = "";
					
				} else if ( !empty($button_background_color) ) {
					
					$button_background_color = 'background-color: '.$button_background_color.';';
					
				}
				
				// Text Color
				
				if (!empty($button_title_color)) {
					$button_title_color = 'color: '.$button_title_color.';'; 
				} else {
					$button_title_color = ''; 
				}
				
				// Border Color
				
				if (!empty($button_outline_color)) {
					$button_outline_color = 'border-color: '.$button_outline_color.';'; 
				} else {
					$button_outline_color = ''; 
				}
				
			} else {
				$button_title_color = '';
				$button_background_color = '';
				$button_outline_color = '';
			}
			
			
			$output .= '<div style="'.$button_background_color .' '.$button_title_color.' '.$button_outline_color.'" class="visualmodo-elements-modal-button '.$button_size.' '.$trigger.' '.$button_shape.' '.$button_outline_shape.' '.$visualmodo_elements_global_background_color.'" data-modal="'.$uniqid.'">'.$title.'</div>';	
		} else if ($trigger == 'trigger-image') {
			
			// Image
			
			if ($icon_display == 'image_icon') {
				
				$default_src = vc_asset_url( 'vc/no_image.png' );
				$img = wp_get_attachment_image_src( $custom_image_icon );
				$src = $img[0];
				$custom_src = $src ? esc_attr( $src ) : $default_src;
				
				$icon_content = '<img src="'.$custom_src.'" >';
				
			} elseif ($icon_display == 'svg_icon') {
				
				$default_src = vc_asset_url( 'vc/no_image.png' );
				$img = wp_get_attachment_image_src( $custom_svg_icon );
				$src = $img[0];
				$custom_src = $src ? esc_attr( $src ) : $default_src;
				
				$icon_content = '<div class="visualmodo-elements-modal-svg" style="height:'.$height.';width:'.$width.';"><img class="visualmodo-elements-svg-img" src="'.$custom_src.'" ></div>';
				
			} else {
				
				$iconClass = isset( $icon ) ? esc_attr( $icon ) : 'fa fa-adjust';
				
				if($icon_color != '') {
					$custom_icon_color = 'color:'.$custom_icon_color.';';
					$global_icon_color = '';
				} else {
					$icon_color = '';
					$global_icon_color = 'visualmodo-elements-global-color';
				}
				
				$font_size_reference = $icon_size;
				
				if($icon_size != '') {
					$icon_size = 'font-size:'.$icon_size.';';
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
					
					if($icon_spacing != '') {
						$icon_spacing = 'height:'.$icon_spacing.'; width:'.$icon_spacing.';';
					} else {
						$icon_spacing = 'height:calc('.$font_size_reference.' + 2em); width:calc('.$font_size_reference.' + 2em);';
					}
					
					$shape_render_start = '<div class="visualmodo-elements-modal-icon-inner '.$shape.' '.$default_color_shape.'" style="'.$color_shape.''.$icon_spacing.'">';
					$shape_render_finish = '</div>';
					
				} else {
					$shape_render_start = '';
					$shape_render_finish = '';
				}
				
				$icon_content = ''.$shape_render_start.'<span style="'.$custom_icon_color.' '.$icon_size.'" class="visualmodo-elements-modal-image '.$global_icon_color.' '.$iconClass.'"></span>'.$shape_render_finish.'';
			}
			
			$output .= '<div data-modal="'.$uniqid.'" class="visualmodo-elements-modal-icon '.$animations.' '.$animation_delay.' '.$animation_speed.'" '.$icon_gap.'>';
			$output .= $icon_content;
			$output .= '</div>';
			
		} else if ($trigger == 'trigger-text') {
			
			// Title Color
			
			if (!empty($text_color)) {
				$text_color = 'color: '.$text_color.';'; 
			} else {
				$text_color = ''; 
			}
			
			$output .= '<'.$title_tag.' style="'.$text_color .'" class="visualmodo-elements-modal-text" data-modal="'.$uniqid.'">'.$title.'</'.$title_tag.'>';
		}
		
		$output .= '</div>';
		
		// End Trigger Mode

		// Start Modal Height

		if (!empty($initial_height)) {
			$initial_height = 'style="height:'.$initial_height.';"';
		}

		// End Modal Height
		
		$output .= '<div id="'.$uniqid.'" class="visualmodo-elements-modal">';
		$output .= '<div id="'.$uniqid.'" class="visualmodo-elements-modal-inner' .$css_class.'">';
		$output .= '<a class="visualmodo-elements-modal-close">&times;</a>';
		$output .= '<div id="'.$el_id.'" '.$initial_height.' class="visualmodo-elements-modal-content">'.wpb_js_remove_wpautop($content).'</div>';
		$output .= '</div>';
		$output .= '</div>';
		
		return $output;
	}
}


vc_map( array(
	'name' => __( 'Modal', 'visualmodo' ),
	'base' => 'visualmodo_modal',
	'icon' => plugins_url('../images/modal.png', __FILE__),
	"content_element" => true,
	"show_settings_on_create" => false,
	"is_container" => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Add and manage multiple icons', 'visualmodo' ),
	'params' => array(
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Start From', 'visualmodo' ),
			'param_name' => 'trigger',
			'value' => array(
				__( 'Button', 'visualmodo' ) => 'trigger-button',
				__( 'Image', 'visualmodo' ) => 'trigger-image',
				__( 'Text', 'visualmodo' ) => 'trigger-text',
			),
			'description' => __( 'Select start mode.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title', 'visualmodo' ),
			'param_name' => 'title',
			'description' => __( 'Enter Title.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-button','trigger-text' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Title Tag', 'visualmodo' ),
			'param_name' => 'title_tag',
			'value' => array(
				__( 'span', 'visualmodo' ) => 'span',
				__( 'h1', 'visualmodo' ) => 'h1',
				__( 'h2', 'visualmodo' ) => 'h2',
				__( 'h3', 'visualmodo' ) => 'h3',
				__( 'h4', 'visualmodo' ) => 'h4',
				__( 'h5', 'visualmodo' ) => 'h5',
				__( 'h6', 'visualmodo' ) => 'h6',
				__( 'p', 'visualmodo' ) => 'p',
				__( 'div', 'visualmodo' ) => 'div',
			),
			'description' => __( 'Select element tag.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-text' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Title Color', 'visualmodo' ),
			'param_name' => 'text_color',
			'description' => __( 'Select custom title color.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-text' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Alignment', 'visualmodo' ),
			'param_name' => 'alignment',
			'value' => array(
				__( 'Left', 'visualmodo' ) => 'trigger-left',
				__( 'Right', 'visualmodo' ) => 'trigger-right',
				__( 'Center', 'visualmodo' ) => 'trigger-center',
			),
			'description' => __( 'Select alignment.', 'visualmodo' ),
		),

		array(
			'type' => 'dropdown',
			'heading' => __( 'Initial Height', 'visualmodo' ),
			'param_name' => 'initial_height',
			'value' => array(
				__( 'None', 'visualmodo' ) => '',
				__( '5', 'visualmodo' ) => '5vh',
				__( '10', 'visualmodo' ) => '10vh',
				__( '15', 'visualmodo' ) => '15vh',
				__( '20', 'visualmodo' ) => '20vh',
				__( '25', 'visualmodo' ) => '25vh',
				__( '30', 'visualmodo' ) => '30vh',
				__( '35', 'visualmodo' ) => '35vh',
				__( '40', 'visualmodo' ) => '40vh',
				__( '45', 'visualmodo' ) => '45vh',
				__( '50', 'visualmodo' ) => '50vh',
			),
			'description' => __( 'Select the initial height for modal.', 'visualmodo' ),
		),
		
		/*
		* Button Tab
		*/
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Shape', 'visualmodo' ),
			'description' => __( 'Select shape.', 'visualmodo' ),
			'param_name' => 'button_shape',
			'value' => array(
				__( 'Rounded', 'visualmodo' ) => 'visualmodo-elements-rounded',
				__( 'Square', 'visualmodo' ) => 'visualmodo-elements-square',
				__( 'Round', 'visualmodo' ) => 'visualmodo-elements-round',
			),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-button' ),
			),
			'group' => 'Button',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Outline Shape', 'visualmodo' ),
			'description' => __( 'Select outilne shape.', 'visualmodo' ),
			'param_name' => 'button_outline_shape',
			'value' => array(
				__( 'None', 'visualmodo' ) => '',
				__( 'Outline', 'visualmodo' ) => 'visualmodo-elements-outline',
				__( 'Outline 2x', 'visualmodo' ) => 'visualmodo-elements-outline-2',
				__( 'Outline 3x', 'visualmodo' ) => 'visualmodo-elements-outline-3',
				__( 'Outline 4x', 'visualmodo' ) => 'visualmodo-elements-outline-4',
				__( 'Outline 5x', 'visualmodo' ) => 'visualmodo-elements-outline-5',
			),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-button' ),
			),
			'group' => 'Button',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Button Color', 'visualmodo' ),
			'param_name' => 'button_color',
			'value' => array(
				__( 'Preset Color', 'visualmodo' ) => '',
				__( 'Custom Color', 'visualmodo' ) => 'custom',
			),
			'description' => __( 'Select icon color.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-button' ),
			),
			'group' => 'Button',
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Title Color', 'visualmodo' ),
			'param_name' => 'button_title_color',
			'description' => __( 'Select color.', 'visualmodo' ),
			'group' => 'Button',
			'dependency' => array(
				'element' => 'button_color',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Background Color', 'visualmodo' ),
			'param_name' => 'button_background_color',
			'description' => __( 'Select color.', 'visualmodo' ),
			'group' => 'Button',
			'dependency' => array(
				'element' => 'button_color',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Outline Color', 'visualmodo' ),
			'param_name' => 'button_outline_color',
			'description' => __( 'Select color.', 'visualmodo' ),
			'group' => 'Button',
			'dependency' => array(
				'element' => 'button_color',
				'value' => array( 'custom' ),
			),
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Size', 'visualmodo' ),
			'description' => __( 'Select button size.', 'visualmodo' ),
			'param_name' => 'button_size',
			'value' => array(
				__( 'Small', 'visualmodo' ) => 'button-size-small',
				__( 'Normal', 'visualmodo' ) => 'button-size-normal',
				__( 'Large', 'visualmodo' ) => 'button-size-large',
				__( 'Block', 'visualmodo' ) => 'button-size-block',
			),
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-button' ),
			),
			'group' => 'Button',
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
			'dependency' => array(
				'element' => 'trigger',
				'value' => array( 'trigger-image' ),
			),
			'group' => 'Image',
		),
		
		array(
			'type' => 'attach_image',
			'heading' => __( 'Upload Image Icon', 'visualmodo' ),
			'param_name' => 'custom_image_icon',
			'description' => __( 'Upload the custom image icon.', 'visualmodo' ),
			'group' => 'Image',
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
			'group' => 'Image',
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
			'group' => 'Image',
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
			'group' => 'Image',
		),
		array(
			'type' => 'colorpicker',
			'heading' => __( 'Custom Icon Color', 'visualmodo' ),
			'param_name' => 'custom_icon_color',
			'description' => __( 'Select custom icon color.', 'visualmodo' ),
			'group' => 'Image',
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
			'group' => 'Image',
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
			'group' => 'Image',
			'dependency' => array(
				'element' => 'shape',
				'value' => array( 'rounded','square','round','outline-rounded','outline-square','outline-round',  ),
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
			'group' => 'Image',
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Spacing', 'visualmodo' ),
			'param_name' => 'icon_spacing',
			'description' => __( 'Select icon spacing. e.g. 16px.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager' ),
			),
			'group' => 'Image',
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Height', 'visualmodo' ),
			'param_name' => 'height',
			'description' => __( 'Insert the SVG height.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'svg_icon' ),
			),
			'group' => 'Image',
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Width', 'visualmodo' ),
			'param_name' => 'width',
			'description' => __( 'Insert the SVG width.', 'visualmodo' ),
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'svg_icon' ),
			),
			'group' => 'Image',
		),
		
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Animations', 'visualmodo' ),
			'param_name' => 'animations',
			'dependency' => array(
				'element' => 'icon_display',
				'value' => array( 'icon_manager', 'image_icon', 'svg_icon' ),
			),
			'value' => array(
				__( 'No Animation', 'visualmodo' ) => '',
				__( 'Bounce', 'visualmodo' ) => 'bounce',
				__( 'Flash', 'visualmodo' ) => 'flash',
				__( 'Pulse', 'visualmodo' ) => 'pulse',
				__( 'Rubber Band', 'visualmodo' ) => 'rubberBand',
				__( 'Shake', 'visualmodo' ) => 'shake',
				__( 'Head Shake', 'visualmodo' ) => 'headShake',
				__( 'Swing', 'visualmodo' ) => 'swing',
				__( 'Tada', 'visualmodo' ) => 'tada',
				__( 'Wobble', 'visualmodo' ) => 'wobble',
				__( 'Jello', 'visualmodo' ) => 'jello',
				__( 'Bounce In', 'visualmodo' ) => 'bounceIn',
				__( 'Bounce In Down', 'visualmodo' ) => 'bounceInDown',
				__( 'Bounce In Left', 'visualmodo' ) => 'bounceInLeft',
				__( 'Bounce In Right', 'visualmodo' ) => 'bounceInRight',
				__( 'Bounce In Up', 'visualmodo' ) => 'bounceInUp',
				__( 'Bounce Out', 'visualmodo' ) => 'bounceOut',
				__( 'Bounce Out Down', 'visualmodo' ) => 'bounceOutDown',
				__( 'Bounce Out Left', 'visualmodo' ) => 'bounceOutLeft',
				__( 'Bounce Out Right', 'visualmodo' ) => 'bounceOutRight',
				__( 'Bounce Out Up', 'visualmodo' ) => 'bounceOutUp',
				__( 'Fade In', 'visualmodo' ) => 'fadeIn',
				__( 'Fade In Down', 'visualmodo' ) => 'fadeInDown',
				__( 'Fade In Down Big', 'visualmodo' ) => 'fadeInDownBig',
				__( 'Fade In Left', 'visualmodo' ) => 'fadeInLeft',
				__( 'Fade In Left Big', 'visualmodo' ) => 'fadeInLeftBig',
				__( 'Fade In Right', 'visualmodo' ) => 'fadeInRight',
				__( 'Fade In Right Big', 'visualmodo' ) => 'fadeInRightBig',
				__( 'Fade In Up', 'visualmodo' ) => 'fadeInUp',
				__( 'Fade In Up Big', 'visualmodo' ) => 'fadeInUpBig',
				__( 'Fade Out', 'visualmodo' ) => 'fadeOut',
				__( 'Fade Out Down', 'visualmodo' ) => 'fadeOutDown',
				__( 'Fade Out Down Big', 'visualmodo' ) => 'fadeOutDownBig',
				__( 'Fade Out Left', 'visualmodo' ) => 'fadeOutLeft',
				__( 'Fade Out Left Big', 'visualmodo' ) => 'fadeOutLeftBig',
				__( 'Fade Out Right', 'visualmodo' ) => 'fadeOutRight',
				__( 'Fade Out Right Big', 'visualmodo' ) => 'fadeOutRightBig',
				__( 'Fade Out Up', 'visualmodo' ) => 'fadeOutUp',
				__( 'Fade Out Up Big', 'visualmodo' ) => 'fadeOutUpBig',
				__( 'Flip In X', 'visualmodo' ) => 'flipInX',
				__( 'Flip In Y', 'visualmodo' ) => 'flipInY',
				__( 'Flip Out X', 'visualmodo' ) => 'flipOutX',
				__( 'Flip Out Y', 'visualmodo' ) => 'flipOutY',
				__( 'Light Speed In', 'visualmodo' ) => 'lightSpeedIn',
				__( 'Light Speed Out', 'visualmodo' ) => 'lightSpeedOut',
				__( 'Rotate In', 'visualmodo' ) => 'rotateIn',
				__( 'Rotate In Down Left', 'visualmodo' ) => 'rotateInDownLeft',
				__( 'Rotate In Down Right', 'visualmodo' ) => 'rotateInDownRight',
				__( 'Rotate In Up Left', 'visualmodo' ) => 'rotateInUpLeft',
				__( 'Rotate In Up Right', 'visualmodo' ) => 'rotateInUpRight',
				__( 'Rotate Out', 'visualmodo' ) => 'rotateOut',
				__( 'Rotate Out Down Left', 'visualmodo' ) => 'rotateOutDownLeft',
				__( 'Rotate Out Down Right', 'visualmodo' ) => 'rotateOutDownRight',
				__( 'Rotate Out Up Left', 'visualmodo' ) => 'rotateOutUpLeft',
				__( 'Rotate Out Up Right', 'visualmodo' ) => 'rotateOutUpRight',
				__( 'Hinge', 'visualmodo' ) => 'hinge',
				__( 'Jack In The Box', 'visualmodo' ) => 'jackInTheBox',
				__( 'Roll In', 'visualmodo' ) => 'rollIn',
				__( 'Roll Out', 'visualmodo' ) => 'rollOut',
				__( 'Zoom In', 'visualmodo' ) => 'zoomIn',
				__( 'Zoom In Down', 'visualmodo' ) => 'zoomInDown',
				__( 'Zoom In Left', 'visualmodo' ) => 'zoomInLeft',
				__( 'Zoom In Right', 'visualmodo' ) => 'zoomInRight',
				__( 'Zoom In Up', 'visualmodo' ) => 'zoomInUp',
				__( 'Zoom Out', 'visualmodo' ) => 'zoomOut',
				__( 'Zoom Out Down', 'visualmodo' ) => 'zoomOutDown',
				__( 'Zoom Out Left', 'visualmodo' ) => 'zoomOutLeft',
				__( 'Zoom Out Right', 'visualmodo' ) => 'zoomOutRight',
				__( 'Zoom Out Up', 'visualmodo' ) => 'zoomOutUp',
				__( 'Slide In Down', 'visualmodo' ) => 'slideInDown',
				__( 'Slide In Left', 'visualmodo' ) => 'slideInLeft',
				__( 'Slide In Right', 'visualmodo' ) => 'slideInRight',
				__( 'Slide In Up', 'visualmodo' ) => 'slideInUp',
				__( 'Slide Out Down', 'visualmodo' ) => 'slideOutDown',
				__( 'Slide Out Left', 'visualmodo' ) => 'slideOutLeft',
				__( 'Slide Out Right', 'visualmodo' ) => 'slideOutRight',
				__( 'Slide Out Up', 'visualmodo' ) => 'slideOutUp',
				__( 'Heart Beat', 'visualmodo' ) => 'heartBeat',
				
			),
			'description' => __( 'Select the type of animation you want on hover.', 'visualmodo' ),
			'group' => 'Image',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Animation Delay', 'visualmodo' ),
			'param_name' => 'animation_delay',
			'value' => array(
				__( 'No Delay', 'visualmodo' ) => '',
				__( 'Delay 1 second', 'visualmodo' ) => 'delay-1s',
				__( 'Delay 2 seconds', 'visualmodo' ) => 'delay-2s',
				__( 'Delay 3 seconds', 'visualmodo' ) => 'delay-3s',
				__( 'Delay 4 seconds', 'visualmodo' ) => 'delay-4s',
				__( 'Delay 5 seconds', 'visualmodo' ) => 'delay-5s',
				
			),
			'dependency' => array(
				'element' => 'animations',
				'value' => array( 'bounce','flash','pulse','rubberBand','shake','headShake','swing','tada','wobble','jello','bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp','bounceOut','bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig','fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp','fadeOutUpBig','flipInX','flipInY','flipOutX','flipOutY','lightSpeedIn','lightSpeedOut','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutUpLeft','rotateOutUpRight','hinge','jackInTheBox','rollIn','rollOut','zoomIn','zoomInDown','zoomInLeft','zoomInRight','zoomInUp','zoomOut','zoomOutDown','zoomOutLeft','zoomOutRight','zoomOutUp','slideInDown','slideInLeft','slideInRight','slideInUp','slideOutDown','slideOutLeft','slideOutRight','slideOutUp','heartBeat' ),
			),
			'description' => __( 'Select delay for animation.', 'visualmodo' ),
			'group' => 'Image',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Animation Speed', 'visualmodo' ),
			'param_name' => 'animation_speed',
			'value' => array(
				__( 'Slower - 3s', 'visualmodo' ) => 'slower animated infinite',
				__( 'Slow - 2s', 'visualmodo' ) => 'slow animated infinite',
				__( 'Fast - 800ms', 'visualmodo' ) => 'fast animated infinite',
				__( 'Faster - 500ms', 'visualmodo' ) => 'faster animated infinite',
				
			),
			'dependency' => array(
				'element' => 'animations',
				'value' => array( 'bounce','flash','pulse','rubberBand','shake','headShake','swing','tada','wobble','jello','bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp','bounceOut','bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp','fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig','fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp','fadeOutUpBig','flipInX','flipInY','flipOutX','flipOutY','lightSpeedIn','lightSpeedOut','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutUpLeft','rotateOutUpRight','hinge','jackInTheBox','rollIn','rollOut','zoomIn','zoomInDown','zoomInLeft','zoomInRight','zoomInUp','zoomOut','zoomOutDown','zoomOutLeft','zoomOutRight','zoomOutUp','slideInDown','slideInLeft','slideInRight','slideInUp','slideOutDown','slideOutLeft','slideOutRight','slideOutUp','heartBeat' ),
			),
			'description' => __( 'Select Speed for animation.', 'visualmodo' ),
			'group' => 'Image',
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