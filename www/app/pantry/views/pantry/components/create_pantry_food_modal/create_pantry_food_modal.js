(function (window, angular, undefined) {

  "use strict";

  function CreatePantryFoodModalController($scope, $uibModalInstance, food, pantry, unitsOfMeasureModel) {
    $scope.amount = 0;
    $scope.food = food;
    $scope.pantry = pantry;
    $scope.unitOfMeasure = {};
    $scope.unitsOfMeasure = [];

    $scope.cancel = function cancel() {
      $uibModalInstance.dismiss("cancel");
    };

    $scope.submit = function submit() {
      $uibModalInstance.close({
        pantryId: pantry.id,
        foodId: food.id,
        amount: $scope.amount,
        unitOfMeasureId: $scope.unitOfMeasure.id
      });
    };

    activate();

    function activate() {
      $scope.unitsOfMeasure = unitsOfMeasureModel.getUnitsOfMeasure();
    }
  }

  angular.module("app")
    .controller("CreatePantryFoodModalController", [
      "$scope", "$uibModalInstance", "food", "pantry", "unitsOfMeasureModel", CreatePantryFoodModalController
    ]);

})(window, window.angular);