<?php declare( strict_types = 1 );

/**
 * Plugin Name: HubSpot Form
 * Plugin URI: https://github.com/PiotrPress/wordpress-hubspot-form
 * Description: This WordPress plugin adds a HubSpot Form block which allows you to embed HubSpot forms.
 * Version: 0.1.1
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Piotr Niewiadomski
 * Author URI: https://piotr.press
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: piotrpress-hubspot-form
 * Domain Path: /languages
 * Update URI: false
 */

defined( 'ABSPATH' ) or exit;

add_action( 'enqueue_block_editor_assets', function() {
    wp_register_script( 'piotrpress-hubspot-form-block', plugins_url( 'block.js', __FILE__ ), [
        'piotrpress-hubspot-form',
        'wp-blocks',
        'wp-element',
        'wp-editor'
    ], null );
} );

add_action( 'init', function() {
    wp_register_script( 'piotrpress-hubspot-form', '//js.hsforms.net/forms/embed/v2.js', [], null );
    register_block_type( 'piotrpress/hubspot-form', [
        'api_version' => 3,
        'version' => '0.1.1',
        'title' => __( 'HubSpot Form', 'piotrpress-hubspot-form' ),
        'category' => 'text',
        'attributes' => [
            'portalId' => [ 'type' => 'string' ],
            'formId' => [ 'type' => 'string' ]
        ],
        'textdomain' => 'piotrpress-hubspot-form',
        'editor_script_handles' => [ 'piotrpress-hubspot-form-block' ],
        'script_handles' => [ 'piotrpress-hubspot-form' ]
    ] );
} );