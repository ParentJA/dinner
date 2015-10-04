(function (window, angular, undefined) {

  "use strict";

  function ingredientsService(DishesModel) {
    var selectedIngredient = {};
    var selectedIngredients = [];

    var service = {
      addSelectedIngredient: addSelectedIngredient,
      getIngredients: getIngredients,
      getSelectedIngredient: getSelectedIngredient,
      getSelectedIngredients: getSelectedIngredients,
      getTotalIngredients: getTotalIngredients,
      hasIngredients: hasIngredients,
      hasSelectedIngredients: hasSelectedIngredients,
      isSelectedIngredient: isSelectedIngredient,
      removeSelectedIngredient: removeSelectedIngredient,
      setSelectedIngredient: setSelectedIngredient
    };

    function addSelectedIngredient(ingredient) {
      if (!_.includes(selectedIngredients, ingredient)) {
        selectedIngredients.push(ingredient);
      }
    }

    function getIngredients() {
      return DishesModel.getIngredients();
    }

    function getSelectedIngredient() {
      return selectedIngredient;
    }

    function getSelectedIngredients() {
      return selectedIngredients;
    }

    function getTotalIngredients() {
      return _.size(DishesModel.getIngredients());
    }

    function hasIngredients() {
      return (!_.isEmpty(DishesModel.getIngredients()));
    }

    function hasSelectedIngredients() {
      return !_.isEmpty(selectedIngredients);
    }

    function isSelectedIngredient(value) {
      return (selectedIngredient === value);
    }

    function removeSelectedIngredient(ingredient) {
      _.remove(selectedIngredients, ingredient);
    }

    function setSelectedIngredient(value) {
      selectedIngredient = value;
    }

    return service;
  }

  angular.module("app")
    .factory("ingredientsService", ["DishesModel", ingredientsService]);

})(window, window.angular);