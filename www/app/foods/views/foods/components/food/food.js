(function (window, angular, undefined) {

  "use strict";

  function FoodController($scope) {

  }

  function food() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/foods/views/foods/components/food/food.html",
      controller: "FoodController"
    };
  }

  angular.module("app")
    .directive("food", ["$scope", food]);

})(window, window.angular);