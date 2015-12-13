(function (window, angular, undefined) {

  "use strict";

  function RecipeListController($scope, $state, recipesService) {
    $scope.hasRecipes = false;
    $scope.recipes = [];
    $scope.totalRecipes = 0;

    $scope.onKeyPressed = function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $state.go("meals.recipes.detail", {
          recipeId: $scope.recipe.id
        });

        // Clear recipe...
        $scope.recipe = null;
      }
    };

    $scope.isSelectedRecipe = function isSelectedRecipe(value) {
      return recipesService.isSelectedRecipe(value);
    };

    $scope.setSelectedRecipe = function setSelectedRecipe(value) {
      recipesService.setSelectedRecipe(value);
    };

    activate();

    function activate() {
      $scope.hasRecipes = recipesService.hasRecipes();
      $scope.recipes = recipesService.getRecipes();
      $scope.totalRecipes = _.size($scope.recipes);
    }
  }

  function recipeList() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/recipes/views/recipes/components/recipe_list/recipe_list.html",
      controller: "RecipeListController"
    };
  }

  angular.module("app")
    .controller("RecipeListController", ["$scope", "$state", "recipesService", RecipeListController])
    .directive("recipeList", [recipeList]);

})(window, window.angular);