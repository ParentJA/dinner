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
      replace: true,
      scope: {},
      templateUrl: "/static/views/ingredient_list.html",
      controller: "IngredientListController"
    };
  }

  function pillbox() {
    return {
      restrict: "A",
      scope: {
        getCollection: "&collection",
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

  function dynamicList() {
    return {
      restrict: "A",
      scope: {
        getCollection: "&collection",
        getElements: "&elements",
        addFn: "&",
        removeFn: "&"
      },
      templateUrl: "/static/views/dynamic_list.html",
      controller: "DynamicListController"
    };
  }

  angular.module("app")
    .directive("dishList", [dishList])
    .directive("dishDetail", [dishDetail])
    .directive("ingredientList", [ingredientList])
    .directive("pillbox", [pillbox])
    .directive("pillboxTag", [pillboxTag])
    .directive("dynamicList", [dynamicList]);

})(window, window.angular);