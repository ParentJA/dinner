(function (window, angular, undefined) {

  "use strict";

  function DishController($scope) {

  }

  function dish() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/dishes/views/dishes/components/dish/dish.html",
      controller: "DishController"
    };
  }

  angular.module("app")
    .directive("dish", ["$scope", dish]);

})(window, window.angular);