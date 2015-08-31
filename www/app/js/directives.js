(function (window, angular, undefined) {
  "use strict";

  function dishList() {
    return {
      restrict: "A",
      scope: {
        dishes: "=",
        selectedDish: "="
      },
      templateUrl: "/static/views/dish_list.html",
      controller: "DishListController"
    };
  }

  function dishDetail() {
    return {
      restrict: "A",
      scope: {
        selectedDish: "="
      },
      templateUrl: "/static/views/dish_detail.html",
      controller: "DishDetailController"
    };
  }

  function ingredientList() {
    return {
      restrict: "A",
      scope: {
        ingredients: "=",
        selectedIngredient: "="
      },
      templateUrl: "/static/views/ingredient_list.html",
      controller: "IngredientListController"
    };
  }

  function pillbox() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/views/pillbox.html",
      controller: "PillboxController"
    };
  }

  function pillboxTag() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/views/pillbox_tag.html",
      controller: "PillboxTagController"
    };
  }

  angular.module("app")
    .directive("dishList", [dishList])
    .directive("dishDetail", [dishDetail])
    .directive("ingredientList", [ingredientList])
    .directive("pillbox", [pillbox])
    .directive("pillboxTag", [pillboxTag]);

})(window, window.angular);