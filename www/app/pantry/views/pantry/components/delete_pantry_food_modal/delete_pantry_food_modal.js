(function (window, angular, undefined) {

  "use strict";

  function DeletePantryFoodModalController($scope, $uibModalInstance, food, pantry) {
    $scope.food = food;
    $scope.pantry = pantry;

    $scope.cancel = function cancel() {
      $uibModalInstance.dismiss("cancel");
    };

    $scope.submit = function submit() {
      $uibModalInstance.close({
        pantryId: pantry.id,
        foodId: food.id
      });
    };
  }

  angular.module("app")
    .controller("DeletePantryFoodModalController", [
      "$scope", "$uibModalInstance", "food", "pantry", DeletePantryFoodModalController
    ]);

})(window, window.angular);