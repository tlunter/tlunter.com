angular.module('app', ['main', 'posts', 'comments', 'feeds', 'users']);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.otherwise({ redirectTo: 'posts/latest' });
}]);
