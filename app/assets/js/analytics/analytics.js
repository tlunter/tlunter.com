angular.module('analytics', []).service(
    'analytics', ['$rootScope','$window','$location', function ($rootScope, $window, $location) {
      var track = function() {
        console.log("Sending pageview");
        $window.ga('send', 'pageview', $location.path());
      };
      $rootScope.$on('$viewContentLoaded', track);
    }
]);
