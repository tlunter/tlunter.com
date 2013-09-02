angular.module('feeds', ['resource.feed', 'services.date']);

angular.module('feeds').controller('FeedsController',
    ['$scope', 'feedItems', 'feed',
    function($scope, feedItems, feed) {
  $scope.feedItems = feedItems;
  $scope.feed = feed;
}]);

angular.module('feeds').config(
  ['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about/feed/:feed', {
    templateUrl: '/partials/feed.html',
    controller: 'FeedsController',
    resolve: {
      feedItems: ['$route', 'Feed', 'DateFormatter', function ($route, Feed, DateFormatter) {
        var data = Feed.get({ feed: $route.current.params.feed }, function () {
          angular.forEach(data, function(item) {
            item = DateFormatter.setupDate(item, 'published');
          });
        });
        return data;
      }],
      feed: ['$route', function ($route) {
        return $route.current.params.feed;
      }]
    }
  }).
  when('/about', {redirectTo: '/about/feed/twitter' });
}]);
