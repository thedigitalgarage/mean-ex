var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope){
    $scope.posts = [
      {title: 'From the Web Console homepage, navigate to your project', upvotes: 5},
      {title: 'Click on Browse &gt; Builds', upvotes: 2},
      {title: 'Click the link with your BuildConfig name', upvotes: 15},
      {title: 'Click the Configuration tab', upvotes: 9},
      {title: 'Click the "Copy to clipboard" icon to the right of the "GitHub webhook URL" field', upvotes: 4}
    ];
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({title: $scope.title, upvotes: 0});
      $scope.title = '';
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }
]);
