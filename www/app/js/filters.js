(function (window, angular, undefined) {
  "use strict";

  function title() {
    return function titleFilter(text) {
      return _.startCase(text);
    };
  }

  angular.module("app")
    .filter("title", title);

})(window, window.angular);