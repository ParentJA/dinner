(function (window, angular, undefined) {

  "use strict";

  function RecipeDetailController($scope, recipesService) {
    $scope.selectedRecipe = {};
    $scope.totalFoods = 0;

    $scope.$watch(recipesService.getSelectedRecipe, function (newValue, oldValue) {
      $scope.selectedRecipe = recipesService.getSelectedRecipe();
      $scope.totalFoods = _.size($scope.selectedRecipe._foods);
    });
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