(function (window, angular, undefined) {

  "use strict";

  function PillboxController($scope) {
    $scope.addTag = addTag;
    $scope.onKeyPressed = onKeyPressed;
    $scope.removeTag = removeTag;
    $scope.tagName = null;

    function addTag(tagName) {
      var tagObject = _.findWhere($scope.getCollection(), {name: tagName});

      if (tagObject && !_.includes($scope.exclusions, tagObject)) {
        $scope.exclusions.push(tagObject);
      }
    }

    function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addTag($scope.tagName);
        $scope.tagName = null;
      }
    }

    function removeTag(tag) {
      _.remove($scope.exclusions, tag);
    }
  }

  function pillbox() {
    return {
      restrict: "A",
      scope: {
        getCollection: "&collection",
        exclusions: "="
      },
      templateUrl: "/static/views/pillbox.html",
      controller: "PillboxController"
    };
  }

  angular.module("app")
    .controller("PillboxController", ["$scope", PillboxController])
    .directive("pillbox", [pillbox]);

})(window, window.angular);