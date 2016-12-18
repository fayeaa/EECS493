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
        "Engineering Global Leaders Seminar: November 18th, 2pm-3pm"],
        "title" : "Duderstadt Center",
        "blurb" : "The James and Anne Duderstadt Center, formerly known as the Media Union, opened in 1996 as a special place to provide faculty and students with the tools and collaborative space for creating the future. Located on the University of Michigan North Campus, the Duderstadt Center houses the Art, Architecture, and Engineering Library, the College of Engineering Computer Aided Engineering Network (CAEN), the Digital Media Commons, and the Millennium Project, the building provides a nexus for creative and technological innovation across disciplines."
    },
    "2101 Bonisteel Blvd, Ann Arbor, MI 48109, USA" : {
        "events" : ["Center for Student Affairs Breakfast: November 12th, 10am-12pm",
        "Giving Blue Day: November 29th, 10am-4pm",
        "Poster Sale: December 2nd, 9am-5pm"],
        "title" : "Pierpont Commons",
        "blurb": "Pierpont Commons is the University of Michigan's student union on North Campus. Pierpont hosts a wide range of student services nestled between inviting lounges to relax and entertain. A wide range of services can be found there including a U-M Credit Union, ATMs, a bookstore, a convenience store, and a variety of food choices. With its unique location, Pierpont  is a great way to escape the bustle of Central Campus and downtown Ann Arbor. It is not uncommon to spot wildlife among the North Campus neighborhood! Through its staff, events, and partnerships, Pierpont Commons creates an environment where students can learn and unwind in an area far from home."
    },
    "1290 Murfin Ave, Ann Arbor, MI 48109, USA" : {
        "events" : ["Center for Student Affairs Breakfast: November 12th, 10am-12pm",
        "Giving Blue Day: November 29th, 10am-4pm",
        "Poster Sale: December 2nd, 9am-5pm"],
        "title" : "Pierpont Commons",
        "blurb": "Pierpont Commons is the University of Michigan's student union on North Campus. Pierpont hosts a wide range of student services nestled between inviting lounges to relax and entertain. A wide range of services can be found there including a U-M Credit Union, ATMs, a bookstore, a convenience store, and a variety of food choices. With its unique location, Pierpont  is a great way to escape the bustle of Central Campus and downtown Ann Arbor. It is not uncommon to spot wildlife among the North Campus neighborhood! Through its staff, events, and partnerships, Pierpont Commons creates an environment where students can learn and unwind in an area far from home."
    }
}

/* Open when someone clicks on the span element */
function openNav(title, blurb, events) {
    console.log("opening navigation", title, blurb, events);
    document.getElementById("overlayContentTitle").innerHTML = "<li>"+title+"</li>"
    document.getElementById("overlayContentBlurb").innerHTML = "<li>"+blurb+"</li>";
    var contentBody = ""
    for(i=0; i < events.length; i++) {
        contentBody += "<li>" + events[i] + "</li>";
    }
    document.getElementById("overlayContentBody").innerHTML = contentBody;
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
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
                    console.log(results)
                    var address = results[0].formatted_address;
                    console.log(address)
                    gmarkers.push(marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
            // info for navigation
            try {
                var events_arr = placesInfo[address]["events"];
                var title = placesInfo[address]["title"];
                var blurb = placesInfo[address]["blurb"];
                openNav(title, blurb, events_arr);
            }
            catch (e) {
                console.log(e);
            }
        });

        for (i = 0; i < gmarkers.length; i++) {
            gmarkers[i].setMap(null);
        }
    });

    //  Modified to global
    icon = {
        url: 'um_marker.png',
        size: new google.maps.Size(80, 128),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 54),//  Modified from 34 to 54 for better view
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
