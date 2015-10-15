(function (window, angular, undefined) {

  "use strict";

  function dishesService(DishesModel) {
    var selectedDish = {};

    function createEmptyVector(numElements) {
      return _.fill(new Array(numElements), 0);
    }

    function euclideanDistance(a, b) {
      var sum = 0;

      for (var i = 0, numItems = a.length; i < numItems; i++) {
        sum += Math.pow(a[i] - b[i], 2);
      }

      return Math.sqrt(sum);
    }

    var service = {
      findDishesWithIngredients: findDishesWithIngredients,
      findSimilarDishes: findSimilarDishes,
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

      var dishes = getDishes();

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

    /**
     * Finds dishes that have the highest number of shared ingredients and the least amount of unshared ingredients.
     * Gotchas:
     *  - if search for recipes that include n ingredients, a recipe with n non-matching ingredients may be a higher
     *    ranked match than a recipe with more than n total ingredients and some matching ingredients
     * @param targetIngredients
     * @param allIngredients
     * @returns {Array}
     */
    function findSimilarDishes(targetIngredients, allIngredients) {
      //var dishes = findDishesWithIngredients(targetIngredients);
      var dishes = getDishes();
      var numIngredients = allIngredients.length;
      var targetVector = createEmptyVector(numIngredients);

      if (_.isEmpty(targetIngredients)) {
        return [];
      }

      // Create vector from specified ingredients...
      _.forEach(targetIngredients, function (ingredient) {
        targetVector[ingredient.vectorIndex] = 1;
      });

      // Create vectors for ingredients in each recipe...
      _.forEach(dishes, function (dish) {
        var dishVector = createEmptyVector(numIngredients);

        _.forEach(dish._ingredients, function (ingredient) {
          dishVector[ingredient.vectorIndex] = 1;
        });

        dish.vector = dishVector;

        // Find Euclidean distances between dish vectors and ingredient vectors...
        dish.euclideanDistance = euclideanDistance(dish.vector, targetVector);
      });

      // Return the top 10 most similar dishes...
      return _.take(_.sortBy(dishes, "euclideanDistance"), 10);
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