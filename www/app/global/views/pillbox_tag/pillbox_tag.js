(function (window, angular, undefined) {

  "use strict";

  function PillboxTagController($scope) {}

  function pillboxTag() {
    return {
      restrict: "A",
      require: "^pillbox",
      scope: {
        tag: "=",
        removeTag: "&"
      },
      templateUrl: "/static/views/pillbox_tag.html",
      controller: "PillboxTagController"
    };
  }

  angular.module("app")
    .controller("PillboxTagController", ["$scope", PillboxTagController])
    .directive("pillboxTag", [pillboxTag]);

})(window, window.angular);