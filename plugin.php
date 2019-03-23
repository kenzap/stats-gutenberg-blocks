<?php
/*
Plugin Name: Kenzap Stats
Description: Extend your website with counters, countdowns, bars and other statistical elements.
Author: Kenzap
Version: 1.0.0
Author URI: https://kenzap.com
License: GPL2+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
Text Domain: kenzap-stats
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define("KENZAP_STATS", __DIR__);

//Check plugin requirements
if ( version_compare(PHP_VERSION, '5.6', '<') || !function_exists('register_block_type') ) {
    if (! function_exists('kenzap_stats_disable_plugin')) {
        /**
         * Disable plugin
         *
         * @return void
         */
        function kenzap_stats_disable_plugin(){

            if (current_user_can('activate_plugins') && is_plugin_active(plugin_basename(__FILE__))) {
                deactivate_plugins(__FILE__);
                unset($_GET['activate']);
            }
        }
    }

    if (! function_exists('kenzap_stats_show_error')) {
        /**
         * Show error
         *
         * @return void
         */
        function kenzap_stats_show_error(){

            echo '<div class="error"><p><strong>Kenzap stats</strong> needs at least PHP 5.6 version and WordPress 5.0, please update before installing the plugin.</p></div>';
        }
	}
	
    //Add actions
    add_action('admin_init', 'kenzap_stats_disable_plugin');
    add_action('admin_notices', 'kenzap_stats_show_error');

    //Do not load anything more
    return;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
