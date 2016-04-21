<?php
add_action( 'show_user_profile', 'pgroups_off' );
add_action( 'edit_user_profile', 'pgroups_off' );
function pgroups_off( $user ) { ?>




<style>
ul#group-list {
  margin:5px 0 0 0;
}
ul#group-list > li {
  display:inline-block;
  width:24.5%;
  vertical-align: top;
  margin: 0;
  box-sizing: border-box;
  padding: 0 0 10px 15px;
}
ul#group-list > li:nth-child(4n+1) {
  padding-left:0;
}


</style>


  <table class="form-table">
<tbody><tr >
	<th><label for="_super_user">Associated Property Groups</label></th>
	<td>
    <?php

      $groups = get_terms( 'pgroup' ,array('hide_empty'=>false));

      $userG =explode(",", get_the_author_meta( '_pgroups', $user->ID ));
      if(empty($userG)) {
        $userGString = '';

      } else {
        $userGString = get_the_author_meta( '_pgroups', $user->ID );
      }
      echo '<ul id="group-list">';
      foreach($groups as $g) {
        if(in_array($g->term_id, $userG) ) {
          $checked = 'checked';
        } else {
          $checked = '';
        }
        ?>
        <li>

          <div class="label-block">
            <input <?php echo $checked;?> type="checkbox" id="value-<?php echo $g->term_id;?>"name="value-<?php echo $g->term_id;?>" value="<?php echo $g->term_id;?>">
            <label for='value-<?php echo $g->term_id;?>'>

              <?php echo $g->name;?>
            </label>
          </div>
        </li>
        <?php
      }
      echo '</ul>';

     ?>
     <input type="hidden" id="pgroups_input" name="_pgroups" value="<?php echo $userGString;?>"/>
		</td>
</tr>


</tbody></table>
<script>
jQuery(document).ready(function($){
  $('#group-list li input[type="checkbox"]').on('change',function(){

    var newVal = '';
    var iterator = 0;
    $('#group-list li input[type="checkbox"]:checked').each(function(index,e){
      var comma = ''
      if(index > 0) {
        var comma = ',';
      }
      newVal = newVal+comma+$(this).val();
    });
    $('input#pgroups_input').val(newVal);
  });
});
</script>
<?php }
add_action( 'personal_options_update', 'save_pgroup_off' );
add_action( 'edit_user_profile_update', 'save_pgroup_off' );
function save_pgroup_off( $user_id ) {
	if ( !current_user_can( 'edit_user', $user_id ) )
		return false;
	/* Copy and paste this line for additional fields. Make sure to change 'twitter' to the field ID. */
	update_usermeta( $user_id, '_pgroups', $_POST['_pgroups'] );
}
