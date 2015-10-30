(function (window, angular, undefined) {

  "use strict";

  function DishesRouterConfig($stateProvider) {
    $stateProvider.state("meals.dishes", {
      url: "/dishes",
      templateUrl: "/static/dishes/views/dishes/dishes.html",
      controller: "DishesController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", DishesRouterConfig]);

})(window, window.angular);