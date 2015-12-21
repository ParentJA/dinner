(function (window, angular, undefined) {

  "use strict";

  function RatingBarController($scope) {
    $scope.fill = 0;

    this.getFill = function getFill() {
      return $scope.fill;
    };

    this.setFill = function setFill(index) {
      $scope.fill = index;
    };

    this.getRating = function getRating() {
      return $scope.getRating();
    };

    this.setRating = function setRating(rating) {
      this.setFill(rating);
      $scope.setRating({rating: rating});
    };

    activate();

    function activate() {
      $scope.fill = $scope.getRating();
    }
  }

  function ratingBar() {
    return {
      restrict: "A",
      templateUrl: "/static/global/views/rating_bar/rating_bar.html",
      scope: {
        getRating: "&",
        setRating: "&"
      },
      controller: "RatingBarController"
    };
  }

  angular.module("app")
    .controller("RatingBarController", ["$scope", RatingBarController])
    .directive("ratingBar", [ratingBar]);

})(window, window.angular);