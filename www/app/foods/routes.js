(function (window, angular, undefined) {

  "use strict";

  function FoodsRouterConfig($stateProvider) {
    $stateProvider
      .state("meals.foods", {
        url: "/foods",
        templateUrl: "/static/foods/views/foods/foods.html",
        controller: "FoodsController"
      })
      .state("meals.foods.list", {
        url: "/list",
        templateUrl: "/static/foods/views/foods/components/food_list/food_list.html",
        controller: "FoodListController"
      })
      .state("meals.foods.match_list", {
        url: "/match_list",
        templateUrl: "/static/foods/views/foods/components/food_match_list/food_match_list.html",
        controller: "FoodMatchListController"
      });
  }

  angular.module("app")
    .config(["$stateProvider", FoodsRouterConfig]);

})(window, window.angular);