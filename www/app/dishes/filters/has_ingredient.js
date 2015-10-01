(function (window, angular, undefined) {

  "use strict";

  function hasIngredient() {
    return function hasIngredientFilter(dishes, ingredient) {
      return _.filter(dishes, function (dish) {
        return _.includes(dish.ingredients, ingredient.id);
      });
    };
  }

  angular.module("app")
    .filter("hasIngredient", hasIngredient);

})(window, window.angular);