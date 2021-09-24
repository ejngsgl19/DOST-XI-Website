<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/*-----------------------------------------------------------------------------------*/
/*	Infobox
/*-----------------------------------------------------------------------------------*/

class WPBakeryShortCode_visualmodo_wpbakery_infobox extends WPBakeryShortCode {
	protected function content( $atts, $content = null ) {
		extract( shortcode_atts( array(
			'title' => '',
			'link' => '',
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
			'style' => 'column',
			'alignment' => 'flex-start',
			'animations' => '',
			'animation_delay' => '',
			'animation_speed' => 'slower animated infinite',
			'title_tag' => 'h3',
			'title_size' => '',
			'title_line_height' => '',
			'title_spacing' => '',
			'title_alignment' => '',
			'title_color' => '',	
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
		
		// Title
		if($link != '') {
			$link = vc_build_link( $link );
			$link_start = '<a href="'.esc_attr( $link['url'] ).'">';
			$link_finish = '</a>';
		} else {
			$link_start = '';
			$link_finish = '';
		}
		
		if ($title_color == '') {
			$title_color = '';
			$default_title_color = $visualmodo_elements_global_color;
		} else {
			$title_color = 'color:'.$title_color.';';
			$default_title_color = '';
		}
		
		if ($title_size != '') {
			$title_size = 'font-size:'.$title_size.';';
		} else {
			$title_size = '';
		}
		
		if ($title_line_height != '') {
			$title_line_height = 'line-height:'.$title_line_height.';';
		} else {
			$title_line_height = '';
		}
		
		if ($title_spacing != '') {
			$title_spacing = 'margin:'.$title_spacing.';';
		} else {
			$title_spacing = '';
		}
		
		if ($title_alignment != '') {
			$title_alignment = 'text-align:'.$title_alignment.';';
		} else {
			$title_alignment = '';
		}
		
		$title_content = ''.$link_start.'<'.$title_tag.' class="'.$default_title_color.'" style="'.$title_size.$title_line_height.$title_spacing.$title_alignment.$title_color.'">'.$title.'</'.$title_tag.'>'.$link_finish.'';	
		
		// Icon
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
			
			$icon_content = '<div class="visualmodo-elements-infobox-svg" style="height:'.$height.';width:'.$width.';"><img class="visualmodo-elements-svg-img" src="'.$custom_src.'" ></div>';
			
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
				
				$shape_render_start = '<div class="icon-infobox '.$shape.' '.$default_color_shape.'" style="'.$color_shape.''.$icon_spacing.'">';
				$shape_render_finish = '</div>';
				
			} else {
				$shape_render_start = '';
				$shape_render_finish = '';
			}
			
			$icon_content = ''.$shape_render_start.'<span style="'.$custom_icon_color.' '.$icon_size.'" class="visualmodo-elements-infobox-icon-item '.$global_icon_color.' '.$iconClass.'"></span>'.$shape_render_finish.'';
		}
		
		// Gap
		
		$icon_gap = 'style="margin:'.$icon_gap.';"';
		
		// Style
		
		$style_alignment = 'style="flex-direction:'.$style.'; align-items:'.$alignment.';"';
		
		//Output
		$output .= '<div '.$el_id.' class="visualmodo-elements-infobox '.$css_class.'" '.$style_alignment.'>';
		$output .= '<div class="infobox-icon '.$animations.' '.$animation_delay.' '.$animation_speed.'" '.$icon_gap.'>';
		$output .= $icon_content;
		$output .= '</div>';
		$output .= '<div class="infobox-content">';
		$output .= $title_content;
		$output .= $content;
		$output .= '</div>';
		$output .= '</div>';
		
		return $output;
	}
}

return array(
	'name' => __( 'Infobox', 'visualmodo' ),
	'base' => 'visualmodo_infobox',
	'icon' => plugins_url('../images/infobox.png', __FILE__),
	'show_settings_on_create' => true,
	'category' => __( 'Visualmodo', 'visualmodo' ),
	'description' => __( 'Create nice looking infoboxes', 'visualmodo' ),
	'params' => array(
		
		array(
			'type' => 'textfield',
			'heading' => __( 'Title', 'visualmodo' ),
			'param_name' => 'title',
			'description' => __( 'Enter the title here.', 'visualmodo' ),
		),
		
		array(
			'type' => 'vc_link',
			'heading' => __( 'URL (Link)', 'visualmodo' ),
			'param_name' => 'link',
			'description' => __( 'Add link to infobox title.', 'visualmodo' ),
		),
		
		array(
			'type' => 'textarea_html',
			'holder' => 'div',
			'heading' => __( 'Description', 'visualmodo' ),
			'param_name' => 'content',
			'description' => __( 'Provide the description for this Infobox.', 'visualmodo' ),
			'value' => __( '<p>I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>', 'visualmodo' ),
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
			'group' => 'Icon',
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
			'group' => 'Icon',
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
			'group' => 'Icon',
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
			'group' => 'Icon',
		),
		array(
			'type' => 'textfield',
			'heading' => __( 'Gap', 'visualmodo' ),
			'param_name' => 'icon_gap',
			'description' => __( 'Select icon gap. e.g. 16px.', 'visualmodo' ),
			'group' => 'Icon',
		),
		array(
			'type' => 'dropdown',
			'heading' => __( 'Style', 'visualmodo' ),
			'param_name' => 'style',
			'value' => array(
				__( 'Icon at Top', 'visualmodo' ) => 'column',
				__( 'Icon at Bottom', 'visualmodo' ) => 'column-reverse',
				__( 'Icon at Left', 'visualmodo' ) => 'row',
				__( 'Icon at Right', 'visualmodo' ) => 'row-reverse',
			),
			'description' => __( 'Select icon position. Icon box style will be changed according to the icon position.', 'visualmodo' ),
			'group' => 'Icon',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Alignment', 'visualmodo' ),
			'param_name' => 'alignment',
			'value' => array(
				__( 'Start', 'visualmodo' ) => 'flex-start',
				__( 'Center', 'visualmodo' ) => 'center',
				__( 'End', 'visualmodo' ) => 'flex-end',
			),
			'description' => __( 'Select icon alignment.', 'visualmodo' ),
			'group' => 'Icon',
		),
		
		array(
			'type' => 'dropdown',
			'heading' => __( 'Animations', 'visualmodo' ),
			'param_name' => 'animations',
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
			'group' => 'Icon',
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
			'group' => 'Icon',
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
			'group' => 'Icon',
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
			'default' => 'h3',
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
	