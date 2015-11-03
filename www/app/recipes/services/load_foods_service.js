(function (window, angular, undefined) {

  "use strict";

  function loadFoodsService($http, $q, BASE_URL, foodsModel) {

    return function () {
      var deferred = $q.defer();

      $http.get(BASE_URL + "recipes/foods/").then(function (response) {
        foodsModel.update(response.data);
        deferred.resolve(foodsModel);
      }, function (response) {
        console.error("Foods failed to load!");
        deferred.reject(response.data);
      });

      return deferred.promise;
    };
  }

  angular.module("app")
    .factory("loadFoodsService", ["$http", "$q", "BASE_URL", "foodsModel", loadFoodsService]);

})(window, window.angular);