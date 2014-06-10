'use strict';

angular.module('findyourfriendsApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
var socket = io();
    // $http.get('/api/awesomeThings').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    // });
$scope.find =""
$scope.greeting = 'Hello'
// $scope.details;
$scope.location;
var markersArray = [];

$scope.message = '';
$scope.messageLog = ['hello', 'test2', 'message 3'];
$scope.sendMessage = function () {
  // console.log($scope.message);
  // $scope.messageLog.push($scope.message);
  var message = $scope.message;

  $http.post('/message', {msg: $scope.message}).success(function(msg) {
    console.log(msg);
    socket.emit('message', {msg: $scope.message});

  })
}

    socket.on('message', function (msg) {
      console.log(msg);
      $scope.$apply(function() {
        $scope.messageLog.push(msg);
      })

    });


          var style_array= [
    {
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": 100
            },
            {
                "hue": "#00ffe6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 100
            },
            {
                "hue": "#00ffcc"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
]

    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: style_array
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    // begin onSuccess fn

    var onSuccess = function (position) {
      // console.log('test');
      $scope.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      var latlng = $scope.location;


      var currentlocation = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);

      map.setCenter(currentlocation);



      var  addmarker = {
        userEmail: $scope.currentUser.facebook.email,
        latlng: latlng,
        image: $scope.currentUser.profile_picture
      }

      $http.post('/addMarker', addmarker).success(function(marker){
        // console.log(markersArray);
        var myMarkerFound = false;
        console.log("marker.userEmail: ", marker.userEmail);

        for (var i=0; i<markersArray.length; i++){
          // console.log("markersArr[i-",i,"].userEmail: ", markersArray[i].userEmail);
          if(markersArray[i].userEmail === marker.userEmail){
            console.log('moving existing marker');
            markersArray[i].setPosition(currentlocation);
            myMarkerFound = true;
            // new google.maps.Marker({
            //   position: currentlocation,
            //   map: map,
            //   icon: marker.image,
            //   title:"Hello World!"
            // });

          // } else {
            // console.log('making anew marker')
            // new google.maps.Marker({
            //   position: currentlocation,
            //   map: map,
            //   icon: marker.image,
            //   title:"Hello World!"
            // });
          }
        }
        if (!myMarkerFound) {
          var marker = new google.maps.Marker({
            position: currentlocation,
            map: map,
            icon: marker.image,
            title:"Hello World!"
          });
        }
        socket.emit('pin drop', {position: $scope.location, icon: marker.icon, title: marker.title});
        // });
      });
  };


    // onSuccess function ends

    $scope.initApp = function() {
      // markersArray =[];
      $http.get('/getmarker').success(function(data){
        for (var i=0; i < data.markers.length; i++) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.markers[i].latlng.latitude, data.markers[i].latlng.longitude),
            map: map,
            icon: data.markers[i].image
          });
          marker.userEmail = data.markers[i].userEmail;
          markersArray.push(marker);
          // markersArray.push(marker);
        };
      });
    };


    navigator.geolocation.getCurrentPosition(onSuccess, function(error){ console.log(error);});


    socket.on('pin drop', function(data) {
      // console.log('socket data');
      // console.log(data);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.position.latitude, data.position.longitude),
        icon: data.icon,
        map: map,
        title: data.title
      });
    });


});

