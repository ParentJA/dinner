(function (window, angular, undefined) {

  "use strict";

  function PantryRouterConfig($stateProvider) {
    $stateProvider.state("meals.pantry", {
      url: "/pantry",
      templateUrl: "/static/pantry/views/pantry/pantry.html",
      controller: "PantryController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", PantryRouterConfig]);

})(window, window.angular);