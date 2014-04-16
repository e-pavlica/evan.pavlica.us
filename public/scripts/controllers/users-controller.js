'use strict';

app.controller('UsersController', function($scope, $window, $http) {
  $scope.user = {email:'evan@xicreative.net', password:'meowmix'};
  setupToken();

  $scope.login = function() {
    $http
      .post('http://api.' + location.host + '/login.json', $scope.user)
      .success(function (data, status, headers, config){
        $window.sessionStorage.token = data.token;
        $window.sessionStorage.name = data.name;
        setupToken();
      })
      .error(function(){
        delete $window.sessionStorage.token;
      });
  };

  $scope.logout = function() {
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.name;
    setupToken();
  };

  function setupToken() {
    $scope.token = $window.sessionStorage.token;
    $scope.name = $window.sessionStorage.name;
  }
});

