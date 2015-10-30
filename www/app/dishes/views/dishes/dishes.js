(function (window, angular, undefined) {

  "use strict";

  function DishesController($scope, dishes) {}

  angular.module("app")
    .controller("DishesController", ["$scope", "dishes", "dishesService", DishesController]);

})(window, window.angular);