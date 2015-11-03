(function (window, angular, undefined) {

  "use strict";

  function recipesModel() {
    var recipes = [];
    var foods = [];
    var categories = [];

    var service = {
      getCategories: function getCategories() {
        return categories;
      },
      getFoods: function getFoods() {
        return foods;
      },
      getRecipes: function getRecipes() {
        return recipes;
      },
      update: function update(data) {
        var vectorIndex = 0;

        categories = data.categories;

        // Update foods...
        _.forEach(data.foods, function (food) {
          food.vectorIndex = vectorIndex++;
          food._categories = [];

          _.forEach(food.categories, function (categoryId) {
            food._categories.push(_.find(data.categories, {id: categoryId}));
          });
        });

        foods = data.foods;

        // Update recipes...
        _.forEach(data.recipes, function (recipe) {
          recipe._foods = [];

          _.forEach(recipe.foods, function (foodId) {
            recipe._foods.push(_.find(data.foods, {id: foodId}));
          });
        });

        recipes = data.recipes;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("recipesModel", [recipesModel]);

})(window, window.angular);