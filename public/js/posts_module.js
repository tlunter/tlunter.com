var posts_module = angular.module('posts_module', [])

posts_module.value('$anchorScroll', angular.noop);

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

posts_module.controller('PostsController',
    ['$scope', '$routeParams', '$http', 'PostsFactory', 'CommentsFactory',
    function ($scope, $routeParams, $http, PostsFactory, CommentsFactory) {

  var post = $routeParams['id']
  var csrf_token;

  $scope.loadComments = function (link) {
    CommentsFactory.getData(link,
      function(success, commentData) {
      if (!success) {
        $scope['comments'] = null;
      }

      $scope['comments'] = commentData;
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
        $scope.loadComments($scope['current']['link']);
      });
  }

  $scope.loadPost();
}]);

posts_module.config(function($locationProvider, $routeProvider) {
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
});

function setupDate(key, value) {
  if (value !== null) {
    value['updated_at_date'] = new Date(value['updated_at']);
    value['date'] = parseDate(value['updated_at_date']);
  }
}
