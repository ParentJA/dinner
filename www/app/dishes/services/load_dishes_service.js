(function (window, angular, undefined) {

  "use strict";

  function loadDishesService($http, BASE_URL, DishesModel) {
    this.getDishes = getDishes;

    function getDishes() {
      return $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        DishesModel.update(response.data);
      }, function () {
        console.error("Dishes failed to load!");
      });
    }
  }

  angular.module("app")
    .service("loadDishesService", ["$http", "BASE_URL", "DishesModel", loadDishesService]);

})(window, window.angular);