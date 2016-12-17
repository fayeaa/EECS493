
var map;
var input;
var searchBox;
var test1;
var test2;
var markers = [];
var markers1 = [];
var eventPlace;

var app = angular.module('EventOnCampus', []);
app.controller('ListEvent',function($scope){
    $scope.UMevents = recent_event;
    $scope.numEvent = function(){
    	return $scope.numEvents.length;
    }
    $scope.category = ["", "entertainment", "music", "sports", "academic"];
    console.log("1");
    console.log($scope.numEvent);
    $scope.searchMap=function(place){
      //$scope.isActive = !$scope.isActive;
      console.log(place);
      eventPlace = place;
      console.log(eventPlace);
      }

});
app.controller('mapCtrl',function($scope,$interval){
    $scope.placeTitle=test1;
    $scope.placePosition=test2;
    $interval(function () {
        $scope.placeTitle = test1;
        $scope.placePosition=test2;
    }, 100);
});


var recent_event = [
{
	"name": "Umix",
	"disc": "Enjoy Harry Potter themed games and crafts",
	"place": "Michigan Union, Grand Ballroom",
	"date": "Friday, November 6th",
	"time": "9pm-11pm",
	"category": "entertainment"
},
{
	"name": "G-Men Concert",
	"disc": "Michigan's finest men's acappella group live",
	"place": "Rackham Auditorium",
	"date": "Saturday, November 7th",
	"time": "6:30pm-8pm",
	"category": "music"
},
{
	"name": "TedX U of M",
	"disc": "Hear great speakers share their stories",
	"place": "Hill Auditorium",
	"date": "Thursday, November 12th",
	"time": "4pm-9pm",
	"category": "academic"
},
{
	"name": "Men's Basketball",
	"disc": "Woverines take on the bobcats at home",
	"place": "Crisier Arena",
	"date": "Thursday, November 12th",
	"time": "7pm-9pm",
	"category": "sports"
}
];


$(document).ready( function() {
	console.log("sanity check");


});


function initMap() {
      var north = {lat: 42.292, lng: -83.716};
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: north
      });



      google.maps.event.addListener(map, 'click', function(event) {
        markers1.forEach(function(marker) {
        marker.setMap(null);
        });
        markers1.push(new google.maps.Marker({
          map: map,
          icon: icon,
          position: event.latLng,
        }));
      });

      var icon = {
        url: 'um_marker.png',
        size: new google.maps.Size(80, 128),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 48)
      };







      // Create the search box and link it to the UI element.
      input = document.getElementById('pac-input');
      //click event
      var button = document.getElementById('list');
      console.log(button);
      button.onclick = function () {
        var location = eventPlace;
        console.log(location);

      };
      //searchBox
      searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });


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

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      //show pop-out window
      test1=markers[0].title;
      test2=markers[0].position;

      var infowindow = new google.maps.InfoWindow({
        content:markers[0].title,
        position: place.geometry.location
        });

        google.maps.event.addListener(markers[0], 'click', function() {
          infowindow.open(map,markers[0]);
          $('#myModal').modal('show');

        });

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
