(function (window, angular, undefined) {
  "use strict";

  function DishFactory() {
    var ingredients = [];

    return function (data) {
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredient_ids, function (ingredientId) {
          var ingredient = _.findWhere(data.ingredients, {id: ingredientId});

          // Keep a running tally of ingredients...
          ingredients.push(ingredient.name);

          dish._ingredients.push(ingredient);
        });
      });

      return data.dishes;
    };
  }

  function dishService($http, BASE_URL) {
    this.list = function list() {
      return $http.get(BASE_URL + "meals/dishes/");
    };

    this.retrieve = function retrieve(id) {
      return $http.get(BASE_URL + "meals/dishes/" + id + "/");
    };
  }

  function IngredientFactory() {
    return function(data) {
      return data.ingredients;
    }
  }

  function ingredientService($http, BASE_URL) {
    this.list = function list(count) {
      return $http.get(BASE_URL + "meals/ingredients/?count=" + count);
    };

    this.retrieve = function retrieve(id) {
      return $http.get(BASE_URL + "meals/dishes/" + id + "/");
    };
  }

  angular.module("app")
    .factory("DishFactory", [DishFactory])
    .service("dishService", ["$http", "BASE_URL", dishService])
    .factory("IngredientFactory", [IngredientFactory])
    .service("ingredientService", ["$http", "BASE_URL", ingredientService]);

})(window, window.angular);