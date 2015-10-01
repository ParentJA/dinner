(function (window, angular, undefined) {

  "use strict";

  function loadDishesService($http, BASE_URL, DishesModel) {
    var service = {
      getDishes: getDishes
    };

    function getDishes() {
      return $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        DishesModel.update(response.data);
      }, function () {
        console.error("Dishes failed to load!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("loadDishesService", ["$http", "BASE_URL", "DishesModel", loadDishesService]);

})(window, window.angular);