(function (window, angular, undefined) {

  "use strict";

  function loadUnitsOfMeasureService($http, $q, BASE_URL, unitsOfMeasureModel) {

    return function () {
      var deferred = $q.defer();

      $http.get(BASE_URL + "recipes/units_of_measure/").then(function (response) {
        unitsOfMeasureModel.update(response.data);
        deferred.resolve(unitsOfMeasureModel);
      }, function (response) {
        console.error("Units of measure failed to load!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("loadUnitsOfMeasureService", [
      "$http", "$q", "BASE_URL", "unitsOfMeasureModel", loadUnitsOfMeasureService
    ]);

})(window, window.angular);