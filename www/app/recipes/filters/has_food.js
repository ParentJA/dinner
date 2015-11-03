(function (window, angular, undefined) {

  "use strict";

  function hasFood() {
    return function hasFoodFilter(recipes, food) {
      return _.filter(recipes, function (recipe) {
        return _.includes(recipe.foods, food.id);
      });
    };
  }

  angular.module("app")
    .filter("hasFood", hasFood);

})(window, window.angular);