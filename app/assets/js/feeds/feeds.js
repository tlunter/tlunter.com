angular.module('feeds', ['ngRoute', 'resource.feed', 'services.date']);

angular.module('feeds').controller('FeedsController',
    ['$scope', 'feedItems', 'feed', 'feedUrl',
    function($scope, feedItems, feed, feedUrl) {
  $scope.feedItems = feedItems;
  $scope.feed = feed;
  $scope.feedUrl = feedUrl;
}]);

angular.module('feeds').config(
  ['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feeds/github', {
    templateUrl: '/partials/feeds.html',
    controller: 'FeedsController',
    resolve: {
      feedItems: ['$route', 'Feed', 'DateFormatter', function ($route, Feed, DateFormatter) {
        var data = Feed.get({ feed: 'github' }, function () {
          angular.forEach(data, function(item) {
            item = DateFormatter.setupDate(item, 'published');
          });
        });
        return data;
      }],
      feed: function () { return 'GitHub'; },
      feedUrl: function () { return 'http://www.github.com/tlunter'; }
    }
  })
  .when('/feeds/twitter', {
    templateUrl: '/partials/feeds.html',
    controller: 'FeedsController',
    resolve: {
      feedItems: ['$route', 'Feed', 'DateFormatter', function ($route, Feed, DateFormatter) {
        var data = Feed.get({ feed: 'twitter' }, function () {
          angular.forEach(data, function(item) {
            item = DateFormatter.setupDate(item, 'published');
          });
        });
        return data;
      }],
      feed: function () { return 'Twitter'; },
      feedUrl: function () { return 'http://www.twitter.com/tlunter'; }
    }
  }).when('/feeds/stackoverflow', {
    templateUrl: '/partials/feeds.html',
    controller: 'FeedsController',
    resolve: {
      feedItems: ['$route', 'Feed', 'DateFormatter', function ($route, Feed, DateFormatter) {
        var data = Feed.get({ feed: 'stack_overflow' }, function () {
          angular.forEach(data, function(item) {
            item = DateFormatter.setupDate(item, 'published');
          });
        });
        return data;
      }],
      feed: function () { return 'StackOverflow'; },
      feedUrl: function () { return 'http://stackoverflow.com/users/714452/tlunter'; }
    }
  });
}]);
