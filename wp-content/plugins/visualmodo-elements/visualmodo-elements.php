<?php
/*
Plugin Name: Visualmodo Elements
Plugin URI: https://elements.visualmodo.com/
Description: Get beautiful & free elements built exclusively for WPBakery Page Builder.
Version: 1.0.2
Author: Visualmodo
Author URI: https://visualmodo.com
License: GPLv3 or later
Text Domain: visualmodo
Domain Path: /languages
*/

// don't load directly
if (!defined('ABSPATH')) die('-1');

if ( ! defined( 'VISUALMODO_ELEMENTS_VERSION' ) ) define( 'VISUALMODO_ELEMENTS_VERSION', '1.0.2' );

// Visualmodo Elements Base
$dir = dirname( __FILE__ );
$inc = dirname(__FILE__) . "/includes";

//require_once( $inc . "/paramns/icon-manager/icon-manager.php");
//require_once( $inc . "/options/init.php");
require_once( $inc . "/svg/svg.php");


/*-----------------------------------------------------------------------------------*/
/*  *.  Redux Framework Improvements
/*-----------------------------------------------------------------------------------*/

/** remove redux menu under the tools **/
add_action( 'admin_menu', 'remove_redux_menu',12 );
function remove_redux_menu() {
remove_submenu_page('tools.php','redux-about');
}


/*-----------------------------------------------------------------------------------*/
/*  *.  Visualmodo Elements Dashboard
/*-----------------------------------------------------------------------------------*/

add_action( 'admin_menu', 'visualmodo_elements_admin_menu' );

function visualmodo_elements_admin_menu() {
    add_menu_page( 'Visualmodo Elements', 'Visualmodo Elements', 'manage_options', 'visualmodo-elements.php', 'visualmodo_elements_home', plugin_dir_url(__FILE__) . "assets/img/visualmodo-elements.svg", 99  );
}

function visualmodo_elements_home(){ ?>
    <div class="wrap visualmodo-elements-page-welcome about-wrap">
    <h1><?php echo sprintf( __( 'Welcome to Visualmodo Elements %s', 'visualmodo' ), isset( $matches[0] ) ? $matches[0] : VISUALMODO_ELEMENTS_VERSION ) ?></h1>
    
    <div class="about-text">
    <?php _e( 'Thank you for trusting our products. Visualmodo Elements will be replaced by <b>Borderless</b>. Download <b>Borderless</b> for new features.', 'visualmodo' ) ?>
    </div>
    <div class="wp-badge visualmodo-elements-page-logo">
    <?php echo sprintf( __( 'Version %s', 'visualmodo' ), VISUALMODO_ELEMENTS_VERSION ) ?>
    </div>
    <p class="visualmodo-elements-page-actions">
    <a href="https://wordpress.org/plugins/borderless/"
    class="button button-primary visualmodo-elements-button-settings"><?php _e( 'Download Borderless', 'visualmodo' ) ?></a>
    </p>
    </div>
    <?php
}


class VisualmodoElementsExtendAddonClass {
    function __construct() {
        // We safely integrate with VC with this hook
        add_action( 'init', array( $this, 'integrateWithVC' ) );

        // WPBakery Custom Params
        require_once( dirname(__FILE__) . "/includes/paramns/icon-manager/includes/icon-manager-param.php" );
        
        add_action('admin_enqueue_scripts',array($this,'ipm_scripts'));
        
        // Register CSS and JS
        add_action( 'wp_enqueue_scripts', array( $this, 'ipm_css_js' ) );
    }
    
    function ipm_scripts($hook) {
        wp_enqueue_style('visualmodo_elements_backend_extend_style', plugins_url('assets/css/backend.css', __FILE__) );
        
        // enqueue css files on backend
        if($hook == "post.php" || $hook == "post-new.php" || $hook == 'visual-composer_page_vc-roles'){
            if((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || is_ssl()) {
                $scheme = 'https';
            }
            else {
                $scheme = 'http';
            }
            $this->paths = wp_upload_dir();
            $this->paths['fonts']   = 'visualmodo_elements_ip';
            $this->paths['fonturl'] = set_url_scheme($this->paths['baseurl'].'/'.$this->paths['fonts'], $scheme);
            $fonts = get_option('visualmodo_elements_ip');
            if(is_array($fonts))
            {
                foreach($fonts as $font => $info)
                {
                    if(strpos($info['style'], 'http://' ) !== false) {
                        wp_enqueue_style('visualmodo-elements-'.$font,$info['style']);
                    } else {
                        wp_enqueue_style('visualmodo-elements-'.$font,trailingslashit($this->paths['fonturl']).$info['style']);
                    }
                }
            }
        }
    }
    
    public function integrateWithVC() {
        // Check if Visual Composer is installed
        if ( ! defined( 'WPB_VC_VERSION' ) ) {
            // Display notice that Visual Compser is required
            add_action('admin_notices', array( $this, 'showVcVersionNotice' ));
            return;
        }

        require_once( dirname(__FILE__) . "/includes/elements/lean-map.php");        
    }
    
    // Load plugin css and javascript files which you may need on front end of your site
    public function ipm_css_js() {
        wp_register_style( 'visualmodo_elements_frontend_style', plugins_url('assets/css/visualmodo-elements.min.css', __FILE__), array(), VISUALMODO_ELEMENTS_VERSION );
        wp_enqueue_style( 'visualmodo_elements_frontend_style' );
        
        // If you need any javascript files on front end, here is how you can load them.
        wp_enqueue_script( 'visualmodo_elements_frontend_script', plugins_url('assets/js/visualmodo-elements.js', __FILE__), array(), VISUALMODO_ELEMENTS_VERSION, true );
    }
    
    // Show notice if your plugin is activated but WPBakery is not
    public function showVcVersionNotice() {
        $plugin_data = get_plugin_data(__FILE__);
        echo '
        <div class="updated">
        <p>'.sprintf(__('<strong>%s</strong> requires <strong><a href="https://wpbakery.com/" target="_blank">WPBakery Page Builder</a></strong> plugin to be installed and activated on your site.', 'visualmodo'), $plugin_data['Name']).'</p>
        </div>';
    }
}
// Finally initialize code
new VisualmodoElementsExtendAddonClass();