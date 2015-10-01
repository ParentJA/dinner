(function (window, angular, undefined) {

  "use strict";

  function IngredientsController($scope, dishes, dishesService, ingredientsService, settingsService) {
    $scope.addSelectedIngredient = addSelectedIngredient;
    $scope.frequency = frequency;
    $scope.getDishes = getDishes;
    $scope.getDishByName = getDishByName;
    $scope.getIngredients = getIngredients;
    $scope.getMatchingDishes = getMatchingDishes;
    $scope.getNumMatchingDishes = getNumMatchingDishes;
    $scope.getSelectedIngredient = getSelectedIngredient;
    $scope.getSelectedIngredients = getSelectedIngredients;
    $scope.getTotalIngredients = getTotalIngredients;
    $scope.hasSelectedIngredients = hasSelectedIngredients;
    $scope.numIngredients = 15;
    $scope.setSelectedDish = setSelectedDish;
    $scope.setSelectedIngredient = setSelectedIngredient;
    $scope.removeSelectedIngredient = removeSelectedIngredient;

    function addSelectedIngredient(ingredient) {
      ingredientsService.addSelectedIngredient(ingredient);
    }

    function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishesService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    }

    function getDishes() {
      return dishesService.getDishes();
    }

    function getDishByName(name) {
      return _.find(dishesService.getDishes(), "name", name);
    }

    function getIngredients() {
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
    }

    function getMatchingDishes() {
      return dishesService.findDishesWithIngredients(ingredientsService.getSelectedIngredients());
    }

    function getNumMatchingDishes() {
      return _.size($scope.getMatchingDishes());
    }

    function getSelectedIngredient() {
      return ingredientsService.getSelectedIngredient();
    }

    function getSelectedIngredients() {
      return ingredientsService.getSelectedIngredients();
    }

    function getTotalIngredients() {
      return _.size($scope.getIngredients());
    }

    function hasSelectedIngredients() {
      return !_.isEmpty(ingredientsService.getSelectedIngredients());
    }

    function setSelectedDish(dish) {
      dishesService.setSelectedDish(dish);
    }

    function setSelectedIngredient(ingredient) {
      ingredientsService.setSelectedIngredient(ingredient);
    }

    function removeSelectedIngredient(ingredient) {
      ingredientsService.removeSelectedIngredient(ingredient);
    }
  }

  function IngredientsRouterConfig($stateProvider) {
    $stateProvider.state("meals.ingredients", {
      url: "/ingredients",
      templateUrl: "/static/ingredients/views/ingredients/ingredients.html",
      controller: "IngredientsController"
    });
  }

  angular.module("app")
    .controller("IngredientsController", [
      "$scope", "dishes", "dishesService", "ingredientsService", "settingsService", IngredientsController
    ])
    .config(["$stateProvider", IngredientsRouterConfig]);

})(window, window.angular);