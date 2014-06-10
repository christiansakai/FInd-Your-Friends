'use strict';

angular.module('findyourfriendsApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
