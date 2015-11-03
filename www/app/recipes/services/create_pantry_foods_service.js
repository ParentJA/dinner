(function (window, angular, undefined) {

  "use strict";

  function createPantryFoodsService($http, $q, BASE_URL, pantriesModel) {

    return function (pantryId, foodId, amount, unitOfMeasure) {
      var deferred = $q.defer();

      $http.post(BASE_URL + "recipes/pantries/" + pantryId + "/foods/" + foodId + "/", {
        amount: amount,
        unitOfMeasure: unitOfMeasure
      }).then(function (response) {
        pantriesModel.update(response.data);
        deferred.resolve(pantriesModel);
      }, function (response) {
        console.error("Failed to create pantry foods!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("createPantryFoodsService", ["$http", "$q", "BASE_URL", "pantriesModel", createPantryFoodsService]);

})(window, window.angular);