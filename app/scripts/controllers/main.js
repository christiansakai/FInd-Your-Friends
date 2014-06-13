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
//google markers infowindow
// $scope.contentString;
// $scope.infowindow;
// end
var markersArray = [];

// $scope.message = '';
$scope.messageLog = [];
$scope.glued = true;
// $scope.previousmessages = [];
$scope.date = new Date().toString();
$scope.message ='';
$scope.pic = '';
$scope.testpic = $scope.currentUser.profile_picture;
// $scope.userMessage = {message: $scope.message,
// user: $scope.currentUser.facebook.name};

$scope.sendMessage = function () {
  // console.log($scope.message);
  // $scope.messageLog.push($scope.message);
  var name = $scope.currentUser.facebook.name;
  var message =$scope.message;
  var testpic = $scope.testpic;
  // $scope.location = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     }
  // var latlng = $scope.location;

  var addmessage = {
    name: name,
    msg: message,
    pic: testpic
  }

 $http.post('/addMessage', addmessage).success(function(themessage) {
  // $scope.messageLog.push(themessage);


 });
    var data = {name: name, msg: message, pic: testpic};
    $scope.messageLog.push(data);
    socket.emit('message', data);
    $scope.message=""


};

    socket.on('message', function (msg) {
      $scope.$apply(function() {
        $scope.messageLog.push(msg);
        console.log("message log:" + JSON.stringify($scope.messageLog));
        $scope.pic = msg.pic;
        $scope.name = msg.name;
        $scope.message = msg.message;
      })
    });


          var style_array= [
          {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 51
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 30
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    }
]

  // var info = new Date().toString();


    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: style_array
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    var createMarker = function(position, markerImage, title, content){
      // var date = new Date().toString();
       var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: markerImage,
            title: title,
            name: name
          });
          var infowindow = new google.maps.InfoWindow({
            content: title
          });
          google.maps.event.addListener(marker, 'click', function() {
            console.log('yo');
            infowindow.open(map,marker);
          });
          return marker;
    };

    // begin onSuccess fn

    var onSuccess = function (position) {

      //trying to add infowindow to google maps marker


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
        image: $scope.currentUser.profile_picture,
        name: $scope.currentUser.facebook.name
      }
      console.log(addmarker);

      $http.post('/addMarker', addmarker).success(function(marker){
        console.log(marker);

        //trying out google markers info window
      // var infowindow = new google.maps.InfoWindow({
      // content: contentString
    // });

      //end
        // console.log(markersArray);
        var myMarkerFound = false;
        console.log("marker.userEmail: ", marker.userEmail);

        for (var i=0; i<markersArray.length; i++){
          var date = new Date().toString();
          var name = marker.name;
          var all = name+"last logged in at "+date;
          // console.log("markersArr[i-",i,"].userEmail: ", markersArray[i].userEmail);
          if(markersArray[i].userEmail === marker.userEmail){
            console.log('moving existing marker');
            // var infowindow = new google.maps.InfoWindow({
            //   content: all
            // })
            markersArray[i].setPosition(currentlocation);
            // google.maps.event.addListener(markersArray[i], 'click', function() {
            //   infowindow.open(map, markersArray[i]);
            // });
            console.log(date);
            // markersArray[i].InfoWindow.setContent({'content': date});
            myMarkerFound = true;


          //   var infowindow = new google.maps.InfoWindow({
          //   content: date+marker.name
          // });
          //   console.log(infowindow);
          //   console.log(date);
          //   google.maps.event.addListener(markersArray[i], 'click', function() {
          //     infowindow.open(map, markersArray[i]);
          //   });
            // new google.maps.Marker({
            //   position: currentlocation,
            //   map: map,
            //   icon: marker.image,
            //   title:"Hello World!"
            // });

          // } else {
            // console.log('making anew marker')
            // new google.maps.Marker({            //   map: map,
            //   icon: marker.image,
            //   title:"Hello World!"
            // });
          }
        }
        if (!myMarkerFound) {
          var date = new Date().toString();
          var all = marker.name+" last logged in at "+date;
          createMarker(currentlocation, marker.image, all);

          // var marker = new google.maps.Marker({
          //   position: currentlocation,
          //   map: map,
          //   icon: marker.image,
          //   title:"Hello World!"
          // });
          // var contentString = '<p>testing</p>';
          // var infowindow = new google.maps.InfoWindow({
          //   content: contentString
          // });

          //trying out google markers info window
          // google.maps.event.addListener(marker, 'click', function() {
          //   console.log('yo');
          //   infowindow.open(map,marker);
          // });
          //end

        }
        socket.emit('pin drop', {position: $scope.location, icon: marker.icon, title: marker.title});
        // });
      });

      // var contentString = 'testing';

      //   var infowindow = new google.maps.InfoWindow({
      //   content: contentString
      // });

      //end
  };


    // onSuccess function ends

    $scope.initApp = function() {
      // markersArray =[];
      $http.get('/getmarker').success(function(data){
        for (var i=0; i < data.markers.length; i++) {
          var position = new google.maps.LatLng(data.markers[i].latlng.latitude, data.markers[i].latlng.longitude);
          var icon = data.markers[i].image;
          var userEmail = data.markers[i].userEmail;
          var name = data.markers[i].name;
          var all = name+" was here within the hour";
          var marker = createMarker(position, icon, all, "Hi");
          // var marker = new google.maps.Marker({
          //   position: new google.maps.LatLng(data.markers[i].latlng.latitude, data.markers[i].latlng.longitude),
          //   map: map,
          //   icon: data.markers[i].image
          // });
          marker.userEmail = data.markers[i].userEmail;
          markersArray.push(marker);
          // markersArray.push(marker);
        };
      });

      $http.get('/getmessage').success(function(data){
        for (var i=0; i<data.messages.length; i++){
          $scope.messageLog.push(data.messages[i]);
        }
        console.log(data);



      });
    };


    navigator.geolocation.getCurrentPosition(onSuccess, function(error){ console.log(error);});


    socket.on('pin drop', function(data) {
      // console.log('socket data');
      // console.log(data);
      var position = new google.maps.LatLng(data.position.latitude, data.position.longitude);
      var icon = data.icon;
      var title = data.title;


      var marker = createMarker(position, icon, title, "Hi");


      // new google.maps.Marker({
      //   position: new google.maps.LatLng(data.position.latitude, data.position.longitude),
      //   icon: data.icon,
      //   map: map,
      //   title: data.title
      // });
    });


});

