angular.module('resource.post', ['ngResource']).factory('Post', ['$resource', function ($resource) {
  return $resource('/posts/:link.json', null,
    {
      'get_clean': {
        method: 'GET',
        params: { clean: true }
      }
    });
}]);

