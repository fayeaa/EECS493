
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
      console.log($scope.mapSearchbox);


  }
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
