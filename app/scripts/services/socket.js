// 'use strict';

// angular.module('findyourfriendsApp')
// .factory('socket', function($rootScope) {
//   var socket = io.connect();
//   return {
//     on: function (eventName, cb) {
//       socket.on(eventName, function() {
//         var arg = arguments;
//         $rootScope.apply(function(){
//           callback.apply(socket, args);
//         })
//       })
//     },
//     emit: function(eventName, data, cb) {
//       socket.emit(eventName, data, function () {
//         var args = arguments;
//         $rootScope.$apply(function() {
//           if (cb) {
//             callback.apply(socket, args);
//           }
//         });
//       })
//     }
//   }
// })
