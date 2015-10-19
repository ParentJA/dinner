(function (window, angular, undefined) {

  "use strict";

  function pantriesModel() {
    var pantries = [];

    var service = {
      getPantries: function getPantries() {
        return pantries;
      },
      update: function update(data) {
        // Update ingredients...
        var ingredientsMap = _.indexBy(data.ingredients, "id");

        _.forEach(data.pantries, function (pantry) {
          pantry._ingredients = [];

          _.forEach(pantry.ingredients, function (ingredientId) {
            pantry._ingredients.push(ingredientsMap[ingredientId]);
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