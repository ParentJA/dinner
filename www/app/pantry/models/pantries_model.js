(function (window, angular, undefined) {

  "use strict";

  function pantriesModel() {
    var pantries = [];

    var service = {
      getPantries: function getPantries() {
        return pantries;
      },
      update: function update(data) {
        pantries = data.pantries;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("pantriesModel", [pantriesModel]);

})(window, window.angular);