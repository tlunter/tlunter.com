angular.module('feeds', ['resource.feed', 'services.date']);

angular.module('feeds').value('$anchorScroll', angular.noop);

angular.module('feeds').controller('FeedsController',
    ['$scope', '$route', '$routeParams', '$http', 'Feed', 'DateFormatter',
    function($scope, $route, $routeParams, $http, Feed, DateFormatter) {
  feed = $routeParams['feed'];

  var data = Feed.get({ feed: feed }, function () {
    angular.forEach(data, function(item) {
      item = DateFormatter.setupDate(item, 'published_date');
    });
    $scope[feed] = 'active';
    $scope['feed'] = data;
  });
}]);

angular.module('feeds').config(
  ['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about/feed/:feed', {
    templateUrl: '/partials/feed.html',
    controller: 'FeedsController'
  });
}]);
