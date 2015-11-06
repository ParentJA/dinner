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