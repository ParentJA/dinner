(function (window, angular, undefined) {
  
  "use strict";

  function PantryController($scope, dishes, ingredientsService) {
    $scope.availableIngredients = [];
    $scope.emptyMethod = _.noop;
    $scope.hasSelectedIngredients = false;
    $scope.numAvailableIngredients = 0;
    $scope.numPantryIngredients = 0;
    $scope.pantryIngredients = [];

    $scope.getAvailableIngredients = function getAvailableIngredients() {
      return $scope.availableIngredients;
    };

    $scope.getIngredients = function getIngredients() {
      return ingredientsService.getIngredients();
    };

    $scope.getPantryIngredients = function getPantryIngredients() {
      return $scope.pantryIngredients;
    };

    $scope.moveAvailableIngredient = function moveAvailableIngredient(ingredient) {
      $scope.pantryIngredients.push(_.remove($scope.availableIngredients, ingredient)[0]);
    };

    $scope.movePantryIngredient = function movePantryIngredient(ingredient) {
      $scope.availableIngredients.push(_.remove($scope.pantryIngredients, ingredient)[0]);
    };

    $scope.$watchCollection($scope.getIngredients, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.availableIngredients = newValue;
      }
    });

    $scope.$watchCollection("availableIngredients", function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.availableIngredients = newValue;
        $scope.numAvailableIngredients = _.size(newValue);
      }
    });

    $scope.$watchCollection("pantryIngredients", function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.pantryIngredients = newValue;
        $scope.numPantryIngredients = _.size(newValue);
      }
    });

    $scope.$watchCollection($scope.getSelectedIngredients, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.hasSelectedIngredients = !_.isEmpty(ingredientsService.getSelectedIngredients());
      }
    });
  }

  angular.module("app")
    .controller("PantryController", [
      "$scope", "dishes", "ingredientsService", PantryController
    ]);

})(window, window.angular);