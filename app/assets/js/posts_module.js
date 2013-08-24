var posts_module = angular.module('posts_module', [])

posts_module.factory('PostsFactory', ['$http', function ($http) {
  return {
    getData: function (post, callback) {
      if (post === undefined) {
        post = 'latest';
      } else {
        post = 'i/' + post;
      }

      post_route = '/post/' + post + '.json';

      $http.get(post_route).
        success(function (data, status, headers, config) {
          $.each(data, setupDate);
          callback(true, data);
        }).
        error(function (data, status, headers, config) {
          callback(false, data);
        });
    }
  }
}]);

posts_module.factory('CommentsFactory', ['$http', function ($http) {
  return {
    getData: function (post, callback) {
      if (post === undefined) {
        return;
      }

      comments_route = '/comments/' + post + '.json';

      $http.get(comments_route).
        success(function(data, status, headers, config) {
          $.each(data, setupDate);
          callback(true, data);
        }).
        error(function (data, status, headers, config) {
          callback(false, data);
        });
    },
    getCsrf: function (post, callback) {
      if (post === undefined) {
        return;
      }

      comments_route = '/comments/' + post + '/new.json';

      $http.get(comments_route).
        success(function(data, status, headers, config) {
          callback(data['csrf_token']);
        });
    },
    postComment: function(post, email, body, csrf, callback) {
      if (post === undefined) {
        return;
      }

      comments_route = '/comments/' + post + '/new.json';

      $http.post(
          comments_route,
          $.param({ 'email': email, 'body': body, '_csrf': csrf }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).
        success(function(data, status, headers, config) {
          callback(true, data);
        }).
        error(function (data, status, headers, config) {
          callback(false, data);
        });
    }
  }
}]);

posts_module.directive('comment-scroll',
    ['$anchorScroll', '$location',
    function ($anchorScroll, $location) {
      return {
        restrict: 'C',
        link: function (scope, elem, attrs) {
          if ($location.hash())
            $anchorScroll();
        }
      };
}]);

posts_module.controller('PostsController',
    ['$scope', '$routeParams', '$http', 'PostsFactory', 'CommentsFactory', '$location', '$anchorScroll',
    function ($scope, $routeParams, $http, PostsFactory, CommentsFactory, $location, $anchorScroll) {

  var post = $routeParams['id']
  var csrf_token;

  $scope.loadComments = function (link) {
    CommentsFactory.getData(link,
      function(success, commentData) {
      if (success) {
        $scope['comments'] = commentData;
        window.setTimeout(function () {
          if ($location.hash()) {
            $anchorScroll();
          }
        }, 0);
      } else {
        $scope['comments'] = null;
      }
    });

    CommentsFactory.getCsrf(link, function (ct) {
      csrf_token = ct;
    });
  }

  $scope.loadPost = function () {
    PostsFactory.getData(post, function(success, data) {
      if (!success) {
        $scope['current'] = null;
        return;
      }

      $.extend($scope, data);

      var link = data['current']['link'];
      $scope.loadComments(link);
    });
  }

  $scope.postComment = function () {
    CommentsFactory.postComment($scope['current']['link'],
      $scope.comment_email, $scope.comment_body, csrf_token,
      function (success, data) {
        if (success) {
          $scope.comment_body = "";
          $scope.loadComments($scope['current']['link']);
          $location.hash('comment-' + data['id']);
        }
      });
  }

  $scope.loadPost();
}]);

posts_module.config(
  ['$locationProvider', '$routeProvider', 
  function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.
    when('/posts/latest', {
      controller: 'PostsController',
      templateUrl: '/partials/post.html'
    }).
    when('/posts/i/:id', {
      controller: 'PostsController',
      templateUrl: '/partials/post.html'
    }).
    otherwise({ redirectTo: '/posts/latest' });
}]);

function setupDate(key, value) {
  if (value !== null) {
    value['updated_at_date'] = new Date(value['updated_at']);
    value['date'] = parseDate(value['updated_at_date']);
  }
}