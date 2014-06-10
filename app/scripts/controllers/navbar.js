'use strict';

angular.module('findyourfriendsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Settings',
      'link': '/settings'
    }];

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        console.log('logged out');
        $location.path('/login');
      });
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
