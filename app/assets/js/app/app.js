angular.module('app', ['ngRoute', 'main', 'about', 'posts', 'comments', 'users']);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.otherwise({ redirectTo: 'posts/latest' });
}]);

angular.module('app').controller('AppController',
    ['$scope', 'User',
    function ($scope, User) {

  User.check(function (response) {
    $scope.current_user = new User(response.data);
  });

  $scope.isAuthenticated = function () {
    return !!$scope.current_user;
  };
}]);
