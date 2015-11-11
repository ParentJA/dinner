(function (window, angular, undefined) {

  "use strict";

  function FoodListController($scope) {}

  angular.module("app")
    .controller("FoodListController", ["$scope", FoodListController]);

})(window, window.angular);