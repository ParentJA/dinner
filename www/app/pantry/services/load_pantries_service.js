(function (window, angular, undefined) {

  "use strict";

  function loadPantriesService($http, $q, BASE_URL, pantriesModel) {

    return function () {
      var deferred = $q.defer();

      $http.get(BASE_URL + "recipes/pantries/").then(function (response) {
        pantriesModel.update(response.data);
        deferred.resolve(pantriesModel);
      }, function (response) {
        console.error("Pantries failed to load!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("loadPantriesService", ["$http", "$q", "BASE_URL", "pantriesModel", loadPantriesService]);

})(window, window.angular);