(function (window, angular, undefined) {

  "use strict";

  function dishesService(DishesModel) {
    var selectedDish = {};

    var service = {
      findDishesWithIngredients: findDishesWithIngredients,
      getDishes: getDishes,
      getSelectedDish: getSelectedDish,
      getTotalDishes: getTotalDishes,
      hasDishes: hasDishes,
      isSelectedDish: isSelectedDish,
      setSelectedDish: setSelectedDish
    };

    function findDishesWithIngredients(ingredients) {
      if (_.isEmpty(ingredients)) {
        return [];
      }

      var dishes = DishesModel.getDishes();

      var rankMap = {};

      _.forEach(ingredients, function (ingredient) {
        var dishesWithIngredient = _.filter(dishes, function (dish) {
          return _.includes(dish._ingredients, ingredient);
        });

        _.forEach(dishesWithIngredient, function (dish) {
          if (!_.has(rankMap, dish.name)) {
            rankMap[dish.name] = 0;
          }

          rankMap[dish.name] += 1;
        });
      });

      var invertedRankMap = _.invert(rankMap, true);
      var bestMatchesIndex = _.last(_.keys(invertedRankMap).sort());
      var bestMatches = invertedRankMap[bestMatchesIndex];

      return _.filter(dishes, function (dish) {
        return _.includes(bestMatches, dish.name);
      });
    }

    function getDishes() {
      return DishesModel.getDishes();
    }

    function getSelectedDish() {
      if (_.isEmpty(selectedDish)) {
        return _.first(_.sortBy(DishesModel.getDishes(), "name"));
      }

      return selectedDish;
    }

    function getTotalDishes() {
      return _.size(DishesModel.getDishes());
    }

    function hasDishes() {
      return (!_.isEmpty(DishesModel.getDishes()));
    }

    function isSelectedDish(dish) {
      return (selectedDish === dish);
    }

    function setSelectedDish(dish) {
      selectedDish = dish;
    }

    return service;
  }

  angular.module("app")
    .factory("dishesService", ["DishesModel", dishesService]);

})(window, window.angular);