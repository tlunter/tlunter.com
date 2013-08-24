angular.module('feeds', ['ngResource']);

angular.module('feeds').value('$anchorScroll', angular.noop);

angular.module('feeds').controller('FeedsController',
    ['$scope', '$route', '$routeParams', '$http', 'Feed',
    function($scope, $route, $routeParams, $http, Feed) {
  feed = $routeParams['feed'];

  var data = Feed.get({ feed: feed }, function () {
    data.forEach(function(item) {
      item['published_date'] = new Date(item['published']);
      item['pretty_date'] = parseDate(item['published_date']);
    });
    $scope[feed] = 'active';
    $scope['feed'] = data;
  });
}]);

angular.module('feeds').factory('Feed', ['$resource', function ($resource) {
  return $resource('/feeds/:feed\.json', {}, 
    {
      'get': {method: 'GET', isArray: true}
    });
}]);

angular.module('feeds').config(
  ['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about/feed/:feed', {
    templateUrl: '/partials/feed.html',
    controller: 'FeedsController'
  });
}]);
