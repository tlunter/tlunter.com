angular.module('main', [])

angular.module('main').controller('MainController',
    ['$scope', function ($scope) {
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
      array.splice(value, 1);
    });
  }

  $scope.removeError = function (errorId) {
    $scope.removeItem($scope.errors, errorId);
  }

  $scope.removeNotice = function (noticeId) {
    $scope.removeItem($scope.notices, noticeId);
  }

  $scope.addError = function (errorTxt) {
    $scope.errors.push({id: $scope.lastId($scope.errors) + 1, text: errorTxt});
  };

  $scope.addNotice = function (noticeTxt) {
    $scope.notices.push({id: $scope.lastId($scope.notices) + 1, text: noticeTxt});
  };

  $scope.lastId = function (array) {
    if (array.length === 0) return 0;
    return array[array.length - 1].id;
  };
}]);
