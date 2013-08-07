var feeds_module = angular.module('feeds_module', []);

feeds_module.value('$anchorScroll', angular.noop);

feeds_module.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.
    when('/about/feed/:feed', {
      templateUrl: '/partials/feed.html',
      controller: FeedsController
    }).
    otherwise({ redirectTo: '/about/feed/twitter' });
});

function FeedsController($scope, $route, $routeParams, $http) {
  feed = $routeParams['feed'];
  feed_route = '/feeds/' + feed + '.json';
  $http.get(feed_route).
    success(function(data, status, headers, config) {
      data.forEach(function(item) {
        item['published_date'] = new Date(item['published']);
        item['pretty_date'] = parseDate(item['published_date']);
      })
      $scope[feed] = 'active';
      $scope['feed'] = data;
    }).
    error(function(data, status, headers, config) {
      $scope['feed'] = [];
    });
}
