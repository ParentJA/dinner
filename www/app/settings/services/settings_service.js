(function (window, angular, undefined) {

  "use strict";

  function settingsService() {
    // Users might want to exclude specific foods for dietary reasons (e.g. Paleo, lactose intolerance, etc.)
    var foodExclusions = [];

    // Users might want to exclude groups of foods according to their tags
    var foodTagExclusions = [];

    var service = {
      addFoodExclusion: addFoodExclusion,
      addFoodTagExclusion: addFoodTagExclusion,
      filterByExcludedFoods: filterByExcludedFoods,
      filterByFewestFoodCount: filterByFewestFoodCount,
      filterByFoodCount: filterByFoodCount,
      filterByGreatestFoodCount: filterByGreatestFoodCount,
      filterByIncludedFoods: filterByIncludedFoods,
      getFoodExclusions: getFoodExclusions,
      getFoodTagExclusions: getFoodTagExclusions,
      hasFoodExclusions: hasFoodExclusions,
      hasFoodTagExclusions: hasFoodTagExclusions,
      removeFoodExclusion: removeFoodExclusion,
      removeFoodTagExclusion: removeFoodTagExclusion
    };

    function addFoodExclusion(exclusion) {
      if (!_.includes(foodExclusions, exclusion)) {
        foodExclusions.push(exclusion);
      }
    }

    function addFoodTagExclusion(exclusion) {
      if (!_.includes(foodTagExclusions, exclusion)) {
        foodTagExclusions.push(exclusion);
      }
    }

    function filterByFewestFoodCount(recipes) {
      var groupedRecipes = _.groupBy(recipes, function (recipe) {
        return recipe.foods.length;
      });
      var fewestFoodCount = _.min(_.keys(groupedRecipes), function (key) {
        return _.parseInt(key);
      });
      return groupedRecipes[fewestFoodCount.toString()];
    }

    /**
     * Returns a list of recipes that reference a number of foods between the specified bounds.
     * @param recipes a list of recipes
     * @param lowerBound the least number of foods a recipe can reference
     * @param upperBound the greatest number of foods a recipe can reference
     * @returns {Array} a filtered list of recipes
     */
    function filterByFoodCount(recipes, lowerBound, upperBound) {
      return _.filter(recipes, function (recipe) {
        var foodCount = recipe.foods.length;
        return (foodCount >= lowerBound && foodCount <= upperBound);
      });
    }

    function filterByIncludedFoods(recipes, foods) {
      return _.filter(recipes, function (recipe) {
        return _.isEqual(_.intersection(recipe.foods, foods), foods);
      });
    }

    function filterByExcludedFoods(recipes, foods) {
      return _.filter(recipes, function (recipe) {
        return !_.isEqual(_.intersection(recipe.foods, foods), foods);
      });
    }

    function filterByGreatestFoodCount(recipes) {
      var groupedRecipes = _.groupBy(recipes, function (recipe) {
        return recipe.foods.length;
      });
      var greatestFoodCount = _.max(_.keys(groupedRecipes), function (key) {
        return _.parseInt(key);
      });
      return groupedRecipes[greatestFoodCount.toString()];
    }

    function getFoodExclusions() {
      return _.sortBy(foodExclusions, "name");
    }

    function getFoodTagExclusions() {
      return _.sortBy(foodTagExclusions, "name");
    }

    function hasFoodExclusions() {
      return !_.isEmpty(foodExclusions);
    }

    function hasFoodTagExclusions() {
      return !_.isEmpty(foodTagExclusions);
    }

    function removeFoodExclusion(exclusion) {
      _.remove(foodExclusions, exclusion);
    }

    function removeFoodTagExclusion(exclusion) {
      _.remove(foodTagExclusions, exclusion);
    }

    return service;
  }

  angular.module("app")
    .service("settingsService", [settingsService]);

})(window, window.angular);