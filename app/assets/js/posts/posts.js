angular.module('posts', ['ngRoute', 'ngSanitize', 'resource.post', 'resource.comment', 'services.date'])

angular.module('posts').controller('PostsListController',
    ['$scope', 'posts', function ($scope, posts) {
  $scope.posts = posts;
}]);

angular.module('posts').controller('PostsShowController',
    ['$scope', '$route', 'post', 'comment',
    function ($scope, $route, post, comment) {
  $scope.post = post;
  $scope.comment = comment;

  $scope.save = function () {
    this.comment.$save({post: this.post.link}, function(comment, putResponseHeaders) {
      $route.reload();
    });
  };
}]);

angular.module('posts').controller('PostsNewController',
    ['$scope', '$location', 'post', function ($scope, $location, post) {
  $scope.post = post;

  $scope.save = function () {
    this.post.$save(function(post, putResponseHeaders) {
      $location.path('/posts/' + post.link);
    });
  };
}]);

angular.module('posts').config(
    ['$routeProvider', 
    function($routeProvider) {
  $routeProvider.
    when('/posts/latest', {
      controller: 'PostsListController',
      templateUrl: '/partials/posts/index.html',
      resolve: {
        // Get posts, setup dates, get comments
        posts: ['Post', 'Comment', 'DateFormatter',
               function (Post, Comment, DateFormatter) {
          var posts = Post.query(function () {
            angular.forEach(posts, function (post) {
              post = DateFormatter.setupDate(post, 'updated_at');
              post.comments = Comment.query({post: post.link});
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
          return new Post({published: true});
        }]
      }
    }).
    when('/posts/:id', {
      controller: 'PostsShowController',
      templateUrl: '/partials/posts/show.html',
      resolve: {
        // Get post, setup date, get comments, setup dates
        post: ['$route', 'Post', 'Comment', 'DateFormatter',
              function ($route, Post, Comment, DateFormatter) {
          var post = Post.get({link: $route.current.params.id}, function() {
            post = DateFormatter.setupDate(post, 'updated_at');
            post.comments = Comment.query({post: post.link}, function () {
              angular.forEach(post.comments, function (comment) {
                comment = DateFormatter.setupDate(comment, 'updated_at');
              });
            });
          });
          return post;
        }],
        comment: ['Comment', function (Comment) {
          return new Comment();
        }]
      }
    });
}]);
