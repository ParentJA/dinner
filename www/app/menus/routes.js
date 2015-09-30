(function (window, angular, undefined) {

  "use strict";

  function MenuController($scope, dishes) {}

  function MenusRouterConfig($stateProvider) {
    $stateProvider.state("meals.menus", {
      url: "/menus",
      templateUrl: "/static/menus/views/menus/menus.html",
      controller: "MenuController"
    });
  }

  angular.module("app")
    .controller("MenuController", ["$scope", "dishes", MenuController])
    .config(["$stateProvider", MenusRouterConfig]);

})(window, window.angular);