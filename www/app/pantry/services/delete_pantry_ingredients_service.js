(function (window, angular, undefined) {

  "use strict";

  function deletePantryIngredientsService($http, $q, BASE_URL) {

    return function(ingredient) {
      var deferred = $q.defer();

      $http.delete(BASE_URL + "pantries/ingredients/" + ingredient.id + "/").then(function (response) {
        deferred.resolve(response.data);
      }, function (response) {
        console.error("Pantry ingredients failed to delete!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

  }

  angular.module("app")
    .factory("deletePantryIngredientsService", ["$http", "$q", "BASE_URL", deletePantryIngredientsService]);

})(window, window.angular);