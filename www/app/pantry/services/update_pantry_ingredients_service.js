(function (window, angular, undefined) {

  "use strict";

  function updatePantryIngredientsService($http, $q, BASE_URL) {

    return function(ingredient) {
      var deferred = $q.defer();

      $http.post(BASE_URL + "pantries/ingredients/" + ingredient.id + "/", {}).then(function (response) {
        deferred.resolve(response.data);
      }, function (response) {
        console.error("Pantry ingredients failed to update!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

  }

  angular.module("app")
    .factory("updatePantryIngredientsService", ["$http", "$q", "BASE_URL", updatePantryIngredientsService]);

})(window, window.angular);