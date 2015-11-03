(function (window, angular, undefined) {

  "use strict";

  function pantriesModel() {
    var pantries = [];

    var service = {
      getPantries: function getPantries() {
        return pantries;
      },
      update: function update(data) {
        // Update foods...
        var foodsMap = _.indexBy(data.foods, "id");

        _.forEach(data.pantries, function (pantry) {
          pantry._foods = [];

          _.forEach(pantry.foods, function (foodId) {
            pantry._foods.push(foodsMap[foodId]);
          });
        });

        pantries = data.pantries;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("pantriesModel", [pantriesModel]);

})(window, window.angular);