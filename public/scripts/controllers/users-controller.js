'use strict';

app.controller('UsersController', function($scope, $window, $http) {
  $scope.user = {email:'evan@xicreative.net', password:'meowmix'};

  $scope.login = function() {
    $http
      .post('http://api.' + location.host + '/login.json', $scope.user)
      .success(function (data, status, headers, config){
        $window.sessionStorage.token = data.token;
      })
      .error(function(){
        delete $window.sessionStorage.token;
      });
  };
});

