(function (window, angular, undefined) {
  
  "use strict";

  function MenuController($scope, recipes) {}

  angular.module("app")
    .controller("MenuController", ["$scope", "recipes", MenuController]);

})(window, window.angular);