(function (window, angular, undefined) {

  "use strict";

  function loadRecipesService($http, $q, BASE_URL, recipesModel) {

    return function (useCategories, useFoods) {
      useCategories = useCategories || false;
      useFoods = useFoods || false;

      var deferred = $q.defer();

      $http.get(BASE_URL + "recipes/recipes/", {
        params: {
          categories: useCategories,
          foods: useFoods
        }
      }).then(function (response) {
        recipesModel.update(response.data);
        deferred.resolve(recipesModel);
      }, function (response) {
        console.error("Recipes failed to load!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("loadRecipesService", ["$http", "$q", "BASE_URL", "recipesModel", loadRecipesService]);

})(window, window.angular);