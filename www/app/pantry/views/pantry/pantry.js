(function (window, angular, undefined) {
  
  "use strict";

  function PantryController($scope, createPantryFoodsService, deletePantryFoodsService, recipes, foodsService, pantries, updatePantryFoodsService) {
    $scope.availableFoods = [];
    $scope.emptyMethod = _.noop;
    $scope.hasSelectedFoods = false;
    $scope.numAvailableFoods = 0;
    $scope.numPantryFoods = 0;
    $scope.pantryFoods = [];

    $scope.getAvailableFoods = function getAvailableFoods() {
      return $scope.availableFoods;
    };

    $scope.getPantryFoods = function getPantryFoods() {
      return $scope.pantryFoods;
    };

    $scope.moveAvailableFood = function moveAvailableFood(food) {
      var availableFood = _.remove($scope.availableFoods, food)[0];

      createPantryFoodsService(availableFood).then(function (response) {
        $scope.pantryFoods.push(availableFood);
      });
    };

    $scope.movePantryFood = function movePantryFood(food) {
      var pantryFood = _.remove($scope.pantryFoods, food)[0];

      deletePantryFoodsService(pantryFood).then(function (response) {
        $scope.availableFoods.push(pantryFood);
      });
    };

    $scope.$watchCollection("availableFoods", function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.numAvailableFoods = _.size(newValue);
      }
    });

    $scope.$watchCollection("pantryFoods", function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.numPantryFoods = _.size(newValue);
      }
    });

    $scope.$watchCollection($scope.getSelectedFoods, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.hasSelectedFoods = !_.isEmpty(foodsService.getSelectedFoods());
      }
    });

    activate();

    function activate() {
      var pantryFoodIds = _.first(pantries.getPantries()).foods;
      var pantryFoods = [];
      var availableFoods = [];

      _.forEach(recipes.getFoods(), function (food) {
        if (_.indexOf(pantryFoodIds, food.id) !== -1) {
          pantryFoods.push(food);
        }
        else {
          availableFoods.push(food);
        }
      });

      $scope.pantryFoods = pantryFoods;
      $scope.availableFoods = availableFoods;
    }
  }

  angular.module("app")
    .controller("PantryController", [
      "$scope", "createPantryFoodsService", "deletePantryFoodsService", "recipes", "foodsService", "pantries",
      "updatePantryFoodsService", PantryController
    ]);

})(window, window.angular);