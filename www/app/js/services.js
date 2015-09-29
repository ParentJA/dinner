(function (window, angular, undefined) {

  "use strict";

  function DishesModel() {
    var dishes = [];
    var ingredients = [];
    var tags = [];

    var service = {
      getDishes: getDishes,
      getIngredients: getIngredients,
      getTags: getTags,
      update: update
    };

    function getDishes() {
      return dishes;
    }

    function getIngredients() {
      return ingredients;
    }

    function getTags() {
      return tags;
    }

    function update(data) {
      tags = data.tags;

      // Update ingredients with tag objects...
      _.forEach(data.ingredients, function (ingredient) {
        ingredient._tags = [];

        _.forEach(ingredient.tags, function (tagId) {
          ingredient._tags.push(_.find(data.tags, {id: tagId}));
        });
      });

      ingredients = data.ingredients;

      // Update dishes with ingredient objects...
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredients, function (ingredientId) {
          dish._ingredients.push(_.find(data.ingredients, {id: ingredientId}));
        });
      });

      dishes = data.dishes;
    }

    return service;
  }

  function loadDishesService($http, BASE_URL, DishesModel) {
    this.getDishes = getDishes;

    function getDishes() {
      return $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        DishesModel.update(response.data);
      }, function () {
        console.error("Dishes failed to load!");
      });
    }
  }

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

  function tagsService(DishesModel) {
    var service = {
      getTags: getTags,
      hasTags: hasTags
    };

    function getTags() {
      return DishesModel.getTags();
    }

    function hasTags() {
      return !_.isEmpty(DishesModel.getTags());
    }

    return service;
  }

  function settingsService() {
    // Users might want to exclude specific ingredients for dietary reasons (e.g. Paleo, lactose intolerance, etc.)
    var ingredientExclusions = [];

    // Users might want to exclude groups of ingredients according to their tags
    var ingredientTagExclusions = [];

    var service = {
      addIngredientExclusion: addIngredientExclusion,
      addIngredientTagExclusion: addIngredientTagExclusion,
      getIngredientExclusions: getIngredientExclusions,
      getIngredientTagExclusions: getIngredientTagExclusions,
      hasIngredientExclusions: hasIngredientExclusions,
      hasIngredientTagExclusions: hasIngredientTagExclusions,
      removeIngredientExclusion: removeIngredientExclusion,
      removeIngredientTagExclusion: removeIngredientTagExclusion
    };

    function addIngredientExclusion(exclusion) {
      if (!_.includes(ingredientExclusions, exclusion)) {
        ingredientExclusions.push(exclusion);
      }
    }

    function addIngredientTagExclusion(exclusion) {
      if (!_.includes(ingredientTagExclusions, exclusion)) {
        ingredientTagExclusions.push(exclusion);
      }
    }

    function getIngredientExclusions() {
      return _.sortBy(ingredientExclusions, "name");
    }

    function getIngredientTagExclusions() {
      return _.sortBy(ingredientTagExclusions, "name");
    }

    function hasIngredientExclusions() {
      return !_.isEmpty(ingredientExclusions);
    }

    function hasIngredientTagExclusions() {
      return !_.isEmpty(ingredientTagExclusions);
    }

    function removeIngredientExclusion(exclusion) {
      _.remove(ingredientExclusions, exclusion);
    }

    function removeIngredientTagExclusion(exclusion) {
      _.remove(ingredientTagExclusions, exclusion);
    }

    return service;
  }

  angular.module("app")
    .factory("DishesModel", [DishesModel])
    .service("loadDishesService", ["$http", "BASE_URL", "DishesModel", loadDishesService])
    .factory("dishesService", ["DishesModel", dishesService])
    .factory("ingredientsService", ["DishesModel", ingredientsService])
    .factory("tagsService", ["DishesModel", tagsService])
    .service("settingsService", [settingsService]);

})(window, window.angular);