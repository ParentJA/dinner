(function (window, angular, undefined) {
  "use strict";

  function MainController($scope) {
  }

  function HomeController($scope) {
  }

  function DishController($scope, dishService) {
  }

  function DishListController($scope, dishService) {
    $scope.hasDishes = function hasDishes() {
      return dishService.hasDishes();
    };

    $scope.getDishes = function getDishes() {
      return dishService.getDishes();
    };

    $scope.setSelectedDish = function setSelectedDish(value) {
      dishService.setSelectedDish(value);
    };

    $scope.isSelectedDish = function isSelectedDish(value) {
      return dishService.isSelectedDish(value);
    };
  }

  function DishDetailController($scope, dishService) {
    $scope.getSelectedDish = function getSelectedDish() {
      return dishService.getSelectedDish();
    };
  }

  function IngredientController($scope, dishService) {
    $scope.numIngredients = 15;
    $scope.exclusions = [];

    $scope.getDishes = function getDishes() {
      return dishService.getDishes();
    };

    $scope.setSelectedDish = function setSelectedDish(dish) {
      dishService.setSelectedDish(dish);
    };

    $scope.getIngredients = function getIngredients() {
      return _.difference(dishService.getIngredients(), $scope.exclusions);
    };

    $scope.getSelectedIngredient = function getSelectedIngredient() {
      return dishService.getSelectedIngredient();
    };

    $scope.setSelectedIngredient = function setSelectedIngredient(ingredient) {
      dishService.setSelectedIngredient(ingredient);
    };

    $scope.getTotalIngredients = function getTotalIngredients() {
      return dishService.getTotalIngredients();
    };

    $scope.frequency = function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    };
  }

  function IngredientListController($scope, dishService) {
    $scope.hasIngredients = function hasIngredients() {
      return dishService.hasIngredients();
    };

    $scope.getIngredients = function getIngredients() {
      return dishService.getIngredients();
    };

    $scope.frequency = function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    };
  }

  function PillboxController($scope) {
    $scope.tagName = null;

    $scope.addTag = function addTag(tagName) {
      var tagObject = _.findWhere($scope.getCollection(), {name: tagName});

      if (tagObject && !_.includes($scope.exclusions, tagObject)) {
        $scope.exclusions.push(tagObject);
      }
    };

    $scope.removeTag = function removeTag(tag) {
      _.remove($scope.exclusions, tag);
    };

    $scope.onKeyPressed = function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addTag($scope.tagName);
        $scope.tagName = null;
      }
    };
  }

  function PillboxTagController($scope) {

  }

  angular.module("app")
    .controller("MainController", ["$scope", MainController])
    .controller("HomeController", ["$scope", HomeController])
    .controller("DishController", ["$scope", "dishService", DishController])
    .controller("DishListController", ["$scope", "dishService", DishListController])
    .controller("DishDetailController", ["$scope", "dishService", DishDetailController])
    .controller("IngredientController", ["$scope", "dishService", IngredientController])
    .controller("IngredientListController", ["$scope", "dishService", IngredientListController])
    .controller("PillboxController", ["$scope", PillboxController])
    .controller("PillboxTagController", ["$scope", PillboxTagController]);

})(window, window.angular);