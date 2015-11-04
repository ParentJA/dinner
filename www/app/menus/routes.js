(function (window, angular, undefined) {

  "use strict";

  function MenusRouterConfig($stateProvider) {
    $stateProvider.state("meals.menus", {
      url: "/menus",
      templateUrl: "/static/menus/views/menus/menus.html",
      controller: "MenuController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", MenusRouterConfig]);

})(window, window.angular);