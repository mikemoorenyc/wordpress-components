<?php
//MAKE THE THING
//PROPERTY
$propargs = array(
  'label' => 'Files',
  'public' => false,
  'labels' => array(
    'add_new_item' => 'Add New File',
    'name' => 'Files',
    'edit_item' => 'Edit File',
    'search_items' => 'Search Files',
    'not_found' => 'No files Found.',
    'all_items' => 'All Files'
  ),
  'show_ui' => true,
  'capability_type' => 'page',
  'hierarchical' => true,
  'has_archive' => false,
  'rewrite' => array('slug' => 'file'),
  'query_var' => true,
  'menu_icon' => 'dashicons-media-text',
  'supports' => array(
      'title',
      'revisions',
      'thumbnail'  
    )
  );
register_post_type( 'file', $propargs );

//PROPERTY GROUPS
$region_labels = array(
    'name' => _x( 'Property Groups', 'taxonomy general name' ),
    'singular_name' => _x( 'Property Group', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Property Groups' ),
    'all_items' => __( 'All Property Groups' ),
    'parent_item' => __( 'Property Group' ),
    'parent_item_colon' => __( 'Property Group:' ),
    'edit_item' => __( 'Edit Property Group' ),
    'update_item' => __( 'Update Property Group' ),
    'add_new_item' => __( 'Add New Property Group' ),
    'new_item_name' => __( 'New Property Group Name' ),
    'menu_name' => __( 'Property Groups' ),
  );
  register_taxonomy('pgroup',array('file'), array(
    'hierarchical' => true,
    'labels' => $region_labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array( 'slug' => 'pgroup' ),
  ));

include 'metabox.php';
include 'user-checkoff.php';
include 'saving-function.php';
 ?>
