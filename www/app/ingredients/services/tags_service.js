(function (window, angular, undefined) {

  "use strict";

  function tagsService(dishesModel) {
    var service = {
      getTags: getTags,
      hasTags: hasTags
    };

    function getTags() {
      return dishesModel.getTags();
    }

    function hasTags() {
      return !_.isEmpty(dishesModel.getTags());
    }

    return service;
  }

  angular.module("app")
    .factory("tagsService", ["dishesModel", tagsService]);

})(window, window.angular);