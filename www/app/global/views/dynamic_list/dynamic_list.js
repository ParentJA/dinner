(function (window, angular, undefined) {

  "use strict";

  function DynamicListController($scope) {
    $scope.addElement = addElement;
    $scope.name = null;
    $scope.onKeyPressed = onKeyPressed;
    $scope.removeElement = removeElement;

    function addElement(name) {
      var element = _.find($scope.getCollection(), {name: name});

      if (!_.isEmpty(element) && !_.includes($scope.getElements(), element)) {
        $scope.addFn({element: element});
      }
    }

    function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addElement($scope.name);
        $scope.name = null;
      }
    }

    function removeElement(element) {
      $scope.removeFn({element: element});
    }
  }

  function dynamicList() {
    return {
      restrict: "A",
      scope: {
        getCollection: "&collection",
        getElements: "&elements",
        addFn: "&",
        removeFn: "&"
      },
      templateUrl: "/static/global/views/dynamic_list/dynamic_list.html",
      controller: "DynamicListController"
    };
  }

  angular.module("app")
    .controller("DynamicListController", ["$scope", DynamicListController])
    .directive("dynamicList", [dynamicList]);

})(window, window.angular);