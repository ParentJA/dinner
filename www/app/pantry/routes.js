(function (window, angular, undefined) {

  "use strict";

  function PantryController($scope, dishes) {}

  function PantryRouterConfig($stateProvider) {
    $stateProvider.state("meals.pantry", {
      url: "/pantry",
      templateUrl: "/static/pantry/views/pantry/pantry.html",
      controller: "PantryController"
    });
  }

  angular.module("app")
    .controller("PantryController", ["$scope", "dishes", PantryController])
    .config(["$stateProvider", PantryRouterConfig]);

})(window, window.angular);