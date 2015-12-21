(function (window, angular, undefined) {

  "use strict";

  function RecipeDetailController($scope, recipe, recipes, recipesService, saveRecipeService) {
    $scope.recipe = recipe;
    $scope.recipeIngredients = [];
    $scope.totalFoods = 0;

    $scope.isRecipeInProgress = function isRecipeInProgress() {
      return recipesService.isRecipeInProgress(recipe);
    };

    $scope.setRecipeInProgress = function setRecipeInProgress(value) {
      saveRecipeService(recipe.id, value);
    };

    $scope.getRating = function getRating() {
      return recipe.rating;
    };

    $scope.setRating = function setRating(rating) {
      saveRecipeService(recipe.id, null, rating);
    };

    $scope.isFavorite = function isFavorite() {
      return recipe.isFavorite;
    };

    $scope.setFavorite = function setFavorite(isFavorite) {
      saveRecipeService(recipe.id, null, null, isFavorite);
    };

    activate();

    function activate() {
      // Handle selected recipe ingredients...
      var hasValidIngredients = (
        _.has(recipe, "ingredients") &&
        _.some(recipe.ingredients, function (ingredient) {
          return !_.isEmpty(ingredient.description);
        })
      );

      if (hasValidIngredients) {
        $scope.recipeIngredients = _.map(recipe.ingredients, "description");
      }
      else {
        $scope.recipeIngredients = _.map(recipe._foods, "name");
      }

      $scope.totalFoods = _.size(recipe._foods);
    }
  }

  function recipeDetail() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/recipes/views/recipes/components/recipe_detail/recipe_detail.html",
      controller: "RecipeDetailController"
    };
  }

  angular.module("app")
    .controller("RecipeDetailController", [
      "$scope", "recipe", "recipes", "recipesService", "saveRecipeService", RecipeDetailController
    ])
    .directive("recipeDetail", [recipeDetail]);

})(window, window.angular);