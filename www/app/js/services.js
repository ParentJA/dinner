(function (window, angular, undefined) {
  "use strict";

  function DishFactory() {
    return function (data) {
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredient_ids, function (ingredientId) {
          dish._ingredients.push(_.findWhere(data.ingredients, {id: ingredientId}));
        });
      });

      return data.dishes;
    }
  }

  function dishService($http, BASE_URL, DishFactory) {
    var dishes = [],
        selectedDish = null;

    var service = {
      hasDishes: function hasDishes() {
        return (!_.isEmpty(dishes));
      },
      getDishes: function getDishes() {
        return dishes;
      },
      getSelectedDish: function getSelectedDish() {
        return selectedDish;
      },
      setSelectedDish: function setSelectedDish(value) {
        selectedDish = value;
      },
      isSelectedDish: function isSelectedDish(value) {
        return (selectedDish === value);
      },
      getTotalDishes: function getTotalDishes() {
        return _.size(dishes);
      }
    };

    var init = function init() {
      $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        dishes = new DishFactory(response.data);
        selectedDish = _.first(_.sortBy(dishes, "name"));
      }, function () {
        console.error("Dishes failed to load!");
      });
    };

    init();

    return service;
  }

  function IngredientFactory() {
    return function (data) {
      return data.ingredients;
    }
  }

  function ingredientService($http, BASE_URL, IngredientFactory) {
    var ingredients = [],
        selectedIngredient = null;

    var service = {
      hasIngredients: function hasIngredients() {
        return (!_.isEmpty(ingredients));
      },
      getIngredients: function getIngredients() {
        return ingredients;
      },
      getSelectedIngredient: function getSelectedIngredient() {
        return selectedIngredient;
      },
      setSelectedIngredient: function setSelectedIngredient(value) {
        selectedIngredient = value;
      },
      isSelectedIngredient: function isSelectedIngredient(value) {
        return (selectedIngredient === value);
      },
      getTotalIngredients: function getTotalIngredients() {
        return _.size(ingredients);
      }
    };

    var init = function init() {
      $http.get(BASE_URL + "meals/ingredients/?count=true").then(function (response) {
        ingredients = new IngredientFactory(response.data);
      }, function () {
        console.error("Ingredients failed to load!");
      });
    };

    init();

    return service;
  }

  angular.module("app")
    .factory("DishFactory", [DishFactory])
    .factory("DFactory", [DishFactory])
    .service("dishService", ["$http", "BASE_URL", "DFactory", dishService])
    .factory("IngredientFactory", [IngredientFactory])
    .service("ingredientService", ["$http", "BASE_URL", "IngredientFactory", ingredientService]);

})(window, window.angular);