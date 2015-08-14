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
      }],
      selectedDish: {
        name: "",
        _ingredients: [{
          name: ""
        }]
      }
    };

    $scope.getDishes = function getDishes() {
      dishService.list().then(function (response) {
        $scope.models.dishes = new DishFactory(response.data);
        $scope.models.selectedDish = _.first(_.sortBy($scope.models.dishes, "name"));
      }, function (response) {
        console.error("Dishes failed to load!");
      });
    };

    function init() {
      $scope.getDishes();
    }

    init();
  }

  function DishListController($scope) {
    $scope.isSelectedDish = function isSelectedDish(dish) {
      return $scope.selectedDish === dish;
    };

    $scope.setSelectedDish = function setSelectedDish(value) {
      return $scope.selectedDish = value;
    };

    $scope.hasDishes = function hasDishes() {
      return !_.isEmpty($scope.dishes);
    };
  }

  function DishDetailController($scope) {}

  angular.module("app")
    .controller("MainController", ["$scope", MainController])
    .controller("HomeController", ["$scope", HomeController])
    .controller("DishController", ["$scope", "DishFactory", "dishService", DishController])
    .controller("DishListController", ["$scope", DishListController])
    .controller("DishDetailController", ["$scope", DishDetailController]);

})(window, window.angular);