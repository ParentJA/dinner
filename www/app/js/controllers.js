(function (window, angular, undefined) {

  "use strict";

  function MainController($scope) {}

  function HomeController($scope) {}

  function PantryController($scope, dishes) {}

  function MenuController($scope, dishes) {}

  function DishController($scope, dishes, dishesService) {}

  function DishListController($scope, dishesService) {
    $scope.getDishes = getDishes;
    $scope.getTotalDishes = getTotalDishes;
    $scope.hasDishes = hasDishes;
    $scope.isSelectedDish = isSelectedDish;
    $scope.setSelectedDish = setSelectedDish;

    function getDishes() {
      return dishesService.getDishes();
    }

    function getTotalDishes() {
      return _.size(dishesService.getDishes());
    }

    function hasDishes() {
      return dishesService.hasDishes();
    }

    function isSelectedDish(value) {
      return dishesService.isSelectedDish(value);
    }

    function setSelectedDish(value) {
      dishesService.setSelectedDish(value);
    }
  }

  function DishDetailController($scope, dishesService) {
    $scope.getSelectedDish = getSelectedDish;
    $scope.getTotalIngredients = getTotalIngredients;

    function getSelectedDish() {
      return dishesService.getSelectedDish();
    }

    function getTotalIngredients() {
      return _.size(dishesService.getSelectedDish()._ingredients);
    }
  }

  function IngredientController($scope, dishes, dishesService, ingredientsService, settingsService) {
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
      ingredientsService.addSelectedIngredient(ingredient);
    }

    function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishesService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    }

    function getDishes() {
      return dishesService.getDishes();
    }

    function getDishByName(name) {
      return _.find(dishesService.getDishes(), "name", name);
    }

    function getIngredients() {
      var ingredients = ingredientsService.getIngredients();

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
      ingredients = _.difference(ingredients, ingredientsService.getSelectedIngredients());

      return ingredients;
    }

    function getMatchingDishes() {
      return dishesService.findDishesWithIngredients(ingredientsService.getSelectedIngredients());
    }

    function getNumMatchingDishes() {
      return _.size($scope.getMatchingDishes());
    }

    function getSelectedIngredient() {
      return ingredientsService.getSelectedIngredient();
    }

    function getSelectedIngredients() {
      return ingredientsService.getSelectedIngredients();
    }

    function getTotalIngredients() {
      return _.size($scope.getIngredients());
    }

    function hasSelectedIngredients() {
      return !_.isEmpty(ingredientsService.getSelectedIngredients());
    }

    function setSelectedDish(dish) {
      dishesService.setSelectedDish(dish);
    }

    function setSelectedIngredient(ingredient) {
      ingredientsService.setSelectedIngredient(ingredient);
    }

    function removeSelectedIngredient(ingredient) {
      ingredientsService.removeSelectedIngredient(ingredient);
    }
  }

  function IngredientListController($scope, dishesService, ingredientsService) {
    $scope.frequency = frequency;
    $scope.getIngredients = getIngredients;
    $scope.hasIngredients = hasIngredients;

    function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishesService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    }

    function getIngredients() {
      return ingredientsService.getIngredients();
    }

    function hasIngredients() {
      return ingredientsService.hasIngredients();
    }
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

  function SettingsController($scope, ingredientsService, settingsService, tagsService) {
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
    }

    function addIngredientTagExclusion(exclusion) {
      settingsService.addIngredientTagExclusion(exclusion);
    }

    function getIngredients() {
      return ingredientsService.getIngredients();
    }

    function getIngredientExclusions() {
      return settingsService.getIngredientExclusions();
    }

    function getIngredientTagExclusions() {
      return settingsService.getIngredientTagExclusions();
    }

    function getTags() {
      return tagsService.getTags();
    }

    function removeIngredientExclusion(exclusion) {
      settingsService.removeIngredientExclusion(exclusion);
    }

    function removeIngredientTagExclusion(exclusion) {
      settingsService.removeIngredientTagExclusion(exclusion);
    }
  }

  angular.module("app")
    .controller("MainController", ["$scope", MainController])
    .controller("HomeController", ["$scope", HomeController])
    .controller("PantryController", ["$scope", "dishes", PantryController])
    .controller("MenuController", ["$scope", "dishes", MenuController])
    .controller("DishController", ["$scope", "dishes", "dishesService", DishController])
    .controller("DishListController", ["$scope", "dishesService", DishListController])
    .controller("DishDetailController", ["$scope", "dishesService", DishDetailController])
    .controller("IngredientController", ["$scope", "dishes", "dishesService", "ingredientsService", "settingsService", IngredientController])
    .controller("IngredientListController", ["$scope", "dishesService", "ingredientsService", IngredientListController])
    .controller("PillboxController", ["$scope", PillboxController])
    .controller("PillboxTagController", ["$scope", PillboxTagController])
    .controller("DynamicListController", ["$scope", DynamicListController])
    .controller("SettingsController", ["$scope", "ingredientsService", "settingsService", "tagsService", SettingsController]);

})(window, window.angular);