(function (window, angular, undefined) {
  "use strict";

  function title() {
    return function titleFilter(text) {
      return _.startCase(text);
    };
  }

  function hasIngredient() {
    return function hasIngredientFilter(dishes, ingredient) {
      return _.filter(dishes, function (dish) {
        return _.includes(dish.ingredients, ingredient.id);
      });
    };
  }

  angular.module("app")
    .filter("title", title)
    .filter("hasIngredient", hasIngredient);

})(window, window.angular);