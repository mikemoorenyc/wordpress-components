<div id="points-component"></div>
<div id="gmap-container"style="display:none;">
  <div id="theMap" >
    <div id="mapConnector" style="position:absolute; left: 0; top:0; width:100%; height:100%;"></div>

    <div id="search-holder">
      <input type="text" id="search-input" placeholder="Search for a place or address..." />
    </div>

  </div>

</div>
<?php
$cats = get_post_meta( $post->ID, 'map_categories', true );



if(empty($cats)) {
  $cats = "[{id: 1,name: 'Restaurants',color: '#cc0000',}]";
}
$points = get_post_meta( $post->ID, 'map_points', true );

if(empty($points)) {
  $points = '[]';
}

?>


<script>
var APP = {};
var INITIALPOINTS = <?php echo $points;?>;
var SITEDIRECTORY = '<?php echo get_bloginfo('template_url');?>';
var INITIALCATEGORIES = <?php echo $cats;?>;
var PENICON = '<svg  viewBox="0 0 528.899 528.899"><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981   c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611   C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069   L27.473,390.597L0.3,512.69z" fill="#FFFFFF"/></svg>';

</script>
<!--
<script>
window.onbeforeunload = function(){
    var mce = typeof(tinyMCE) != 'undefined' ? tinyMCE.activeEditor : false, title, content;

    if ( mce && !mce.isHidden() ) {
        if ( mce.isDirty() )
            return autosaveL10n.saveAlert;
    } else {
        title = $('#post #title').val(), content = $('#post #content').val();
        if ( ( title || content ) && title + content != autosaveLast )
            return autosaveL10n.saveAlert;
    }

};

</script>-->
