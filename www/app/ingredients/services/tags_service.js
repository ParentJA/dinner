(function (window, angular, undefined) {

  "use strict";

  function tagsService(DishesModel) {
    var service = {
      getTags: getTags,
      hasTags: hasTags
    };

    function getTags() {
      return DishesModel.getTags();
    }

    function hasTags() {
      return !_.isEmpty(DishesModel.getTags());
    }

    return service;
  }

  angular.module("app")
    .factory("tagsService", ["DishesModel", tagsService]);

})(window, window.angular);