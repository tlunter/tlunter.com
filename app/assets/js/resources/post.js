angular.module('resource.post', ['ngResource']).factory('Post', ['$resource', function ($resource) {
  return $resource('/posts/:link\.json');
}]);

