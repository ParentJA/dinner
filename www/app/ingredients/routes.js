(function (window, angular, undefined) {

  "use strict";

  function IngredientsRouterConfig($stateProvider) {
    $stateProvider.state("meals.ingredients", {
      url: "/ingredients",
      templateUrl: "/static/ingredients/views/ingredients/ingredients.html",
      controller: "IngredientsController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", IngredientsRouterConfig]);

})(window, window.angular);