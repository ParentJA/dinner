(function (window, angular, undefined) {

  "use strict";

  function MainController($scope) {
  }

  function HomeController($scope) {
  }

  function PantryController($scope) {

  }

  function MenuController($scope) {}

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

  function IngredientController($scope, dishService, settingsService) {
    $scope.numIngredients = 15;

    $scope.getDishes = function getDishes() {
      return dishService.getDishes();
    };

    $scope.setSelectedDish = function setSelectedDish(dish) {
      dishService.setSelectedDish(dish);
    };

    $scope.getIngredients = function getIngredients() {
      var ingredients = dishService.getIngredients();

      // Remove exclusions...
      ingredients = _.difference(ingredients, settingsService.getIngredientExclusions());

      // Remove selected ingredients...
      ingredients = _.difference(ingredients, dishService.getSelectedIngredients());

      return ingredients;
    };

    $scope.getSelectedIngredient = function getSelectedIngredient() {
      return dishService.getSelectedIngredient();
    };

    $scope.setSelectedIngredient = function setSelectedIngredient(ingredient) {
      dishService.setSelectedIngredient(ingredient);
    };

    $scope.getNumIngredients = function getTotalIngredients() {
      return _.size($scope.getIngredients());
    };

    $scope.frequency = function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    };

    $scope.hasSelectedIngredients = function hasSelectedIngredients() {
      return !_.isEmpty(dishService.getSelectedIngredients());
    };

    $scope.getSelectedIngredients = function getSelectedIngredients() {
      return dishService.getSelectedIngredients();
    };

    $scope.addSelectedIngredient = function addSelectedIngredient(ingredient) {
      dishService.addSelectedIngredient(ingredient);
    };

    $scope.removeSelectedIngredient = function removeSelectedIngredient(ingredient) {
      dishService.removeSelectedIngredient(ingredient);
    };

    $scope.getDishByName = function getDishByName(name) {
      return _.find(dishService.getDishes(), "name", name);
    };

    $scope.getMatchingDishes = function getMatchingDishes() {
      return dishService.findMatchingDishes(dishService.getSelectedIngredients());
    };

    $scope.getNumMatchingDishes = function getNumMatchingDishes() {
      return _.size($scope.getMatchingDishes());
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

  function DynamicListController($scope) {
    $scope.name = null;

    $scope.addElement = function addElement(name) {
      var element = _.find($scope.getCollection(), {name: name});

      if (!_.isEmpty(element) && !_.includes($scope.getElements(), element)) {
        $scope.addFn({element: element});
      }
    };

    $scope.removeElement = function removeElement(element) {
      $scope.removeFn({element: element});
    };

    $scope.onKeyPressed = function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addElement($scope.name);
        $scope.name = null;
      }
    };
  }

  function SettingsController($scope, dishService, settingsService) {
    $scope.getIngredients = function getIngredients() {
      return dishService.getIngredients();
    };

    $scope.getIngredientExclusions = function getIngredientExclusions() {
      return settingsService.getIngredientExclusions();
    };

    $scope.addIngredientExclusion = function addIngredientExclusion(ingredient) {
      settingsService.addIngredientExclusion(ingredient);
    };

    $scope.removeIngredientExclusion = function removeIngredientExclusion(ingredient) {
      settingsService.removeIngredientExclusion(ingredient);
    };
  }

  angular.module("app")
    .controller("MainController", ["$scope", MainController])
    .controller("HomeController", ["$scope", HomeController])
    .controller("PantryController", ["$scope", PantryController])
    .controller("MenuController", ["$scope", MenuController])
    .controller("DishController", ["$scope", "dishService", DishController])
    .controller("DishListController", ["$scope", "dishService", DishListController])
    .controller("DishDetailController", ["$scope", "dishService", DishDetailController])
    .controller("IngredientController", ["$scope", "dishService", "settingsService", IngredientController])
    .controller("IngredientListController", ["$scope", "dishService", IngredientListController])
    .controller("PillboxController", ["$scope", PillboxController])
    .controller("PillboxTagController", ["$scope", PillboxTagController])
    .controller("DynamicListController", ["$scope", DynamicListController])
    .controller("SettingsController", ["$scope", "dishService", "settingsService", SettingsController]);

})(window, window.angular);