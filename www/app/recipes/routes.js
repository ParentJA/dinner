(function (window, angular, undefined) {

  "use strict";

  function RecipesRouterConfig($stateProvider) {
    $stateProvider
      .state("meals.recipes", {
        url: "/recipes",
        templateUrl: "/static/recipes/views/recipes/recipes.html",
        controller: "RecipesController"
      })
      .state("meals.recipes.list", {
        url: "/list",
        templateUrl: "/static/recipes/views/recipes/components/recipe_list/recipe_list.html",
        controller: "RecipeListController"
      })
      .state("meals.recipes.detail", {
        url: "/detail/:recipeId",
        templateUrl: "/static/recipes/views/recipes/components/recipe_detail/recipe_detail.html",
        controller: "RecipeDetailController",
        resolve: {
          recipe: function ($q, $stateParams, loadRecipeService, recipes, recipesService) {
            var recipeId = $stateParams.recipeId;
            var recipe = _.find(recipes, "id", _.parseInt(recipeId));

            if (!recipesService.isFullRecipe(recipe)) {
              return loadRecipeService(recipeId);
            }

            return recipe;
          }
        }
      });
  }

  angular.module("app")
    .config(["$stateProvider", RecipesRouterConfig]);

})(window, window.angular);