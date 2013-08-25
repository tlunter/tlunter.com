angular.module('resource.feed', ['ngResource']).factory('Feed', ['$resource', function ($resource) {
  return $resource('/feeds/:feed\.json', {}, 
    {
      'get': {method: 'GET', isArray: true}
    });
}]);

