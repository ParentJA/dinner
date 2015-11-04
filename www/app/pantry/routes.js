(function (window, angular, undefined) {

  "use strict";

  function PantryRouterConfig($stateProvider) {
    $stateProvider.state("meals.pantry", {
      url: "/pantry",
      templateUrl: "/static/pantry/views/pantry/pantry.html",
      controller: "PantryController",
      resolve: {
        pantries: function (loadPantriesService, pantriesModel) {
          if (_.isEmpty(pantriesModel.getPantries())) {
            return loadPantriesService();
          }

          return pantriesModel;
        },
        unitsOfMeasure: function (loadUnitsOfMeasureService) {
          return loadUnitsOfMeasureService();
        }
      }
    });
  }

  angular.module("app")
    .config(["$stateProvider", PantryRouterConfig]);

})(window, window.angular);