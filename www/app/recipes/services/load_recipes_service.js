(function (window, angular, undefined) {

  "use strict";

  function loadRecipesService($http, BASE_URL, recipesModel) {
    var service = {
      getRecipes: getRecipes
    };

    function getRecipes() {
      return $http.get(BASE_URL + "recipes/").then(function (response) {
        recipesModel.update(response.data);
      }, function () {
        console.error("Recipes failed to load!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("loadRecipesService", ["$http", "BASE_URL", "recipesModel", loadRecipesService]);

})(window, window.angular);