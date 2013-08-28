angular.module('resource.comment', ['ngResource']).factory('Comment', ['$resource', function ($resource) {
  return $resource('/comments/:link/:id.json');
}]);

