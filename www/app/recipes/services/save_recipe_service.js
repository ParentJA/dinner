(function (window, angular, undefined) {

  "use strict";

  function saveRecipeService($http, $q, BASE_URL, recipesModel) {

    return function (recipeId, inProgress, rating) {
      var deferred = $q.defer();

      $http.put(BASE_URL + "recipes/recipes/" + recipeId + "/", {
        in_progress: inProgress,
        rating: rating
      }).then(function (response) {
        recipesModel.updateOne(response.data);
        var recipe = recipesModel.getRecipeById(recipeId);
        deferred.resolve(recipe);
      }, function (response) {
        console.error("Recipe %d failed to load!", recipeId);
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("saveRecipeService", ["$http", "$q", "BASE_URL", "recipesModel", saveRecipeService]);

})(window, window.angular);