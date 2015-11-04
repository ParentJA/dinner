(function (window, angular, undefined) {

  "use strict";

  function FoodsController($scope, recipes, recipesService, foodsService, settingsService) {
    $scope.recipes = [];
    $scope.hasSelectedFoods = false;
    $scope.foods = [];
    $scope.matchingRecipes = [];
    $scope.numTotalFoods = 0;

    $scope.addSelectedFood = function addSelectedFood(food) {
      foodsService.addSelectedFood(food);
    };

    $scope.frequency = function frequency(food) {
      return Math.round(food.count / recipesService.getTotalRecipes() * 100);
    };

    $scope.getFoods = function getFoods() {
      var foods = foodsService.getFoods();

      // Remove food exclusions...
      foods = _.difference(foods, settingsService.getFoodExclusions());

      // Remove food tag exclusions...
      _.forEach(settingsService.getFoodTagExclusions(), function (tag) {
        foods = _.difference(foods, _.filter(foods, function (food) {
          return _.includes(food._tags, tag);
        }));
      });

      foods = _.difference(foods, settingsService.getFoodTagExclusions());

      // Remove selected foods...
      foods = _.difference(foods, foodsService.getSelectedFoods());

      return foods;
    };

    $scope.getSelectedFoods = function getSelectedFoods() {
      return foodsService.getSelectedFoods();
    };

    $scope.setSelectedRecipe = function setSelectedRecipe(recipe) {
      recipesService.setSelectedRecipe(recipe);
    };

    $scope.removeSelectedFood = function removeSelectedFood(food) {
      foodsService.removeSelectedFood(food);
    };

    $scope.$watchCollection($scope.getSelectedFoods, function (newValue, oldValue) {
      if (!_.isEqual(newValue, oldValue)) {
        $scope.hasSelectedFoods = !_.isEmpty(newValue);
        $scope.foods = $scope.getFoods();
        $scope.numTotalFoods = _.size($scope.foods);
        $scope.matchingRecipes = getMatchingRecipes();
      }
    });

    activate();

    function activate() {
      $scope.recipes = recipes.getRecipes();
      $scope.hasSelectedFoods = !_.isEmpty($scope.getSelectedFoods());
      $scope.foods = $scope.getFoods();
      $scope.numTotalFoods = _.size($scope.foods);
    }

    function getMatchingRecipes() {
      return recipesService.findRecipesWithFoods(foodsService.getSelectedFoods());
      /*return recipesService.findSimilarRecipes(
        foodsService.getSelectedFoods(),
        foodsService.getFoods()
      );*/
    }
  }

  angular.module("app")
    .controller("FoodsController", [
      "$scope", "recipes", "recipesService", "foodsService", "settingsService", FoodsController
    ]);

})(window, window.angular);