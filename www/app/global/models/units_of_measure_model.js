(function (window, angular, undefined) {

  "use strict";

  function unitsOfMeasureModel() {
    var unitsOfMeasure = [];

    var service = {
      getUnitsOfMeasure: function getUnitsOfMeasure() {
        return unitsOfMeasure;
      },
      update: function update(data) {
        unitsOfMeasure = data.units_of_measure;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("unitsOfMeasureModel", [unitsOfMeasureModel]);

})(window, window.angular);