var feed_module = angular.module('feed_module', []);

feed_module.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.
    when('/feed/:feed', {
      templateUrl: '/partials/feed.html',
      controller: FeedController
    }).
    otherwise({ redirectTo: '/feed/github' });
});

function FeedController($scope, $route, $routeParams, $http, $location) {
  feed = $routeParams['feed'];
  route_type = '/' + feed + '.json';
  $http.get(route_type).
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

var month_names = new Array ( );
month_names[month_names.length] = "Jan";
month_names[month_names.length] = "Feb";
month_names[month_names.length] = "Mar";
month_names[month_names.length] = "Apr";
month_names[month_names.length] = "May";
month_names[month_names.length] = "Jun";
month_names[month_names.length] = "Jul";
month_names[month_names.length] = "Aug";
month_names[month_names.length] = "Sep";
month_names[month_names.length] = "Oct";
month_names[month_names.length] = "Nov";
month_names[month_names.length] = "Dec";

function parseDate(d) {
  return "" + d.getDate() +
        " " + month_names[d.getMonth()] +
        " " + d.getFullYear() +
     " at " + (((d.getHours() - 1) % 12) + 1) +
        ":" + ('0' + d.getMinutes()).slice(-2) +
        " " + (Math.floor(d.getHours() / 12) != 1 ? "AM" : "PM")
}
