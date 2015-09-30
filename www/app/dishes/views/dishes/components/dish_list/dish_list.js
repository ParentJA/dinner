(function (window, angular, undefined) {

  "use strict";

  function DishListController($scope, dishesService) {
    $scope.getDishes = getDishes;
    $scope.getTotalDishes = getTotalDishes;
    $scope.hasDishes = hasDishes;
    $scope.isSelectedDish = isSelectedDish;
    $scope.setSelectedDish = setSelectedDish;

    function getDishes() {
      return dishesService.getDishes();
    }

    function getTotalDishes() {
      return _.size(dishesService.getDishes());
    }

    function hasDishes() {
      return dishesService.hasDishes();
    }

    function isSelectedDish(value) {
      return dishesService.isSelectedDish(value);
    }

    function setSelectedDish(value) {
      dishesService.setSelectedDish(value);
    }
  }

  function dishList() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/views/dish_list.html",
      controller: "DishListController"
    };
  }

  angular.module("app")
    .controller("DishListController", ["$scope", "dishesService", DishListController])
    .directive("dishList", [dishList])

})(window, window.angular);