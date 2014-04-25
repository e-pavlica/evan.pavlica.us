'use strict';

app.controller('PostsController', function($scope, Post) {
  $scope.posts = Post.get();
  $scope.post = {title: '', content:'', category:''};
  $scope.renderMarkdown = function(md) {
    return markdown.toHTML(md);
  };
  

  $scope.submitPost = function() {
    var newPost = new Post($scope.post);
    newPost.$save();
  };

  // $scope.deletePost = function(postId) {
  //   Post.delete({id: postId}, function () {
  //     delete $scope.posts[postId];
  //   });
  // };
});


app.controller('SinglePostCtrl', function($scope, Post, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.post = Post.get({id: $scope.id});
});