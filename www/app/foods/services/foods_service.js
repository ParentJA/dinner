(function (window, angular, undefined) {

  "use strict";

  function foodsService(recipesModel) {
    var selectedFood = {};
    var selectedFoods = [];

    var service = {
      addSelectedFood: addSelectedFood,
      getFoods: getFoods,
      getSelectedFood: getSelectedFood,
      getSelectedFoods: getSelectedFoods,
      getTotalFoods: getTotalFoods,
      hasFoods: hasFoods,
      hasSelectedFoods: hasSelectedFoods,
      isSelectedFood: isSelectedFood,
      removeSelectedFood: removeSelectedFood,
      setSelectedFood: setSelectedFood
    };

    function addSelectedFood(food) {
      if (!_.includes(selectedFoods, food)) {
        selectedFoods.push(food);
      }
    }

    function getFoods() {
      return recipesModel.getFoods();
    }

    function getSelectedFood() {
      return selectedFood;
    }

    function getSelectedFoods() {
      return selectedFoods;
    }

    function getTotalFoods() {
      return _.size(recipesModel.getFoods());
    }

    function hasFoods() {
      return (!_.isEmpty(recipesModel.getFoods()));
    }

    function hasSelectedFoods() {
      return !_.isEmpty(selectedFoods);
    }

    function isSelectedFood(value) {
      return (selectedFood === value);
    }

    function removeSelectedFood(food) {
      _.remove(selectedFoods, food);
    }

    function setSelectedFood(value) {
      selectedFood = value;
    }

    return service;
  }

  angular.module("app")
    .factory("foodsService", ["recipesModel", foodsService]);

})(window, window.angular);