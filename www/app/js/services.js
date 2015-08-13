(function (window, angular, undefined) {
  "use strict";

  function DishFactory() {
    return function(data) {
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredient_ids, function (ingredientId) {
          dish._ingredients.push(_.findWhere(data.ingredients, {id: ingredientId}));
        });
      });

      return data.dishes;
    };
  }

  function dishService($http, BASE_URL) {
    this.list = function list() {
      return $http.get(BASE_URL + "meals/dishes/");
    };

    this.retrieve = function retrieve(id) {
      return $http.get(BASE_URL + "meals/dishes/" + id + "/");
    };
  }

  angular.module("app")
    .factory("DishFactory", [DishFactory])
    .service("dishService", ["$http", "BASE_URL", dishService]);

})(window, window.angular);