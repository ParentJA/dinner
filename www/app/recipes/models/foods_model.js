(function (window, angular, undefined) {

  "use strict";

  function foodsModel() {
    var foods = [];

    var service = {
      getFoods: function getFoods() {
        return foods;
      },
      update: function update(data) {
        foods = data.foods;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("foodsModel", [foodsModel]);

})(window, window.angular);