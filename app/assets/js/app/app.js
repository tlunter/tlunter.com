angular.module('app', ['main', 'posts', 'comments', 'feeds', 'users']);

angular.module('app').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.otherwise({ redirectTo: 'posts/latest' });
}]);

angular.module('app').controller('AppController',
    ['$scope', 'User',
    function ($scope, User) {

  User.check(function (response) {
    $scope.user = new User(response.data);
  });

  $scope.isAuthenticated = function () {
    console.log('check');
    return !!$scope.user;
  };
}]);
