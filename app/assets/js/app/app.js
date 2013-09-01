angular.module('app', ['posts', 'comments', 'feeds', 'notices']);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.otherwise({ redirectTo: 'posts/latest' });
}]);
