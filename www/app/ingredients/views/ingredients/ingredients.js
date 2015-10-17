(function (window, angular, undefined) {

  "use strict";

  function IngredientsController($scope, dishes, dishesService, ingredientsService, settingsService) {
    $scope.hasSelectedIngredients = false;
    $scope.ingredients = [];
    $scope.matchingDishes = [];
    $scope.numTotalIngredients = 0;

    $scope.addSelectedIngredient = function addSelectedIngredient(ingredient) {
      ingredientsService.addSelectedIngredient(ingredient);
    };

    $scope.frequency = function frequency(ingredient) {
      return Math.round(ingredient.count / dishesService.getTotalDishes() * 100);
    };

    $scope.getDishes = function getDishes() {
      return dishesService.getDishes();
    };

    $scope.getIngredients = function getIngredients() {
      var ingredients = ingredientsService.getIngredients();

      // Remove ingredient exclusions...
      ingredients = _.difference(ingredients, settingsService.getIngredientExclusions());

      // Remove ingredient tag exclusions...
      _.forEach(settingsService.getIngredientTagExclusions(), function (tag) {
        ingredients = _.difference(ingredients, _.filter(ingredients, function (ingredient) {
          return _.includes(ingredient._tags, tag);
        }));
      });

      ingredients = _.difference(ingredients, settingsService.getIngredientTagExclusions());

      // Remove selected ingredients...
      ingredients = _.difference(ingredients, ingredientsService.getSelectedIngredients());

      return ingredients;
    };

    $scope.getSelectedIngredients = function getSelectedIngredients() {
      return ingredientsService.getSelectedIngredients();
    };

    $scope.setSelectedDish = function setSelectedDish(dish) {
      dishesService.setSelectedDish(dish);
    };

    $scope.removeSelectedIngredient = function removeSelectedIngredient(ingredient) {
      ingredientsService.removeSelectedIngredient(ingredient);
    };

    $scope.$watchCollection($scope.getDishes, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.dishes = newValue;
      }
    });

    $scope.$watchCollection($scope.getIngredients, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.ingredients = newValue;
        $scope.numTotalIngredients = _.size(newValue);
      }
    });

    $scope.$watchCollection($scope.getSelectedIngredients, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.hasSelectedIngredients = !_.isEmpty(ingredientsService.getSelectedIngredients());
        $scope.matchingDishes = getMatchingDishes();
      }
    });

    function getMatchingDishes() {
      return dishesService.findDishesWithIngredients(ingredientsService.getSelectedIngredients());
      /*return dishesService.findSimilarDishes(
        ingredientsService.getSelectedIngredients(),
        ingredientsService.getIngredients()
      );*/
    }
  }

  angular.module("app")
    .controller("IngredientsController", [
      "$scope", "dishes", "dishesService", "ingredientsService", "settingsService", IngredientsController
    ]);

})(window, window.angular);