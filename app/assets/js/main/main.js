angular.module('main', [])

angular.module('main').controller('MainController',
    ['$scope', '$timeout',
    function ($scope, $timeout) {
  $scope.notices = [];
  $scope.errors = [];

  $scope.removeItem = function (array, id) {
    var toRemove = [];
    angular.forEach(array, function (value, key) {
      if(value.id === id) {
        toRemove.push(key);
      }
    });

    angular.forEach(toRemove, function (value) {
      array[value].toRemove = true;
    });

    $timeout(function () {
      var remove = [];

      angular.forEach(array, function (value, key) {
        if(value.id === id) {
          remove.push(key);
        }
      });

      angular.forEach(remove, function (value) {
        array.splice(value, 1);
      });
    }, 150);
  }

  $scope.removeError = function (errorId) {
    $scope.removeItem($scope.errors, errorId);
  }

  $scope.removeNotice = function (noticeId) {
    $scope.removeItem($scope.notices, noticeId);
  }

  $scope.addError = function (errorTxt) {
    var newIndex = $scope.lastId($scope.errors) + 1;
    $scope.errors.push({id: newIndex, text: errorTxt});
    $timeout(function () { $scope.removeError(newIndex); }, 3000);
  };

  $scope.addNotice = function (noticeTxt) {
    var newIndex = $scope.lastId($scope.notices) + 1;
    $scope.notices.push({id: newIndex, text: noticeTxt});
    $timeout(function () { $scope.removeNotice(newIndex); }, 3000);
  };

  $scope.clearFlashes = function () {
    $scope.clearErrors();
    $scope.clearNotices();
  };

  $scope.clearErrors = function () {
    $scope.errors = [];
  };

  $scope.clearNotices = function () {
    $scope.notices = [];
  };

  $scope.lastId = function (array) {
    if (array.length === 0) return 0;
    return array[array.length - 1].id;
  };
}]);
