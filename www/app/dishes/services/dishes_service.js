(function (window, angular, undefined) {

  "use strict";

  function dishesService(dishesModel) {
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
      findDishesWithIngredients: function findDishesWithIngredients(ingredients) {
        if (_.isEmpty(ingredients)) {
          return [];
        }

        var dishes = dishesModel.getDishes();

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
      },
      findSimilarDishes: function findSimilarDishes(targetIngredients, allIngredients) {
        //var dishes = findDishesWithIngredients(targetIngredients);
        var dishes = dishesModel.getDishes();
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
      },
      getDishes: function getDishes() {
        return dishesModel.getDishes();
      },
      getSelectedDish: function getSelectedDish() {
        if (_.isEmpty(selectedDish)) {
          return _.first(_.sortBy(dishesModel.getDishes(), "name"));
        }

        return selectedDish;
      },
      getTotalDishes: function getTotalDishes() {
        return _.size(dishesModel.getDishes());
      },
      hasDishes: function hasDishes() {
        return (!_.isEmpty(dishesModel.getDishes()));
      },
      isSelectedDish: function isSelectedDish(dish) {
        return (selectedDish === dish);
      },
      setSelectedDish: function setSelectedDish(dish) {
        selectedDish = dish;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("dishesService", ["dishesModel", dishesService]);

})(window, window.angular);