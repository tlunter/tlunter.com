angular.module('posts', ['ngRoute', 'resource.post', 'services.date', 'ngSanitize'])

angular.module('posts').controller('PostsListController',
    ['$scope', 'posts', function ($scope, posts) {
  $scope.posts = posts;
}]);

angular.module('posts').controller('PostsShowController',
    ['$scope', 'post', function ($scope, post) {
  $scope.post = post;
}]);

angular.module('posts').controller('PostsShowController',
    ['$scope', 'post', function ($scope, post) {
  $scope.post = post;
}]);

angular.module('posts').config(
    ['$routeProvider', 
    function($routeProvider) {
  $routeProvider.
    when('/posts/latest', {
      controller: 'PostsListController',
      templateUrl: '/partials/posts/index.html',
      resolve: {
        posts: ['Post', 'DateFormatter', function (Post, DateFormatter) {
          var posts = Post.query(function () {
            angular.forEach(posts, function (post) {
              post = DateFormatter.setupDate(post, 'updated_at');
            });
          });
          return posts;
        }]
      }
    }).
    when('/posts/new', {
      controller: 'PostsNewController',
      templateUrl: '/partials/posts/new.html',
      resolve: {
        post: ['Post', function (Post) {
          return new Post();
        }]
      }
    }).
    when('/posts/:id', {
      controller: 'PostsShowController',
      templateUrl: '/partials/posts/show.html',
      resolve: {
        post: ['$route', 'Post', 'DateFormatter', function ($route, Post, DateFormatter) {
          var post = Post.get({link: $route.current.params.id}, function() {
            post = DateFormatter.setupDate(post, 'updated_at');
          });
          return post;
        }]
      }
    });
}]);
