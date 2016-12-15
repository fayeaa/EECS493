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
    console.log($scope.numEvent);
    $scope.searchMap=function(place){
        //$scope.isActive = !$scope.isActive;
        console.log(place);
        eventPlace = place + ', Ann Arbor, MI';
        console.log(eventPlace);
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        geocoder.geocode( { 'address': eventPlace }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon2,
                    position: results[0].geometry.location
                }));
            } else {
                alert('Geocoder was not successful: ' + status);
            }
        });
    }
    $scope.addPopularity=function(popularity){
        $scope.newpopularity = parseInt(popularity) + 1;
        console.log($scope.newpopularity);
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

// added geolocation for geocoder's search
// add future ones with the help of google map
var recent_event = [
    {
        "name": "Umix",
        "disc": "Enjoy Harry Potter themed games and crafts",
        "place": "Michigan Union, Grand Ballroom",
        "geolocation": "530 S State St, Ann Arbor, MI 48109",
        "date": "Friday, November 6th",
        "time": "9pm-11pm",
        "category": "entertainment",
        "popularity": "89"
    },
    {
        "name": "G-Men Concert",
        "disc": "Michigan's finest men's acappella group live",
        "place": "Rackham Auditorium",
        "geolocation": "915 E Washington St, Ann Arbor, MI 48109",
        "date": "Saturday, November 7th",
        "time": "6:30pm-8pm",
        "category": "music",
        "popularity": "51"

    },
    {
        "name": "TedX U of M",
        "disc": "Hear great speakers share their stories",
        "place": "Hill Auditorium",
        "geolocation": "825 N University Ave, Ann Arbor, MI 48109",
        "date": "Thursday, November 12th",
        "time": "4pm-9pm",
        "category": "academic",
        "popularity": "32"
    },
    {
        "name": "Men's Basketball",
        "disc": "Woverines take on the bobcats at home",
        "place": "Crisler Arena",
        "geolocation": "333 E Stadium Blvd, Ann Arbor, MI 48109",
        "date": "Thursday, November 12th",
        "time": "7pm-9pm",
        "category": "sports",
        "popularity": "64"
    }
];

$(document).ready( function() {
    console.log("sanity check");
    //$("#welcome").animate({height:'800px',opacity:'0.2'},"slow")
    //$("#welcome").fadeOut(3000);
    $("#welcome").animate({width:'0px',opacity:'0'},3000);
});

var placesInfo = {
    "2281 Bonisteel Blvd, Ann Arbor, MI 48109, USA" : {
        "events" : ["Microsoft Resume Critique: November 14th, 12pm-3pm",
        "Startup Career Fair: November 15th, 10am-4pm",
        "Engineering Global Leaders Seminar: November 18th, 2pm-3pm"]
    },
    "2101 Bonisteel Blvd, Ann Arbor, MI 48109, USA" : {
        "events" : ["Center for Student Affairs Breakfast: November 12th, 10am-12pm",
        "Giving Blue Day: November 29th, 10am-4pm",
        "Poster Sale: December 2nd, 9am-5pm"]
    }
}

function getPlaceInfo(address) {
    console.log(address)
    console.log(typeof(address))
    console.log(address == "2281 Bonisteel Blvd, Ann Arbor, MI 48109, USA")
    try {
        var events_arr = placesInfo[address];

        console.log(events_arr)
        console.log(typeof(events_arr))
        var events = events_arr.join('\n');
        // var events = ""
        // for(i = 0; i < events_arr.length; i++) {
        //     console.llg(events_arr[i])
        //     events += events_arr[i] + '\n'
        // }
    }
    catch (e) {
        // statements to handle any exceptions
        console.log(e); // pass exception object to error handler
    }
    return events;
}

// Globals for the map because idgaf about style
var gmarkers = [];

function initMap() {
    var north = {lat: 42.292, lng: -83.716};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: north
    });

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    google.maps.event.addListener(map, 'click', function(event) {
        console.log("YELLOWWWWWW")
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log(latitude, longitude)
        var latlng = {lat: latitude, lng: longitude}

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    gmarkers.push(marker);
                    console.log("*******", results)
                    var events = getPlaceInfo(results[0].formatted_address)
                    console.log("========", events)
                    infowindow.setContent(events);
                    infowindow.open(map, marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });

        for (i = 0; i < gmarkers.length; i++) {
            gmarkers[i].setMap(null);
        }
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
                    icon: icon1,
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
        }
