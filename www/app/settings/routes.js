(function (window, angular, undefined) {

  "use strict";

  function SettingsController($scope, ingredientsService, settingsService, tagsService) {
    $scope.addIngredientExclusion = addIngredientExclusion;
    $scope.addIngredientTagExclusion = addIngredientTagExclusion;
    $scope.getIngredients = getIngredients;
    $scope.getIngredientExclusions = getIngredientExclusions;
    $scope.getIngredientTagExclusions = getIngredientTagExclusions;
    $scope.getTags = getTags;
    $scope.removeIngredientExclusion = removeIngredientExclusion;
    $scope.removeIngredientTagExclusion = removeIngredientTagExclusion;

    function addIngredientExclusion(exclusion) {
      settingsService.addIngredientExclusion(exclusion);
    }

    function addIngredientTagExclusion(exclusion) {
      settingsService.addIngredientTagExclusion(exclusion);
    }

    function getIngredients() {
      return ingredientsService.getIngredients();
    }

    function getIngredientExclusions() {
      return settingsService.getIngredientExclusions();
    }

    function getIngredientTagExclusions() {
      return settingsService.getIngredientTagExclusions();
    }

    function getTags() {
      return tagsService.getTags();
    }

    function removeIngredientExclusion(exclusion) {
      settingsService.removeIngredientExclusion(exclusion);
    }

    function removeIngredientTagExclusion(exclusion) {
      settingsService.removeIngredientTagExclusion(exclusion);
    }
  }

  function SettingsRouterConfig($stateProvider) {
    $stateProvider.state("settings", {
      url: "/settings",
      templateUrl: "/static/settings/views/settings/settings.html",
      controller: "SettingsController"
    });
  }

  angular.module("app")
    .controller("SettingsController", [
      "$scope", "ingredientsService", "settingsService", "tagsService", SettingsController
    ])
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);