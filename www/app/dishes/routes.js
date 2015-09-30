(function (window, angular, undefined) {

  "use strict";

  function DishesController($scope, dishes, dishesService) {}

  function DishesRouterConfig($stateProvider) {
    $stateProvider.state("meals.dishes", {
      url: "/dishes",
      templateUrl: "/static/dishes/views/dishes/dishes.html",
      controller: "DishesController"
    });
  }

  angular.module("app")
    .controller("DishesController", ["$scope", "dishes", "dishesService", DishesController])
    .config(["$stateProvider", DishesRouterConfig]);

})(window, window.angular);