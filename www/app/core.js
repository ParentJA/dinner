(function (window, angular, undefined) {

  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("meals", {
        url: "/meals",
        template: "<div ui-view></div>",
        resolve: {
          dishes: function (dishesService, loadDishesService) {
            if (!dishesService.hasDishes()) {
              loadDishesService.getDishes();
            }

            return dishesService.getDishes();
          }
        },
        abstract: true
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  function MainController($scope, $state, accountsService) {
    $scope.getUser = function getUser() {
      return accountsService.getUser();
    };

    $scope.hasUser = function hasUser() {
      return accountsService.hasUser();
    };

    $scope.logOut = function logOut() {
      accountsService.logOut().then(function () {
        $state.go("home");
      });
    };
  }

  angular.module("app", ["ngCookies", "ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner])
    .controller("MainController", ["$scope", "$state", "accountsService", MainController]);

})(window, window.angular);