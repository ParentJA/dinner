(function (window, angular, undefined) {

  "use strict";

  function FavoriteButtonController($scope) {
    $scope.filled = false;

    $scope.fill = function fill() {
      return ($scope.filled) ? "fa-heart" : "fa-heart-o";
    };

    $scope.onClick = function onClick() {
      var isFavorite = $scope.filled;
      $scope.filled = !isFavorite;
      this.setFavorite({isFavorite: $scope.filled});
    };

    activate();

    function activate() {
      $scope.filled = $scope.isFavorite();
    }
  }

  function favoriteButton() {
    return {
      restrict: "A",
      scope: {
        isFavorite: "&",
        setFavorite: "&"
      },
      templateUrl: "/static/global/views/favorite_button/favorite_button.html",
      controller: "FavoriteButtonController"
    };
  }

  angular.module("app")
    .controller("FavoriteButtonController", ["$scope", FavoriteButtonController])
    .directive("favoriteButton", [favoriteButton]);

})(window, window.angular);