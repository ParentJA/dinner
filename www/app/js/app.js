(function (window, angular, undefined) {

  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/static/views/home.html",
        controller: "HomeController"
      })
      .state("pantry", {
        url: "/pantry",
        templateUrl: "/static/views/pantry.html",
        controller: "PantryController"
      })
      .state("menus", {
        url: "/menus",
        templateUrl: "/static/views/menus.html",
        controller: "MenuController"
      })
      .state("dishes", {
        url: "/dishes",
        templateUrl: "/static/views/dishes.html",
        controller: "DishController"
      })
      .state("ingredients", {
        url: "/ingredients",
        templateUrl: "/static/views/ingredients.html",
        controller: "IngredientController"
      })
      .state("settings", {
        url: "/settings",
        templateUrl: "/static/views/settings.html",
        controller: "SettingsController"
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);