<?php
/**
 * Template Name: Files
 */
?>


<?php include 'header.php'; ?>

<div id="files-list" class="no-style">
<?php
$args = array(
    'post_type' 		=> 'file',
    'orderby' 			=> 'date',
    'order' 			=> 'DESC',
    'posts_per_page' => -1
  );
$files_in_cat_query = new WP_Query($args);
if ( $files_in_cat_query->have_posts() ) {
$files = $files_in_cat_query->get_posts();
foreach($files as $f) {
  $finfo = json_decode(get_post_meta($f->ID, 'file_info', true));
  $cats = get_the_terms($f->ID, 'pgroup');
  if(has_post_thumbnail($f->ID) ) {

    $imgSrc = wp_get_attachment_image_src(get_post_thumbnail_id($f->ID), 'medium', false);
    $imgSrc = $imgSrc[0];
    $img = 'style=" background-image:url('.$imgSrc.');"';
    $imgClass = 'with-img';
  } else {
    $img = 'style="background-color: '.$finfo->color.'"';
    $imgClass="no-img";
  }
  ?>

<div>
  <div class="content">
  <div class="header-img <?php echo $imgClass;?>" <?php echo $img;?>>

    <?php

    if($imgClass == 'no-img') {
      ?>
      <svg class="file-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#business"></use>
      </svg>
      <?php
    }
    ?>

    <div class="ext">
      .<?php echo pathinfo($finfo->filename, PATHINFO_EXTENSION);?>
    </div>
    <div class="download-overlay">
      <div class="inner">
        <svg class="dl-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow"></use>
        </svg>
        <span class="title">Download <?php echo $finfo->filename;?></span>
      </div>

    </div>

  </div>
  <div class="bottom-info">
    <div class="title"><?php echo $f->post_title;?> </div>
    <?php
    if(!empty($cats)) {
      ?>
      <ul class="pgroups no-style">
        <?php
        foreach($cats as $c) {
          ?>
          <li>

              <?php echo $c->name;?>


          </li>

          <?php
        }


        ?>

      </ul>
      <?php
    }
    ?>
  </div>
  <div class="footer">
    <span class="date">
      <?php echo get_the_date('M. j, Y', $f->ID);?>
    </span>
    <span class="favorite-link">

      <svg class="favorite">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#favorite"></use>
      </svg>
    </span>
  </div>
</div>



</div>

  <?php
}

}


 ?>



</div>

<?php include 'footer.php'; ?>
