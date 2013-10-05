angular.module('about', ['ngRoute']);

angular.module('about').controller('AboutController',
    function() {
});

angular.module('about').controller('ContributionsController',
    function() {
});

angular.module('about').config(
    ['$routeProvider',
    function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: '/partials/about.html',
    controller: 'AboutController'
  })
  .when('/contributions', {
    templateUrl: '/partials/contributions.html',
    controller: 'ContributionsController'
  });
}]);
