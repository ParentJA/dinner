(function (window, angular, undefined) {

  "use strict";

  function UpdatePantryFoodModalController($scope, $uibModalInstance) {
    $scope.cancel = function cancel() {

    };

    $scope.submit = function submit() {

    };
  }

  angular.module("app")
    .controller("UpdatePantryFoodModalController", ["$scope", "$uibModalInstance", UpdatePantryFoodModalController]);

})(window, window.angular);