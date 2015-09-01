(function (window, angular, undefined) {
  "use strict";

  function MainController($scope) {
  }

  function HomeController($scope) {
  }

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

  function DishDetailController($scope) {
  }

  function IngredientController($scope, IngredientFactory, ingredientService) {
    $scope.models = {
      ingredients: [{
        id: 0,
        name: "",
        count: 0
      }],
      filteredIngredients: [{
        id: 0,
        name: "",
        count: 0
      }],
      selectedIngredient: {
        id: 0,
        name: "",
        count: 0
      }
    };

    $scope.getIngredients = function getIngredients() {
      ingredientService.list(true).then(function (response) {
        $scope.models.ingredients = new IngredientFactory(response.data);
      }, function (response) {
        console.error("Ingredients failed to load!");
      });
    };

    function init() {
      $scope.getIngredients();
    }

    init();
  }

  function IngredientListController($scope) {
    $scope.number = 15;
    $scope.exclusions = [];

    $scope.isSelectedIngredient = function isSelectedIngredient(ingredient) {
      return $scope.selectedIngredient === ingredient;
    };

    $scope.setSelectedIngredient = function setSelectedIngredient(value) {
      return $scope.selectedIngredient = value;
    };

    $scope.hasIngredients = function hasIngredients() {
      return !_.isEmpty($scope.ingredients);
    };

    $scope.getIngredients = function getIngredients() {
      return $scope.ingredients;
    };

    $scope.filterAll = function filterAll() {
      $scope.filteredIngredients = $scope.ingredients;
    };

    $scope.filterMost = function filterMost() {
      $scope.filteredIngredients = _.sortBy(_.difference($scope.ingredients, $scope.exclusions), "count")
        .reverse().slice(0, $scope.number);
    };

    $scope.filterLeast = function filterLeast() {
      $scope.filteredIngredients = _.sortBy(_.difference($scope.ingredients, $scope.exclusions), "count")
        .slice(0, $scope.number);
    };
  }

  function PillboxController($scope) {
    $scope.tagName = null;

    $scope.addTag = function addTag(tagName) {
      var tagObject = _.findWhere($scope.tagList, {name: tagName});

      if (tagObject && !_.includes($scope.exclusions, tagObject)) {
        $scope.exclusions.push(tagObject);
      }
    };

    $scope.removeTag = function removeTag(tagName) {
      var tagObject = _.findWhere($scope.tagList, {name: tagName});

      if (tagObject) {
        _.remove($scope.exclusions, tagObject);
      }
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
    .controller("DishController", ["$scope", "DishFactory", "dishService", DishController])
    .controller("DishListController", ["$scope", DishListController])
    .controller("DishDetailController", ["$scope", DishDetailController])
    .controller("IngredientController", ["$scope", "IngredientFactory", "ingredientService", IngredientController])
    .controller("IngredientListController", ["$scope", IngredientListController])
    .controller("PillboxController", ["$scope", PillboxController])
    .controller("PillboxTagController", ["$scope", PillboxTagController]);

})(window, window.angular);