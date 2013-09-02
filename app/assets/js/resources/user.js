angular.module('resource.user', ['ngResource']).factory('User',
    ['$resource', '$http', function ($resource, $http) {
  var User = $resource('/users/:id.json');

  User.prototype.login = function(success, error) {
    $http.post('/sessions.json', {
        email: this.email,
        password: this.password
      })
      .then(function (response) {
        console.log("success");
      }, function (response) {
        console.log("failure");
      });
      
  };

  User.prototype.logout = function(success, error) {
    $http.delete('/sessions.json', {})
      .then(function (response) {
        console.log("success");
      }, function (response) {
        console.log("failure");
      });
  };

  return User;
}]);

