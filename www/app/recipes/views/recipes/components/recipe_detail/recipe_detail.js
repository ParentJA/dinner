(function (window, angular, undefined) {

  "use strict";

  function RecipeDetailController($scope, recipesService) {
    $scope.getSelectedRecipe = getSelectedRecipe;
    $scope.getTotalFoods = getTotalFoods;

    function getSelectedRecipe() {
      return recipesService.getSelectedRecipe();
    }

    function getTotalFoods() {
      return _.size(recipesService.getSelectedRecipe()._foods);
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
    .controller("RecipeDetailController", ["$scope", "recipesService", RecipeDetailController])
    .directive("recipeDetail", [recipeDetail]);

})(window, window.angular);