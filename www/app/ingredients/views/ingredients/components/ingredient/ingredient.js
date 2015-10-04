(function (window, angular, undefined) {

  "use strict";

  function IngredientController($scope) {

  }

  function ingredient() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/ingredients/views/ingredients/components/ingredient/ingredient.html",
      controller: "IngredientController"
    };
  }

  angular.module("app")
    .directive("ingredient", ["$scope", ingredient]);

})(window, window.angular);