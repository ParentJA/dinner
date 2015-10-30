(function (window, angular, undefined) {

  "use strict";

  function dishesModel() {
    var dishes = [];
    var ingredients = [];
    var tags = [];

    var service = {
      getDishes: function getDishes() {
        return dishes;
      },
      getIngredients: function getIngredients() {
        return ingredients;
      },
      getTags: function getTags() {
        return tags;
      },
      update: function update(data) {
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
    };

    return service;
  }

  angular.module("app")
    .factory("dishesModel", [dishesModel]);

})(window, window.angular);