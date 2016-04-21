<?php
function map_save_meta_box_data( $post_id ) {
	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */
	// Check if our nonce is set.
	if ( ! isset( $_POST['map_categories_nonce'] ) ) {
		return;
	}
	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['map_categories_nonce'], 'map_categories_data' ) ) {
		return;
	}
	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {
		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}
	} else {
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}
	/* OK, it's safe for us to save the data now. */
	// Make sure that it is set.
	if ( ! isset( $_POST['category_data'] ) ) {
		return;
	} else {
    // Sanitize user input.
  	$my_data = sanitize_text_field( $_POST['category_data'] );
    // Update the meta field in the database.
  	update_post_meta( $post_id, 'map_categories', $my_data );
  }

}

//POINTS
function map_points_save_data( $post_id ) {
	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */
	// Check if our nonce is set.
	if ( ! isset( $_POST['map_points_nonce'] ) ) {
		return;
	}
	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['map_points_nonce'], 'map_points_data' ) ) {
		return;
	}
	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {
		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}
	} else {
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}
	/* OK, it's safe for us to save the data now. */
	// Make sure that it is set.
	if ( ! isset( $_POST['map_data'] ) ) {
		return;
	} else {
    // Sanitize user input.
  	$my_data = sanitize_text_field( $_POST['map_data'] );
    // Update the meta field in the database.
  	update_post_meta( $post_id, 'map_points', $my_data );
  }

}
add_action( 'save_post', 'map_points_save_data' );

add_action( 'save_post', 'map_save_meta_box_data' );

?>
