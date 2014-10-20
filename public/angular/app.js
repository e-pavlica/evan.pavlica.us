'use strict';

// App initialization & dependency injection.
var app = angular.module('keymsApp', [
  'ngResource',
  'ngRoute',
  'hc.marked'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/index.html',
        controller: 'PostsController'
      })
      .when('/new', {
        templateUrl: 'templates/new.html',
        controller: 'PostsController'
      })
      .when('/posts/:id', {
        templateUrl: 'templates/show.html',
        controller: 'SinglePostCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'UsersController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])
  // Config the marked angular module
  .config(['markedProvider', function(markedProvider) {
    markedProvider.setOptions({
      gfm: true,
      tables: true
    });
  }])

  // the following is from the Auth0 token-auth example.
  // it adds the auth token to the headers of $http requests
  .factory('authInterceptor', ['$rootScope', '$q', '$window',
    function ($rootScope, $q, $window) {
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
    }
  ])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

