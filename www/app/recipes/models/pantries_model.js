(function (window, angular, undefined) {

  "use strict";

  function pantriesModel() {
    var pantries = [];

    var service = {
      createFood: function createFood(food, amount, unitOfMeasure) {

      },
      deleteFood: function deleteFood(food) {

      },
      getPantries: function getPantries() {
        return pantries;
      },
      update: function update(data) {
        pantries = data.pantries;
      },
      updateFood: function updateFood(food, amount, unitOfMeasure) {

      }
    };

    return service;
  }

  angular.module("app")
    .factory("pantriesModel", [pantriesModel]);

})(window, window.angular);