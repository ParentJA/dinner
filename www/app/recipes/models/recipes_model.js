(function (window, angular, undefined) {

  "use strict";

  function recipesModel() {
    var foodCategories = [];
    var foods = [];
    var recipeCategories = [];
    var recipes = [];

    var service = {
      getFoodCategories: function getFoodCategories() {
        return foodCategories;
      },
      getFoods: function getFoods() {
        return foods;
      },
      getRecipeCategories: function getRecipeCategories() {
        return recipeCategories;
      },
      getRecipes: function getRecipes() {
        return recipes;
      },
      update: function update(data) {
        var vectorIndex = 0;

        foodCategories = data.food_categories;

        var foodCategoryMap = _.indexBy(foodCategories, "id");

        // Update foods...
        _.forEach(data.foods, function (food) {
          food.vectorIndex = vectorIndex++;
          food._categories = [];

          _.forEach(food.categories, function (categoryId) {
            food._categories.push(foodCategoryMap[categoryId]);
          });
        });

        foods = data.foods;

        recipeCategories = data.recipe_categories;

        var recipeCategoryMap = _.indexBy(recipeCategories, "id");

        // Update recipes...
        _.forEach(data.recipes, function (recipe) {
          recipe._categories = [];

          _.forEach(recipe.categories, function (categoryId) {
            recipe._categories.push(recipeCategoryMap[categoryId]);
          });

          recipe._foods = [];

          _.forEach(recipe.foods, function (foodId) {
            recipe._foods.push(_.find(data.foods, {id: foodId}));
          });
        });

        recipes = data.recipes;
      },
      updateOne: function updateOne(data) {
        var recipe = _.first(data.recipes);
        var recipeId = recipe.id;
        var description = recipe.description;
        var instructions = recipe.instructions;

        // Update recipe...
        var existingRecipe = _.find(recipes, "id", recipeId);
        existingRecipe.description = description;
        existingRecipe.instructions = instructions;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("recipesModel", [recipesModel]);

})(window, window.angular);