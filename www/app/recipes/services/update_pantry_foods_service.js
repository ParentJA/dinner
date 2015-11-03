(function (window, angular, undefined) {

  "use strict";

  function updatePantryFoodsService($http, $q, BASE_URL, pantriesModel) {

    return function (pantryId, foodId, amount, unitOfMeasure) {
      var deferred = $q.defer();

      $http.put(BASE_URL + "recipes/pantries/" + pantryId + "/foods/" + foodId + "/", {
        amount: amount,
        unitOfMeasure: unitOfMeasure
      }).then(function (response) {
        pantriesModel.update(response.data);
        deferred.resolve(pantriesModel);
      }, function (response) {
        console.error("Failed to update pantry foods!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("updatePantryFoodsService", ["$http", "$q", "BASE_URL", "pantriesModel", updatePantryFoodsService]);

})(window, window.angular);