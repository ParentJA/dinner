(function (window, angular, undefined) {

  "use strict";

  function PantryController($scope, $uibModal, createPantryFoodsService, deletePantryFoodsService, foodsService, pantries, recipes, unitsOfMeasure, updatePantryFoodsService) {
    $scope.availableFoods = [];
    $scope.emptyMethod = _.noop;
    $scope.hasSelectedFoods = false;
    $scope.numAvailableFoods = 0;
    $scope.numPantryFoods = 0;
    $scope.pantry = {};
    $scope.pantryFoods = [];

    $scope.getAvailableFoods = function getAvailableFoods() {
      return $scope.availableFoods;
    };

    $scope.getPantryFoods = function getPantryFoods() {
      return $scope.pantryFoods;
    };

    $scope.moveAvailableFood = function moveAvailableFood(food) {
      // Handle modal...
      var modalInstance = $uibModal.open({
        animation: true,
        controller: "CreatePantryFoodModalController",
        size: "sm",
        templateUrl: "/static/pantry/views/pantry/components/create_pantry_food_modal/create_pantry_food_modal.html",
        resolve: {
          pantry: $scope.pantry,
          food: food
        }
      });

      modalInstance.result.then(function (payload) {
        createPantryFoodsService(
          payload.pantryId,
          payload.foodId,
          payload.amount,
          payload.unitOfMeasureId
        ).then(function (response) {
          $scope.pantryFoods.push(_.first(_.remove($scope.availableFoods, food)));
        });
      });
    };

    $scope.movePantryFood = function movePantryFood(food) {
      // Handle modal...
      var modalInstance = $uibModal.open({
        animation: true,
        controller: "DeletePantryFoodModalController",
        size: "sm",
        templateUrl: "/static/pantry/views/pantry/components/delete_pantry_food_modal/delete_pantry_food_modal.html",
        resolve: {
          pantry: $scope.pantry,
          food: food
        }
      });

      modalInstance.result.then(function (payload) {
        deletePantryFoodsService(payload.pantryId, payload.foodId).then(function (response) {
          $scope.availableFoods.push(_.first(_.remove($scope.pantryFoods, food)));
        });
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

      $scope.pantry = _.first(pantries.getPantries());
      $scope.pantryFoods = pantryFoods;
      $scope.availableFoods = availableFoods;
    }
  }

  angular.module("app")
    .controller("PantryController", [
      "$scope", "$uibModal", "createPantryFoodsService", "deletePantryFoodsService", "foodsService", "pantries",
      "recipes", "unitsOfMeasure", "updatePantryFoodsService", PantryController
    ]);

})(window, window.angular);