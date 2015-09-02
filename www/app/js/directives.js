(function (window, angular, undefined) {
  "use strict";

  function dishList() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/views/dish_list.html",
      controller: "DishListController"
    };
  }

  function dishDetail() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/views/dish_detail.html",
      controller: "DishDetailController"
    };
  }

  function ingredientList() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/views/ingredient_list.html",
      controller: "IngredientListController"
    };
  }

  function pillbox() {
    return {
      restrict: "A",
      scope: {
        tagList: "=",
        exclusions: "="
      },
      templateUrl: "/static/views/pillbox.html",
      controller: "PillboxController"
    };
  }

  function pillboxTag() {
    return {
      restrict: "A",
      require: "^pillbox",
      scope: {
        tag: "=",
        removeTag: "&"
      },
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