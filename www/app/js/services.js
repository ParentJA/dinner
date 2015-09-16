(function (window, angular, undefined) {

  "use strict";

  function DishFactory() {
    return function (data) {
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredients, function (ingredientId) {
          dish._ingredients.push(_.find(data.ingredients, {id: ingredientId}));
        });
      });

      return data.dishes;
    };
  }

  function IngredientFactory() {
    return function (data) {
      _.forEach(data.ingredients, function (ingredient) {
        ingredient._tags = [];

        _.forEach(ingredient.tags, function (tagId) {
          ingredient._tags.push(_.find(data.tags, {id: tagId}));
        });
      });

      return data.ingredients;
    };
  }

  function CuisineFactory() {
    return function (data) {
      return data.cuisines;
    };
  }

  function SourceFactory() {
    return function (data) {
      return data.sources;
    };
  }

  function TagFactory() {
    return function (data) {
      return data.tags;
    }
  }

  function dishService($http, BASE_URL, DishFactory, IngredientFactory, CuisineFactory, SourceFactory, TagFactory) {
    // Dishes...
    var dishes = [],
      selectedDish = null;

    // Ingredients...
    var ingredients = [],
      selectedIngredient = null,
      selectedIngredients = [];

    // Cuisines...
    var cuisines = [],
      selectedCuisine = null;

    // Sources...
    var sources = [],
      selectedSource = null;

    // Tag...
    var tags = [];

    var service = {
      hasDishes: function hasDishes() {
        return (!_.isEmpty(dishes));
      },
      getDishes: function getDishes() {
        return dishes;
      },
      getSelectedDish: function getSelectedDish() {
        return selectedDish;
      },
      setSelectedDish: function setSelectedDish(value) {
        selectedDish = value;
      },
      isSelectedDish: function isSelectedDish(value) {
        return (selectedDish === value);
      },
      getTotalDishes: function getTotalDishes() {
        return _.size(dishes);
      },
      hasIngredients: function hasIngredients() {
        return (!_.isEmpty(ingredients));
      },
      getIngredients: function getIngredients() {
        return ingredients;
      },
      getSelectedIngredient: function getSelectedIngredient() {
        return selectedIngredient;
      },
      setSelectedIngredient: function setSelectedIngredient(value) {
        selectedIngredient = value;
      },
      isSelectedIngredient: function isSelectedIngredient(value) {
        return (selectedIngredient === value);
      },

      addSelectedIngredient: function addSelectedIngredient(ingredient) {
        if (!_.includes(selectedIngredients, ingredient)) {
          selectedIngredients.push(ingredient);
        }
      },
      removeSelectedIngredient: function removeSelectedIngredient(ingredient) {
        _.remove(selectedIngredients, ingredient);
      },
      hasSelectedIngredients: function hasSelectedIngredients() {
        return !_.isEmpty(selectedIngredients);
      },
      getSelectedIngredients: function getSelectedIngredients() {
        return selectedIngredients;
      },

      getTotalIngredients: function getTotalIngredients() {
        return _.size(ingredients);
      },
      hasCuisines: function hasCuisines() {
        return (!_.isEmpty(cuisines));
      },
      getCuisines: function getCuisines() {
        return cuisines;
      },
      getSelectedCuisine: function getSelectedCuisine() {
        return selectedCuisine;
      },
      setSelectedCuisine: function setSelectedCuisine(value) {
        selectedCuisine = value;
      },
      isSelectedCuisine: function isSelectedCuisine(value) {
        return (selectedCuisine === value);
      },
      getTotalCuisines: function getTotalCuisines() {
        return _.size(cuisines);
      },
      hasSources: function hasSources() {
        return (!_.isEmpty(sources));
      },
      getSources: function getSources() {
        return sources;
      },
      getSelectedSource: function getSelectedSource() {
        return selectedSource;
      },
      setSelectedSource: function setSelectedSource(value) {
        selectedSource = value;
      },
      isSelectedSource: function isSelectedSource(value) {
        return (selectedSource === value);
      },
      getTotalSources: function getTotalSources() {
        return _.size(sources);
      },
      getTags: function getTags() {
        return tags;
      },

      findMatchingDishes: function findMatchingDishes(ingredients) {
        if (_.isEmpty(ingredients)) {
          return [];
        }

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

        return _.findByValues(dishes, "name", bestMatches);
      }
    };

    var init = function init() {
      _.mixin({
        findByValues: function (collection, property, values) {
          return _.filter(collection, function (element) {
            return _.includes(values, element[property]);
          });
        }
      });

      $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        // Dishes...
        dishes = new DishFactory(response.data);
        selectedDish = _.first(_.sortBy(dishes, "name"));

        // Ingredients...
        ingredients = new IngredientFactory(response.data);

        // Cuisines...
        cuisines = new CuisineFactory(response.data);

        // Sources...
        sources = new SourceFactory(response.data);

        // Tags...
        tags = new TagFactory(response.data);
      }, function () {
        console.error("Dishes failed to load!");
      });
    };

    init();

    return service;
  }

  function settingsService() {
    // Users might want to exclude specific ingredients for dietary reasons (e.g. Paleo, lactose intolerance, etc.)
    var ingredientExclusions = [];

    // Users might want to exclude groups of ingredients according to their tags
    var ingredientTagExclusions = [];

    var service = {
      hasIngredientExclusions: function hasIngredientExclusions() {
        return !_.isEmpty(ingredientExclusions);
      },
      getIngredientExclusions: function getIngredientExclusions() {
        return _.sortBy(ingredientExclusions, "name");
      },
      addIngredientExclusion: function addIngredientExclusion(exclusion) {
        if (!_.includes(ingredientExclusions, exclusion)) {
          ingredientExclusions.push(exclusion);
        }
      },
      removeIngredientExclusion: function removeIngredientExclusion(exclusion) {
        _.remove(ingredientExclusions, exclusion);
      },
      hasIngredientTagExclusions: function hasIngredientTagExclusions() {
        return !_.isEmpty(ingredientTagExclusions);
      },
      getIngredientTagExclusions: function getIngredientTagExclusions() {
        return _.sortBy(ingredientTagExclusions, "name");
      },
      addIngredientTagExclusion: function addIngredientTagExclusion(exclusion) {
        if (!_.includes(ingredientTagExclusions, exclusion)) {
          ingredientTagExclusions.push(exclusion);
        }
      },
      removeIngredientTagExclusion: function removeIngredientTagExclusion(exclusion) {
        _.remove(ingredientTagExclusions, exclusion);
      }
    };

    return service;
  }

  angular.module("app")
    .factory("DishFactory", [DishFactory])
    .factory("IngredientFactory", [IngredientFactory])
    .factory("CuisineFactory", [CuisineFactory])
    .factory("SourceFactory", [SourceFactory])
    .factory("TagFactory", [TagFactory])
    .service("dishService", [
      "$http",
      "BASE_URL",
      "DishFactory",
      "IngredientFactory",
      "CuisineFactory",
      "SourceFactory",
      "TagFactory",
      dishService
    ])
    .service("settingsService", [settingsService]);

})(window, window.angular);