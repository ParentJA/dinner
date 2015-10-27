(function (window, angular, undefined) {

  "use strict";

  function RecipesController($scope, dishes, recipes) {
  }

  function RecipesRouterConfig($stateProvider) {
    $stateProvider.state("meals.recipes", {
      url: "/recipes",
      templateUrl: "/static/recipes/views/recipes/recipes.html",
      controller: "RecipesController",
      resolve: {
        recipes: function (loadRecipesService, recipesModel) {
          if (_.isEmpty(recipesModel.getRecipes())) {
            return loadRecipesService();
          }

          return recipesModel;
        }
      }
    });
  }

  angular.module("app")
    .controller("RecipesController", ["$scope", "dishes", "recipes", RecipesController])
    .config(["$stateProvider", RecipesRouterConfig]);

})(window, window.angular);