(function (window, angular, undefined) {
  "use strict";

  function dishList() {
    return {
      restrict: "A",
      scope: {
        dishes: "=",
        selectedDish: "="
      },
      templateUrl: "/static/views/dish_list.html",
      controller: "DishListController"
    };
  }

  function dishDetail() {
    return {
      restrict: "A",
      scope: {
        selectedDish: "="
      },
      templateUrl: "/static/views/dish_detail.html",
      controller: "DishDetailController"
    };
  }

  angular.module("app")
    .directive("dishList", [dishList])
    .directive("dishDetail", [dishDetail]);

})(window, window.angular);