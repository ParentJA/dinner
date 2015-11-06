(function (window, angular, undefined) {

  "use strict";

  function RecipesRouterConfig($stateProvider) {
    $stateProvider.state("meals.recipes", {
      url: "/recipes",
      templateUrl: "/static/recipes/views/recipes/recipes.html",
      controller: "RecipesController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", RecipesRouterConfig]);

})(window, window.angular);