<?php

/**
 * Plugin Name:     Spis treści
 * Description:     Wtyczka, dodająca spis treści do bloków Gutenberga
 * Version:         1.0.1
 */

function add_gutenberg_assets() {

  wp_register_script(
    'table-of-contents',
    plugin_dir_url(__FILE__) . 'build/index.js',
    array('wp-blocks', 'wp-editor', 'wp-components')
  );

  wp_register_style(
    'table-of-contents-style',
    plugin_dir_url(__FILE__) . 'build/index.css'
  );

  register_block_type('rob/table-of-contents', array(
    'editor_script' => 'table-of-contents',
    'editor_style'  => 'table-of-contents-style',
    'style'         => 'table-of-contents-style',
  ));

}
add_action('init', 'add_gutenberg_assets');

function custom_blocks_block_categories($categories) {
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'content',
        'title' => __('Zawartść', 'table-of-contents'),
      ),
    )
  );
}
add_filter('block_categories', 'custom_blocks_block_categories', 10, 2);
