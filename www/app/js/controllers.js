(function (window, angular, undefined) {

  "use strict";

  function MainController($scope) {}

  function HomeController($scope) {}

  function PantryController($scope) {}

  function MenuController($scope) {}

  function DishController($scope, dishService) {}

  function DishListController($scope, dishService) {
    $scope.getDishes = getDishes;
    $scope.hasDishes = hasDishes;
    $scope.isSelectedDish = isSelectedDish;
    $scope.setSelectedDish = setSelectedDish;

    function getDishes() {
      return dishService.getDishes();
    };

    function hasDishes() {
      return dishService.hasDishes();
    };

    function isSelectedDish(value) {
      return dishService.isSelectedDish(value);
    };

    function setSelectedDish(value) {
      dishService.setSelectedDish(value);
    };
  }

  function DishDetailController($scope, dishService) {
    $scope.getSelectedDish = getSelectedDish;

    function getSelectedDish() {
      return dishService.getSelectedDish();
    };
  }

  function IngredientController($scope, dishService, settingsService) {
    $scope.addSelectedIngredient = addSelectedIngredient;
    $scope.frequency = frequency;
    $scope.getDishes = getDishes;
    $scope.getDishByName = getDishByName;
    $scope.getIngredients = getIngredients;
    $scope.getMatchingDishes = getMatchingDishes;
    $scope.getNumMatchingDishes = getNumMatchingDishes;
    $scope.getSelectedIngredient = getSelectedIngredient;
    $scope.getSelectedIngredients = getSelectedIngredients;
    $scope.getTotalIngredients = getTotalIngredients;
    $scope.hasSelectedIngredients = hasSelectedIngredients;
    $scope.numIngredients = 15;
    $scope.setSelectedDish = setSelectedDish;
    $scope.setSelectedIngredient = setSelectedIngredient;
    $scope.removeSelectedIngredient = removeSelectedIngredient;

    function addSelectedIngredient(ingredient) {
      dishService.addSelectedIngredient(ingredient);
    };

    function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    };

    function getDishes() {
      return dishService.getDishes();
    };

    function getDishByName(name) {
      return _.find(dishService.getDishes(), "name", name);
    };

    function getIngredients() {
      var ingredients = dishService.getIngredients();

      // Remove ingredient exclusions...
      ingredients = _.difference(ingredients, settingsService.getIngredientExclusions());

      // Remove ingredient tag exclusions...
      _.forEach(settingsService.getIngredientTagExclusions(), function (tag) {
        ingredients = _.difference(ingredients, _.filter(ingredients, function (ingredient) {
          return _.includes(ingredient._tags, tag);
        }));
      });

      ingredients = _.difference(ingredients, settingsService.getIngredientTagExclusions());

      // Remove selected ingredients...
      ingredients = _.difference(ingredients, dishService.getSelectedIngredients());

      return ingredients;
    };

    function getMatchingDishes() {
      return dishService.findMatchingDishes(dishService.getSelectedIngredients());
    };

    function getNumMatchingDishes() {
      return _.size($scope.getMatchingDishes());
    };

    function getSelectedIngredient() {
      return dishService.getSelectedIngredient();
    };

    function getSelectedIngredients() {
      return dishService.getSelectedIngredients();
    };

    function getTotalIngredients() {
      return _.size($scope.getIngredients());
    };

    function hasSelectedIngredients() {
      return !_.isEmpty(dishService.getSelectedIngredients());
    };

    function setSelectedDish(dish) {
      dishService.setSelectedDish(dish);
    };

    function setSelectedIngredient(ingredient) {
      dishService.setSelectedIngredient(ingredient);
    };

    function removeSelectedIngredient(ingredient) {
      dishService.removeSelectedIngredient(ingredient);
    };
  }

  function IngredientListController($scope, dishService) {
    $scope.frequency = frequency;
    $scope.getIngredients = getIngredients;
    $scope.hasIngredients = hasIngredients;

    function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    };

    function getIngredients() {
      return dishService.getIngredients();
    };

    function hasIngredients() {
      return dishService.hasIngredients();
    };
  }

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
    };

    function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addTag($scope.tagName);
        $scope.tagName = null;
      }
    };

    function removeTag(tag) {
      _.remove($scope.exclusions, tag);
    };
  }

  function PillboxTagController($scope) {}

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
    };

    function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addElement($scope.name);
        $scope.name = null;
      }
    };

    function removeElement(element) {
      $scope.removeFn({element: element});
    };
  }

  function SettingsController($scope, dishService, settingsService) {
    $scope.addIngredientExclusion = addIngredientExclusion;
    $scope.addIngredientTagExclusion = addIngredientTagExclusion;
    $scope.getIngredients = getIngredients;
    $scope.getIngredientExclusions = getIngredientExclusions;
    $scope.getIngredientTagExclusions = getIngredientTagExclusions;
    $scope.getTags = getTags;
    $scope.removeIngredientExclusion = removeIngredientExclusion;
    $scope.removeIngredientTagExclusion = removeIngredientTagExclusion;

    function addIngredientExclusion(exclusion) {
      settingsService.addIngredientExclusion(exclusion);
    };

    function addIngredientTagExclusion(exclusion) {
      settingsService.addIngredientTagExclusion(exclusion);
    };

    function getIngredients() {
      return dishService.getIngredients();
    };

    function getIngredientExclusions() {
      return settingsService.getIngredientExclusions();
    };

    function getIngredientTagExclusions() {
      return settingsService.getIngredientTagExclusions();
    };

    function getTags() {
      return dishService.getTags();
    };

    function removeIngredientExclusion(exclusion) {
      settingsService.removeIngredientExclusion(exclusion);
    };

    function removeIngredientTagExclusion(exclusion) {
      settingsService.removeIngredientTagExclusion(exclusion);
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