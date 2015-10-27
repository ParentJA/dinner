(function (window, angular, undefined) {

  "use strict";

  function recipesModel() {
    var recipes = [];

    var service = {
      getRecipes: getRecipes,
      update: update
    };

    function getRecipes() {
      return recipes;
    }

    function update(data) {
      recipes = data.recipes;
    }

    return service;
  }

  angular.module("app")
    .factory("recipesModel", [recipesModel]);

})(window, window.angular);