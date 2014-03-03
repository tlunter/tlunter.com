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
    this.comment.$save({post: this.post.link}, function(comment) {
      $route.reload();
      $scope.clearFlashes();
      $scope.addNotice("Comment added.");
    }, function (response) {
      $scope.clearFlashes();
      angular.forEach(response.data||[], function (msg) {
        $scope.addError(msg);
      });
    });
  };
}]);

angular.module('posts').controller('PostsFormController',
    ['$scope', '$location', 'post', function ($scope, $location, post) {
  $scope.post = post;

  $scope.save = function () {
    this.post.$save(function(post) {
      $location.path('/posts/' + post.link);
      $scope.clearFlashes();
      $scope.addNotice("Post saved.");
    }, function (response) {
      $scope.clearFlashes();
      angular.forEach(response.data||[], function (msg) {
        $scope.addError(msg);
      });
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
        posts: ['Post', 'Comment', 'User', 'DateFormatter',
               function (Post, Comment, User, DateFormatter) {
          var posts = Post.query(function () {
            angular.forEach(posts, function (post) {
              post = DateFormatter.setupDate(post, 'updated_at');
              post.user = User.get({id: post.user_id});
            });
          });
          return posts;
        }]
      }
    }).
    when('/posts/new', {
      controller: 'PostsFormController',
      templateUrl: '/partials/posts/form.html',
      resolve: {
        post: ['Post', function (Post) {
          return new Post({published: true});
        }]
      }
    }).
    when('/posts/:id/edit', {
      controller: 'PostsFormController',
      templateUrl: '/partials/posts/form.html',
      resolve: {
        // Get post
        post: ['$route', 'Post',
              function ($route, Post) {
          var post = Post.get_clean({link: $route.current.params.id});
          return post;
        }]
      }
    }).
    when('/posts/:id', {
      controller: 'PostsShowController',
      templateUrl: '/partials/posts/show.html',
      resolve: {
        // Get post, setup date, get comments, setup dates
        post: ['$route', 'Post', 'Comment', 'User', 'DateFormatter',
              function ($route, Post, Comment, User, DateFormatter) {
          var post = Post.get({link: $route.current.params.id}, function() {
            post = DateFormatter.setupDate(post, 'updated_at');
            post.user = User.get({id: post.user_id});
            post.comments = Comment.query({post: post.link}, function () {
              angular.forEach(post.comments, function (comment) {
                comment = DateFormatter.setupDate(comment, 'updated_at');
                comment.user = User.get({id: comment.user_id});
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
