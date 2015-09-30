(function (window, angular, undefined) {

  "use strict";

  function settingsService() {
    // Users might want to exclude specific ingredients for dietary reasons (e.g. Paleo, lactose intolerance, etc.)
    var ingredientExclusions = [];

    // Users might want to exclude groups of ingredients according to their tags
    var ingredientTagExclusions = [];

    var service = {
      addIngredientExclusion: addIngredientExclusion,
      addIngredientTagExclusion: addIngredientTagExclusion,
      getIngredientExclusions: getIngredientExclusions,
      getIngredientTagExclusions: getIngredientTagExclusions,
      hasIngredientExclusions: hasIngredientExclusions,
      hasIngredientTagExclusions: hasIngredientTagExclusions,
      removeIngredientExclusion: removeIngredientExclusion,
      removeIngredientTagExclusion: removeIngredientTagExclusion
    };

    function addIngredientExclusion(exclusion) {
      if (!_.includes(ingredientExclusions, exclusion)) {
        ingredientExclusions.push(exclusion);
      }
    }

    function addIngredientTagExclusion(exclusion) {
      if (!_.includes(ingredientTagExclusions, exclusion)) {
        ingredientTagExclusions.push(exclusion);
      }
    }

    function getIngredientExclusions() {
      return _.sortBy(ingredientExclusions, "name");
    }

    function getIngredientTagExclusions() {
      return _.sortBy(ingredientTagExclusions, "name");
    }

    function hasIngredientExclusions() {
      return !_.isEmpty(ingredientExclusions);
    }

    function hasIngredientTagExclusions() {
      return !_.isEmpty(ingredientTagExclusions);
    }

    function removeIngredientExclusion(exclusion) {
      _.remove(ingredientExclusions, exclusion);
    }

    function removeIngredientTagExclusion(exclusion) {
      _.remove(ingredientTagExclusions, exclusion);
    }

    return service;
  }

  angular.module("app")
    .service("settingsService", [settingsService]);

})(window, window.angular);