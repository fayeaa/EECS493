console.log("sanity check")
var app = angular.module("myApp", []);
$(document).ready(function(){
  initMap() ;
  $('#central_switch').click(function(){
      centralMap();

      });


  });


function initMap() {
  var north = {lat: 42.292, lng: -83.716};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: north
  });
};
function centralMap() {
  var north = {lat: 30.292, lng: -83.716};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: north
  });
};
