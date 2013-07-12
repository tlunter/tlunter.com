var feed_module = angular.module('feed_module', []);

feed_module.config(function($locationProvider, $routeProvider) {
  $locationProvider.htnl5Mode(true);
  $routeProvider.
    when('/:feed', {
      templateUrl: '/partials/github.html',
      controller: 'feed_controller'
    }).
    otherwise({ redirectTo: '/github' });
});

