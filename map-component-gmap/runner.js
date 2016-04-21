jQuery(document).ready(function($){
/*
  $.ajax({
    method: 'GET',
    url: SVGLOCATION,
    dataType: 'html',
    async: true
  })
  .done(function(data){


    $('body').prepend('<div class="hide">'+data+'</div>');
  });
*/

  ReactDOM.render(
    <PointsComponent />,
    document.getElementById('points-component')
  );

  ReactDOM.render(
    <CategoriesComponent />,
    document.getElementById('categories-component')
  );


});
