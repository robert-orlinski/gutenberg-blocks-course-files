<?php

/**
 * Plugin Name:     Spis treści
 * Description:     Wtyczka, dodająca spis treści do bloków Gutenberga
 * Version:         1.0.1
 */

function add_gutenberg_assets() {

  wp_register_script(
    'table-of-contents',
    plugin_dir_url( __FILE__ ) . 'build/index.js',
    array( 'wp-blocks' )
  );

  register_block_type( 'rob/table-of-contents', array(
    'editor_script' => 'table-of-contents'
  ) );

}
add_action( 'init', 'add_gutenberg_assets' );