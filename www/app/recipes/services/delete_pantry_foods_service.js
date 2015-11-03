(function (window, angular, undefined) {

  "use strict";

  function deletePantryFoodsService($http, $q, BASE_URL, pantriesModel) {

    return function (pantryId, foodId) {
      var deferred = $q.defer();

      $http.delete(BASE_URL + "recipes/pantries/" + pantryId + "/foods/" + foodId + "/").then(function (response) {
        pantriesModel.update(response.data);
        deferred.resolve(pantriesModel);
      }, function (response) {
        console.error("Failed to delete pantry foods!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("deletePantryFoodsService", ["$http", "$q", "BASE_URL", "pantriesModel", deletePantryFoodsService]);

})(window, window.angular);