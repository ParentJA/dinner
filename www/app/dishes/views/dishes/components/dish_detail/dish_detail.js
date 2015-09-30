(function (window, angular, undefined) {

  "use strict";

  function DishDetailController($scope, dishesService) {
    $scope.getSelectedDish = getSelectedDish;
    $scope.getTotalIngredients = getTotalIngredients;

    function getSelectedDish() {
      return dishesService.getSelectedDish();
    }

    function getTotalIngredients() {
      return _.size(dishesService.getSelectedDish()._ingredients);
    }
  }

  function dishDetail() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/dishes/views/dishes/dish_detail.html",
      controller: "DishDetailController"
    };
  }

  angular.module("app")
    .controller("DishDetailController", ["$scope", "dishesService", DishDetailController])
    .directive("dishDetail", [dishDetail]);

})(window, window.angular);