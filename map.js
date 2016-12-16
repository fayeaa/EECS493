
var map;
var input;
var searchBox;

$(document).ready( function() {
	console.log("sanity check")
	
});


function initMap() {
      var north = {lat: 42.292, lng: -83.716};
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: north
      });
      // var marker = new google.maps.Marker({
      //   position: north,
      //   map: map
      // });
      // Create the search box and link it to the UI element.
      input = document.getElementById('pac-input');
      searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

      var markers = [];
      // [START region_getplaces]
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
      return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
      marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        //console.log(place);
      var icon = {
        url: 'um_marker.png',
        size: new google.maps.Size(80, 128),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 48)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
     });
     map.fitBounds(bounds);
    });

  }
