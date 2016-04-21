<?php
function map_categories_box() {
  if(basename(get_page_template()) != 'template-location.php') {
    return;
  }
	$screens = array( 'page' );
	foreach ( $screens as $screen ) {
		add_meta_box(
			'map_categories_box',
			"Map Categories",
			'map_categories_callback',
			$screen,
      'side'
		);
	}
}
add_action( 'add_meta_boxes', 'map_categories_box' );
function map_categories_callback( $post ) {
	// Add a nonce field so we can check for it later.
	wp_nonce_field( 'map_categories_data', 'map_categories_nonce' );
  ?>
  <div id="categories-component"></div>

  <?php

}


?>
