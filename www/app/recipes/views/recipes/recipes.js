(function (window, angular, undefined) {

  "use strict";

  function RecipesController($scope, recipes) {}

  angular.module("app")
    .controller("RecipesController", ["$scope", "recipes", "recipesService", RecipesController]);

})(window, window.angular);