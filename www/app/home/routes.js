(function (window, angular, undefined) {

  "use strict";

  function HomeController($scope) {}

  function HomeRouterConfig($stateProvider) {
    $stateProvider.state("home", {
      url: "/",
      templateUrl: "/static/home/views/home/home.html",
      controller: "HomeController"
    });
  }

  angular.module("app")
    .controller("HomeController", ["$scope", HomeController])
    .config(["$stateProvider", HomeRouterConfig]);

})(window, window.angular);