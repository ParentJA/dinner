(function (window, angular, undefined) {

  "use strict";

  function FoodsRouterConfig($stateProvider) {
    $stateProvider.state("meals.foods", {
      url: "/foods",
      templateUrl: "/static/foods/views/foods/foods.html",
      controller: "FoodsController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", FoodsRouterConfig]);

})(window, window.angular);