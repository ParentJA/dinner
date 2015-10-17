(function (window, angular, undefined) {

  "use strict";

  function loadDishesService($http, $q, BASE_URL, dishesModel) {

    return function() {
      var deferred = $q.defer();

      $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        dishesModel.update(response.data);
        deferred.resolve(dishesModel);
      }, function (response) {
        console.error("Dishes failed to load!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("loadDishesService", ["$http", "$q", "BASE_URL", "dishesModel", loadDishesService]);

})(window, window.angular);