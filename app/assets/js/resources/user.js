angular.module('resource.user', ['ngResource']).factory('User',
    ['$resource', '$http', function ($resource, $http) {
  var User = $resource('/users/:id.json');

  var noop = angular.noop;

  User.prototype.login = function(success, error) {
    $http.post('/sessions.json', {
        email: this.email,
        password: this.password
      }).
      then(function (response) {
        (success||noop)(response);
      }, function (response) {
        (error||noop)(response);
      });
  };

  User.logout = function(success, error) {
    $http.delete('/sessions.json', {}).
      then(function (response) {
        (success||noop)(response);
      }, function (response) {
        (error||noop)(response);
      });
  };

  User.check = function(success, error) {
    $http.get('/sessions.json').
      then(function (response) {
        (success||noop)(response);
      }, function (response) {
        (error||noop)(response);
      });
  };

  return User;
}]);

