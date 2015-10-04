(function (window, angular, undefined) {

  "use strict";

  function ProfileRouterConfig($stateProvider) {
    $stateProvider.state("profile", {
      url: "/profile",
      templateUrl: "/static/profile/views/profile/profile.html",
      controller: "ProfileController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", ProfileRouterConfig]);

})(window, window.angular);