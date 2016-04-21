<?php
function save_file_data( $post_id ) {
	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */
	// Check if our nonce is set.
	if ( ! isset( $_POST['file_nonce'] ) ) {
		return;
	}
	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['file_nonce'], 'file_data' ) ) {
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

  //SAVE FILE INFO
	if ( ! isset( $_POST['file_info'] ) ) {
		return;
	} else {
    // Sanitize user input.
  	$my_data = sanitize_text_field( $_POST['file_info'] );
    // Update the meta field in the database.
  	update_post_meta( $post_id, 'file_info', $my_data );
  }

	//SAVE SELECTED USER GROUPS
	if ( ! isset( $_POST['selected_user_group'] ) ) {
		return;
	} else {
    // Sanitize user input.
		//DELETE ALL users
		delete_post_meta($post_id, 'selected_users');
		$users = sanitize_text_field( $_POST['selected_user_group'] );
		$users = str_replace('[','', $users);
		$users = str_replace(']','', $users);
		$users = explode(',',$users);

		foreach($users as $u) {
			add_post_meta($post_id,'selected_users', intval($u), false);
		}


    // Update the meta field in the database.
  	//update_post_meta( $post_id, 'selected_users', $users );
  }

}

add_action( 'save_post', 'save_file_data' );



?>
