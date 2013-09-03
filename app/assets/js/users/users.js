angular.module('users', ['resource.user']);

angular.module('users').controller('UsersLoginController',
    ['$scope', '$location', 'User', 'credentials',
    function ($scope, $location, User, credentials) {
  $scope.credentials = credentials;

  $scope.login = function () {
    this.credentials.login(function (response) {
      $scope.$parent.$parent.current_user = new User(response.data);
      $scope.clearFlashes();
      $scope.addNotice("You're now logged in.");
      $location.path('/');
    }, function (response) {
      $scope.clearFlashes();
      angular.forEach(response.data||[], function (msg) {
        $scope.addError(msg);
      });
    });
  };
}]);

angular.module('users').controller('UsersLogoutController',
    ['$scope', '$location', 'User',
    function ($scope, $location, User) {
  User.logout(function (response) {
    console.log($scope.user);
    $scope.$parent.$parent.current_user = null;
    $location.path('/');
  }, function (response) {
    $location.path('/');
  });
}]);

angular.module('users').controller('UsersRegisterController',
    ['$scope', '$location', 'user',
    function ($scope, $location, user) {
  $scope.user = user;
  $scope.register = function () {
    $scope.user.$save(function () {
      $location.path('/login');
      $scope.clearFlashes();
      $scope.addNotice("Now login with your new account!");
    }, function (response) {
      $scope.clearFlashes();
      angular.forEach(response.data||[], function (msg) {
        $scope.addError(msg);
      });
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
    }).
    when('/logout', {
      controller: 'UsersLogoutController',
      templateUrl: '/partials/users/logout.html'
    }).
    when('/register', {
      controller: 'UsersRegisterController',
      templateUrl: '/partials/users/register.html',
      resolve: {
        user: ['User', function (User) {
          return new User();
        }]
      }
    });
}]);
