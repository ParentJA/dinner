(function (window, angular, undefined) {

  "use strict";

  function RatingStarController($scope) {
    $scope.filled = false;
    $scope.selected = false;

    $scope.fill = function fill() {
      return ($scope.filled) ? "fa-star" : "fa-star-o";
    };

    $scope.select = function select(rating) {
      $scope.filled = $scope.selected = false;

      if ($scope.rating <= rating) {
        $scope.filled = $scope.selected = true;
      }
    };
  }

  function ratingStar() {
    return {
      replace: true,
      restrict: "A",
      require: "^ratingBar",
      templateUrl: "/static/global/views/rating_star/rating_star.html",
      scope: {
        rating: "=index"
      },
      controller: "RatingStarController",
      link: function ($scope, $element, $attrs, $controller) {
        $scope.onMouseEnter = function onMouseEnter() {
          $controller.setFill($scope.rating);
        };

        $scope.onMouseLeave = function onMouseLeave() {
          var rating = $controller.getRating();
          $controller.setFill(rating);
        };

        $scope.onClick = function onClick() {
          $controller.setRating($scope.rating);
        };

        $scope.$watch($controller.getFill, function (newValue, oldValue) {
          if (!_.isEqual(newValue, oldValue)) {
            $scope.filled = ($scope.rating <= newValue || $scope.selected);
          }
        });

        $scope.$watch($controller.getRating, function (newValue, oldValue) {
          if (!_.isEqual(newValue, oldValue)) {
            $scope.select(newValue);
          }
        });

        activate();

        function activate() {
          var rating = $controller.getRating();
          $scope.select(rating);
        }
      }
    };
  }

  angular.module("app")
    .controller("RatingStarController", ["$scope", RatingStarController])
    .directive("ratingStar", [ratingStar]);

})(window, window.angular);