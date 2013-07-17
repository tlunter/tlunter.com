var posts_module = angular.module('posts_module', [])

posts_module.value('$anchorScroll', angular.noop);

posts_module.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.
    when('/posts/latest', {
      controller: PostsController,
      templateUrl: '/partials/post.html'
    }).
    when('/posts/i/:id', {
      controller: PostsController,
      templateUrl: '/partials/post.html'
    }).
    otherwise({ redirectTo: '/posts/latest' });
});

function PostsController($scope, $route, $routeParams, $http) {
  post = $routeParams['id']
  if (post === undefined)
    post = 'latest';
  else
    post = 'i/' + post;

  $scope['previous'] = 'none';
  $scope['next'] = 'none';

  post_route = '/post/' + post + '.json';
  $http.get(post_route).
    success(function (data, status, headers, config) {
      $.each(data, setupPost);
      $scope['previous'] = data['previous'];
      $scope['next'] = data['next'];
      $scope['post'] = data['current'];
    }).
    error(function (data, status, headers, config) {
      $scope['post'] = null;
    });
}

function setupPost(key, value) {
  if (value !== null) {
    value['updated_at_date'] = new Date(value['updated_at']);
    value['date'] = parseDate(value['updated_at_date']);
  }
}
