'use strict';

app.factory('Post', function($resource) {
  return $resource('http://api.'+ location.host + '/posts/:id.json');
});
