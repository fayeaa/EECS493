var map;
var input;
var searchBox;
var test1;
var test2;
var markers = [];
var markers1 = [];
var eventPlace;
var eventName;
var image;


var app = angular.module('EventOnCampus', []);
app.controller('ListEvent',function($scope){
    $scope.UMevents = recent_event;
    $scope.numEvent = function(){
    	return $scope.numEvents.length;
    }
    $scope.category = ["", "entertainment", "music", "sports", "academic"];
    console.log("1");
    console.log($scope.numEvent);
    $scope.searchMap=function(place, name){
      //$scope.isActive = !$scope.isActive;
      eventPlace = place + ', Ann Arbor, MI';
      console.log(eventPlace);
      eventName = name;
      console.log(eventName);
      }
     $scope.addPopularity=function(event){
        event.popularity = parseInt(event.popularity) + 1;
    }

    $scope.removePopularity=function(event){
        event.popularity = parseInt(event.popularity) - 1;
    }

});
app.controller('mapCtrl',function($scope,$interval){
    $scope.placeTitle=test1;
    $scope.placePosition=test2;
    $scope.image=image;
    $interval(function () {
        $scope.placeTitle = test1;
        $scope.placePosition=test2;
        $scope.image=image;
    }, 100);

});






var recent_event = [
{
  "name": "Umix",
  "disc": "Enjoy Harry Potter themed games and crafts",
  "place": "Michigan Union, Grand Ballroom",
  "geolocation": "530 S State St, Ann Arbor, MI 48109",
  "date": "Friday, November 6th",
  "time": "9pm-11pm",
  "category": "entertainment",
  "popularity": 89
},
{
  "name": "G-Men Concert",
  "disc": "Michigan's finest men's acappella group live",
  "place": "Rackham Auditorium",
  "geolocation": "915 E Washington St, Ann Arbor, MI 48109",
  "date": "Saturday, November 7th",
  "time": "6:30pm-8pm",
  "category": "music",
  "popularity": 51

},
{
  "name": "TedX U of M",
  "disc": "Hear great speakers share their stories",
  "place": "Hill Auditorium",
  "geolocation": "825 N University Ave, Ann Arbor, MI 48109",
  "date": "Thursday, November 12th",
  "time": "4pm-9pm",
  "category": "academic",
  "popularity": 32
},
{
  "name": "Men's Basketball",
  "disc": "Woverines take on the bobcats at home",
  "place": "Crisler Arena",
  "geolocation": "333 E Stadium Blvd, Ann Arbor, MI 48109",
  "date": "Thursday, November 12th",
  "time": "7pm-9pm",
  "category": "sports",
  "popularity": 64
}
];


$(document).ready( function() {
	console.log("sanity check");
    $("#welcome").click(function(){
      $("#welcome").animate({width:'0px',opacity:'0'},1000);
      $("#logo").fadeOut(1000);
    });
    $("#logo").click(function(){
      $("#welcome").animate({width:'0px',opacity:'0'},1000);
      $("#logo").fadeOut(1000);

    });
});


function initMap() {
      var north = {lat: 42.292, lng: -83.716};
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: north
      });

      var geocoder = new google.maps.Geocoder();

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
        var name = eventName;
        console.log(location);
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];
        geocoder.geocode( { 'address': location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            console.log(location);
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: name,
                position: results[0].geometry.location
            }));
            test1=markers[0].title;
            test2=markers[0].position;
        } else {
          alert('Geocoder was not successful: ' + status);
        }
        google.maps.event.addListener(markers[0], 'click', function() {
          //infowindow.open(map,markers[0]);
          $('#myModal').modal('show');
              var params = {
                  // Request parameters
                  "q": test1,
              };
              $.ajax({
                  url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
                  beforeSend: function(xhrObj){
                      // Request headers
                      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8263147847314cc68299981abf02a257");
                  },
                  type: "GET",
                  // Request body
                  data: "{body}",
              })
              .done(function(data) {
                image=data.value[0].contentUrl;
                  //alert("success");
              })
              .fail(function() {
                  //alert("error");
              });
        });
      });

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
              var params = {
                  // Request parameters
                  "q": test1,
              };

              $.ajax({
                  url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
                  beforeSend: function(xhrObj){
                      // Request headers
                      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8263147847314cc68299981abf02a257");
                  },
                  type: "GET",
                  // Request body
                  data: "{body}",
              })
              .done(function(data) {
                image=data.value[0].contentUrl;
                  //alert("success");
              })
              .fail(function() {
                  //alert("error");
              });
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
