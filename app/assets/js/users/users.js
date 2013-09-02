angular.module('users', ['resource.user']);

angular.module('users').controller('UsersLoginController',
    ['$scope', '$location', 'User', 'credentials',
    function ($scope, $location, User, credentials) {
  $scope.credentials = credentials;

  $scope.login = function () {
    this.credentials.login(function (response) {
      this.user = new User(response.data);
      $location.path('/posts/latest');
    }, function (response) {
      $scope.addError('Account does not exist or email/password incorrectly spelled!');
    });
  };
}]);

angular.module('users').config(
    ['$routeProvider',
    function ($routeProvider) {
  $routeProvider.
    when('/login', {
      controller: 'UsersLoginController',
      templateUrl: '/partials/users/login.html',
      resolve: {
        credentials: ['User', function (User) {
          return new User();
        }]
      }
    });
}]);
