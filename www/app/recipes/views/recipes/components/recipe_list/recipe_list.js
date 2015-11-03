(function (window, angular, undefined) {

  "use strict";

  function RecipeListController($scope, recipesService) {
    $scope.getRecipes = getRecipes;
    $scope.getTotalRecipes = getTotalRecipes;
    $scope.hasRecipes = hasRecipes;
    $scope.isSelectedRecipe = isSelectedRecipe;
    $scope.setSelectedRecipe = setSelectedRecipe;

    function getRecipes() {
      return recipesService.getRecipes();
    }

    function getTotalRecipes() {
      return _.size(recipesService.getRecipes());
    }

    function hasRecipes() {
      return recipesService.hasRecipes();
    }

    function isSelectedRecipe(value) {
      return recipesService.isSelectedRecipe(value);
    }

    function setSelectedRecipe(value) {
      recipesService.setSelectedRecipe(value);
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
    .controller("RecipeListController", ["$scope", "recipesService", RecipeListController])
    .directive("recipeList", [recipeList]);

})(window, window.angular);