(function (window, angular, undefined) {
  "use strict";

  function MainController($scope) {}

  function HomeController($scope) {}

  function DishController($scope, DishFactory, dishService) {
    $scope.models = {
      dishes: [{
        name: "",
        ingredient_ids: [],
        _ingredients: [{
          name: ""
        }]
      }]
    };

    $scope.getDishes = function getDishes() {
      dishService.list().then(function (response) {
        $scope.models.dishes = new DishFactory(response.data);
      }, function (response) {
        console.error("Dishes failed to load!");
      });
    };

    function init() {
      $scope.getDishes();
    }

    init();
  }

  angular.module("app")
    .controller("MainController", ["$scope", MainController])
    .controller("HomeController", ["$scope", HomeController])
    .controller("DishController", ["$scope", "DishFactory", "dishService", DishController]);

})(window, window.angular);