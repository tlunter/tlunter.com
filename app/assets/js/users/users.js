angular.module('users', ['resource.user']);

angular.module('users').controller('UsersLoginController',
    ['$scope', '$location', 'User', 'credentials',
    function ($scope, $location, User, credentials) {
  $scope.credentials = credentials;

  $scope.login = function () {
    this.credentials.login(function (response) {
      $scope.$parent.$parent.user = new User(response.data);
      $location.path('/');
    }, function (response) {
      $scope.addError('Account does not exist or email/password incorrectly spelled!');
    });
  };
}]);

angular.module('users').controller('UsersLogoutController',
    ['$scope', '$location', 'User',
    function ($scope, $location, User) {
  User.logout(function (response) {
    console.log($scope.user);
    $scope.$parent.$parent.user = null;
    $location.path('/');
  }, function (response) {
    $location.path('/');
  });
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
    }).
    when('/logout', {
      controller: 'UsersLogoutController',
      templateUrl: '/partials/users/logout.html'
    });
}]);