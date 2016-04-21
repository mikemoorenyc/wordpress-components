<?php

require_once('../../../../wp-blog-header.php');



$fileAllowed = true;
if(0 < $_FILES['file']['error'] || empty($_FILES)) {
  $fileAllowed = false;
}
if(!is_user_logged_in ()) {
  $fileAllowed = false;
}
if(!$_POST['id']) {
  $fileAllowed = false;
}


if($fileAllowed) {
  $path = "../../../files/".$_POST['id'];
  if ( ! is_dir($path)) {
    mkdir($path);
  }


  if(move_uploaded_file($_FILES["file"]["tmp_name"], $path.'/file.txt')){
    header('Content-Type: application/json',true,200);
    //GENERATE RANDOM COLOR
    function random_color_part() {
    return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
    }

    function random_color() {
      return random_color_part() . random_color_part() . random_color_part();
    }
    $file_info = array(
      'id' => $_POST['id'],
      'filename' => $_FILES["file"]['name'],
      'color' => '#'.random_color()
    );
    file_put_contents($path.'/info.json', json_encode($file_info));
    echo json_encode($file_info);
    exit();

  } else {
    var_dump($_FILES['file']);
    echo 'couldnt move';
    echo $_FILES["file"]["tmp_name"];
    echo $_POST['id'];
  }
} else {
  http_response_code(500);
  exit();
}

 ?>
