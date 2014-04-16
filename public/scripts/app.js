'use strict';

var app = angular.module('keymsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/posts.html',
        controller: 'PostsController'
      })
      .when('/new', {
        templateUrl: 'templates/new.html',
        controller: 'PostsController'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'UsersController'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
  
  // the following is from the Auth0 token-auth example.
// it adds the suth token to the headers of $http requests

app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
