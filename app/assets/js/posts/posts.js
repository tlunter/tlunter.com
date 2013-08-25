angular.module('posts', ['resource.post'])

angular.module('posts').factory('CommentsFactory', ['$http', function ($http) {
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

angular.module('posts').directive('comment-scroll',
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

angular.module('posts').controller('PostsController',
    ['$scope', '$routeParams', '$http', 'CommentsFactory', '$location', '$anchorScroll', 'Post',
    function ($scope, $routeParams, $http, CommentsFactory, $location, $anchorScroll, Post) {

  var post = $routeParams['id'] || 'latest';
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
    var data = Post.get({link: post}, function() {
      setupDate(null, data);
      $scope['post'] = data;

      $scope.loadComments(data['link']);
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

angular.module('posts').config(
    ['$routeProvider', 
    function($routeProvider) {
  $routeProvider.when('/posts/latest', {
    controller: 'PostsController',
    templateUrl: '/partials/post.html'
  }).
  when('/posts/:id', {
    controller: 'PostsController',
    templateUrl: '/partials/post.html'
  });
}]);

function setupDate(key, value) {
  if (value !== null) {
    value['updated_at_date'] = new Date(value['updated_at']);
    value['date'] = parseDate(value['updated_at_date']);
  }
}
