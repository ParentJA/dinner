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
          recipes: function (recipesModel, loadRecipesService) {
            if (_.isEmpty(recipesModel.getRecipes())) {
              var useCategories = true;
              var useFoods = true;

              return loadRecipesService(useCategories, useFoods);
            }

            return recipesModel;
          }
        },
        abstract: true
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state, navigationService) {
    $rootScope.$state = $state;
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
      navigationService.closeNavigation();
    });
  }

  function MainController($scope, $state, accountsService, navigationService) {
    $scope.navigationService = navigationService;

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

  angular.module("app", ["ngAnimate", "ngCookies", "ngSanitize", "ui.bootstrap", "ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", "navigationService", UiRunner])
    .controller("MainController", ["$scope", "$state", "accountsService", "navigationService", MainController]);

})(window, window.angular);