(function (window, angular, undefined) {
  "use strict";

  function DishFactory() {
    return function (data) {
      _.forEach(data.dishes, function (dish) {
        dish._ingredients = [];

        _.forEach(dish.ingredients, function (ingredientId) {
          dish._ingredients.push(_.findWhere(data.ingredients, {id: ingredientId}));
        });
      });

      return data.dishes;
    }
  }

  function IngredientFactory() {
    return function (data) {
      return data.ingredients;
    }
  }

  function CuisineFactory() {
    return function (data) {
      return data.cuisines;
    }
  }

  function SourceFactory() {
    return function (data) {
      return data.sources;
    }
  }

  function dishService($http, BASE_URL, DishFactory, IngredientFactory, CuisineFactory, SourceFactory) {
    // Dishes...
    var dishes = [],
      selectedDish = null;

    // Ingredients...
    var ingredients = [],
      selectedIngredient = null;

    // Cuisines...
    var cuisines = [],
      selectedCuisine = null;

    // Sources...
    var sources = [],
      selectedSource = null;

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
      }
    };

    var init = function init() {
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
      }, function () {
        console.error("Dishes failed to load!");
      });
    };

    init();

    return service;
  }

  angular.module("app")
    .factory("DishFactory", [DishFactory])
    .factory("IngredientFactory", [IngredientFactory])
    .factory("CuisineFactory", [CuisineFactory])
    .factory("SourceFactory", [SourceFactory])
    .service("dishService", [
      "$http", "BASE_URL", "DishFactory", "IngredientFactory", "CuisineFactory", "SourceFactory", dishService
    ]);

})(window, window.angular);