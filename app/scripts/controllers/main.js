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
// $scope.previousmessages = [];
$scope.message = '';
$scope.pic = '';
$scope.testpic = $scope.currentUser.profile_picture;
// $scope.userMessage = {message: $scope.message,
// user: $scope.currentUser.facebook.name};

$scope.sendMessage = function () {
  // console.log($scope.message);
  // $scope.messageLog.push($scope.message);
  var message = $scope.currentUser.facebook.name+': '+$scope.message;
  var testpic = $scope.testpic;
  // $scope.location = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     }
  // var latlng = $scope.location;

  var addmessage = {
    msg: message,
    pic: testpic
  }

 $http.post('/addMessage', addmessage).success(function(themessage) {
  // $scope.messageLog.push(themessage);


 });
    var data = {msg: message, pic: testpic};
    $scope.messageLog.push(data);
    socket.emit('message', data);
    $scope.message=""


};

    socket.on('message', function (msg) {
      $scope.$apply(function() {
        $scope.messageLog.push(msg);
        console.log("message log:" + JSON.stringify($scope.messageLog));
        $scope.pic = msg.pic;
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

  // var info = new Date().toString();


    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: style_array
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    var createMarker = function(position, markerImage, title, content){
       var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: markerImage,
            title: title
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
        image: $scope.currentUser.profile_picture
      }

      $http.post('/addMarker', addmarker).success(function(marker){

        //trying out google markers info window
      // var infowindow = new google.maps.InfoWindow({
      // content: contentString
    // });

      //end
        // console.log(markersArray);
        var myMarkerFound = false;
        console.log("marker.userEmail: ", marker.userEmail);

        for (var i=0; i<markersArray.length; i++){
          // console.log("markersArr[i-",i,"].userEmail: ", markersArray[i].userEmail);
          if(markersArray[i].userEmail === marker.userEmail){
            console.log('moving existing marker');
            markersArray[i].setPosition(currentlocation);
            // var date = Date.now().toString();
            // markersArray[i].InfoWindow.setContent({'content': date});
            myMarkerFound = true;
          //   var infowindow = new google.maps.InfoWindow({
          //   content: title
          // });
          // google.maps.event.addListener(marker, 'click', function() {
          //   console.log('yo');
          //   infowindow.open(map,marker);
          // });
            // google.maps.event.addListener(marker, 'click', function() {
            //   infowindow.open(map, markersArray[i]);
            // });
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
          // var date = Date.now()
          createMarker(currentlocation, marker.image, marker.userEmail, "Hi")

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
          var marker = createMarker(position, icon, userEmail, "Hi");
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

