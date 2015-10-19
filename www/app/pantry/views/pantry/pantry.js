(function (window, angular, undefined) {
  
  "use strict";

  function PantryController($scope, deletePantryIngredientsService, dishes, ingredientsService, pantries, updatePantryIngredientsService) {
    $scope.availableIngredients = [];
    $scope.emptyMethod = _.noop;
    $scope.hasSelectedIngredients = false;
    $scope.numAvailableIngredients = 0;
    $scope.numPantryIngredients = 0;
    $scope.pantryIngredients = [];

    $scope.getAvailableIngredients = function getAvailableIngredients() {
      return $scope.availableIngredients;
    };

    $scope.getPantryIngredients = function getPantryIngredients() {
      return $scope.pantryIngredients;
    };

    $scope.moveAvailableIngredient = function moveAvailableIngredient(ingredient) {
      var availableIngredient = _.remove($scope.availableIngredients, ingredient)[0];

      updatePantryIngredientsService(availableIngredient).then(function (response) {
        $scope.pantryIngredients.push(availableIngredient);
      });
    };

    $scope.movePantryIngredient = function movePantryIngredient(ingredient) {
      var pantryIngredient = _.remove($scope.pantryIngredients, ingredient)[0];

      deletePantryIngredientsService(pantryIngredient).then(function (response) {
        $scope.availableIngredients.push(pantryIngredient);
      });
    };

    $scope.$watchCollection("availableIngredients", function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.numAvailableIngredients = _.size(newValue);
      }
    });

    $scope.$watchCollection("pantryIngredients", function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.numPantryIngredients = _.size(newValue);
      }
    });

    $scope.$watchCollection($scope.getSelectedIngredients, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.hasSelectedIngredients = !_.isEmpty(ingredientsService.getSelectedIngredients());
      }
    });

    activate();

    function activate() {
      var pantryIngredientIds = _.first(pantries.getPantries()).ingredients;
      var pantryIngredients = [];
      var availableIngredients = [];

      _.forEach(dishes.getIngredients(), function (ingredient) {
        if (_.indexOf(pantryIngredientIds, ingredient.id) !== -1) {
          pantryIngredients.push(ingredient);
        }
        else {
          availableIngredients.push(ingredient);
        }
      });

      $scope.pantryIngredients = pantryIngredients;
      $scope.availableIngredients = availableIngredients;
    }
  }

  angular.module("app")
    .controller("PantryController", [
      "$scope", "deletePantryIngredientsService", "dishes", "ingredientsService", "pantries",
      "updatePantryIngredientsService", PantryController
    ]);

})(window, window.angular);