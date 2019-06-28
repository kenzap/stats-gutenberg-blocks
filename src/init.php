<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kenzap_stats_list_init() {
    $locale = is_admin() && function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
    $locale = apply_filters( 'plugin_locale', $locale, 'kenzap-stats' );

    unload_textdomain( 'kenzap-stats' );
    load_textdomain( 'kenzap-stats', __DIR__ . '/languages/kenzap-stats-' . $locale . '.mo' );
    load_plugin_textdomain( 'kenzap-stats', false, __DIR__ . '/languages' );
}
add_action( 'init', 'kenzap_stats_list_init' );

//Load body class
function kenzap_stats_list_body_class( $classes ) {

	if ( is_array($classes) ){ $classes[] = 'kenzap'; }else{ $classes.=' kenzap'; }
	return $classes;
}
add_filter( 'body_class', 'kenzap_stats_list_body_class' );
add_filter( 'admin_body_class', 'kenzap_stats_list_body_class' );

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function kenzap_stats_list_block_assets() {
	// Styles.
	wp_enqueue_style(
		'kenzap_stats_list_style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array()
	);

}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'kenzap_stats_list_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function kenzap_stats_list_editor_assets() {

    $pathToPlugin = plugins_url( 'dist/', dirname( __FILE__ ) );

    // stats 1
    wp_register_script( 'countdown', $pathToPlugin . 'countdown/jquery.countdown.min.js', array('jquery'));
    wp_enqueue_script( 'countdown' );
    wp_enqueue_script( 'kenzap/stats-1', plugins_url( 'stats-1/script.js', __FILE__ ), array('jquery') );

    // stats 3
    wp_register_script( 'circle', $pathToPlugin . 'circle/circle-progress.min.js', array('jquery'));
    wp_enqueue_script( 'circle' );
    wp_enqueue_script( 'kenzap/stats-3', plugins_url( 'stats-3/script.js', __FILE__ ), array('jquery') );
    
    // stats 4
    wp_enqueue_script( 'kenzap/stats-4', plugins_url( 'stats-4/script.js', __FILE__ ), array('jquery') );

	// Scripts.
	wp_enqueue_script(
		'kenzap-stats', // Handle.
		plugins_url( 'dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ), // Dependencies, defined above.
        // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'kenzap-stats', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
    );
    
    // This is only available in WP5.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'kenzap-stats', 'kenzap-stats', KENZAP_STATS . '/languages/' );
	}

    wp_add_inline_script( 'wp-blocks', 'var kenzap_stats_gutenberg_path = "' .wp_parse_url($pathToPlugin)['path'].'"', 'before');

} // End function kenzap_feature_list_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'kenzap_stats_list_editor_assets' );

function kenzap_stats_add_specific_features( $post_object ) {
    if(!function_exists('has_blocks') || !function_exists('parse_blocks'))
        return;

    if ( has_blocks( $post_object ) ) {
        $pathToPlugin = plugins_url( 'dist/', dirname( __FILE__ ) );
        $blocks = parse_blocks( $post_object ->post_content );
        foreach ($blocks as $block) {

            if ($block['blockName'] == 'kenzap/stats-1') {

                wp_register_script( 'countdown', $pathToPlugin . 'countdown/jquery.countdown.min.js');
                wp_enqueue_script( 'countdown' );
                wp_enqueue_script( 'kenzap/stats-1', plugins_url( 'stats-1/script.js', __FILE__ ), array('jquery') );
            }

            if ($block['blockName'] == 'kenzap/stats-2') {

                wp_register_script( 'waypoints', $pathToPlugin . 'counter/waypoints.min.js', array('jquery'));
                wp_enqueue_script( 'waypoints' );
                wp_register_script( 'counterup', $pathToPlugin . 'counter/jquery.counterup.min.js', array('jquery'));
                wp_enqueue_script( 'counterup' );
                wp_enqueue_script( 'kenzap/stats-2', plugins_url( 'stats-2/script.js', __FILE__ ), array('jquery') );
            }

            if ($block['blockName'] == 'kenzap/stats-3') {

                wp_register_script( 'circle', $pathToPlugin . 'circle/circle-progress.min.js', array('jquery'));
                wp_enqueue_script( 'circle' );
                wp_enqueue_script( 'kenzap/stats-3', plugins_url( 'stats-3/script.js', __FILE__ ), array('jquery') );
            }

            if ($block['blockName'] == 'kenzap/stats-4') {

                wp_enqueue_script( 'kenzap/stats-4', plugins_url( 'stats-4/script.js', __FILE__ ), array('jquery') );
            }
        }
    }
}
add_action( 'the_post', 'kenzap_stats_add_specific_features' );

