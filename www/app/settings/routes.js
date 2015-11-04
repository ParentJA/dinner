(function (window, angular, undefined) {

  "use strict";

  function SettingsController($scope, foodsService, settingsService, tagsService) {
    $scope.addFoodExclusion = addFoodExclusion;
    $scope.addFoodTagExclusion = addFoodTagExclusion;
    $scope.getFoods = getFoods;
    $scope.getFoodExclusions = getFoodExclusions;
    $scope.getFoodTagExclusions = getFoodTagExclusions;
    $scope.getTags = getTags;
    $scope.removeFoodExclusion = removeFoodExclusion;
    $scope.removeFoodTagExclusion = removeFoodTagExclusion;

    function addFoodExclusion(exclusion) {
      settingsService.addFoodExclusion(exclusion);
    }

    function addFoodTagExclusion(exclusion) {
      settingsService.addFoodTagExclusion(exclusion);
    }

    function getFoods() {
      return foodsService.getFoods();
    }

    function getFoodExclusions() {
      return settingsService.getFoodExclusions();
    }

    function getFoodTagExclusions() {
      return settingsService.getFoodTagExclusions();
    }

    function getTags() {
      return tagsService.getTags();
    }

    function removeFoodExclusion(exclusion) {
      settingsService.removeFoodExclusion(exclusion);
    }

    function removeFoodTagExclusion(exclusion) {
      settingsService.removeFoodTagExclusion(exclusion);
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
      "$scope", "foodsService", "settingsService", "tagsService", SettingsController
    ])
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);