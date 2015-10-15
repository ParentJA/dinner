(function (window, angular, undefined) {

  "use strict";

  function DishesModel() {
    var dishes = [];
    var ingredients = [];
    var tags = [];

    var service = {
      getDishes: getDishes,
      getIngredients: getIngredients,
      getTags: getTags,
      update: update
    };

    function getDishes() {
      return dishes;
    }

    function getIngredients() {
      return ingredients;
    }

    function getTags() {
      return tags;
    }

    function update(data) {
      var vectorIndex = 0;

      tags = data.tags;

      // Update ingredients...
      _.forEach(data.ingredients, function (ingredient) {
        ingredient.vectorIndex = vectorIndex++;
        ingredient._tags = [];

        _.forEach(ingredient.tags, function (tagId) {
          ingredient._tags.push(_.find(data.tags, {id: tagId}));
        });
      });

      ingredients = data.ingredients;

      // Update dishes...
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredients, function (ingredientId) {
          dish._ingredients.push(_.find(data.ingredients, {id: ingredientId}));
        });
      });

      dishes = data.dishes;
    }

    return service;
  }

  angular.module("app")
    .factory("DishesModel", [DishesModel]);

})(window, window.angular);