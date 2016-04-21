





var center = new google.maps.LatLng(40.7067279,-74.0397625);
  var mapOptions = {
    zoom: 15,
    center: center,
    disableDefaultUI: true,
    zoomControl: true
  };

var map = new google.maps.Map(document.getElementById('mapConnector'),
mapOptions);

var searchBox = new google.maps.places.SearchBox(document.getElementById('search-input'));

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
searchBox.setBounds(map.getBounds());
});



$( "#search-input" ).keydown(function(event){
if (event.keyCode == 13) {
//  searchFetcher();
  return false;
}

});

var marker = new google.maps.Marker({
position: center,
map: map,
draggable:true,
title:"Drag me!"
});
