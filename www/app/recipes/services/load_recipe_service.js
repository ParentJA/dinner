(function (window, angular, undefined) {

  "use strict";

  function loadRecipeService($http, $q, BASE_URL, recipesModel) {

    return function (recipeId) {
      var deferred = $q.defer();

      $http.get(BASE_URL + "recipes/recipes/" + recipeId + "/").then(function (response) {
        recipesModel.update(response.data);
        deferred.resolve(recipesModel);
      }, function (response) {
        console.error("Recipe %d failed to load!", recipeId);
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("loadRecipeService", ["$http", "$q", "BASE_URL", "recipesModel", loadRecipeService]);

})(window, window.angular);