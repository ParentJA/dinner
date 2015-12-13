(function (window, angular, undefined) {

  "use strict";

  function recipesService(recipesModel) {
    var selectedRecipe = {};

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
      findRecipesWithFoods: function findRecipesWithFoods(foods) {
        if (_.isEmpty(foods)) {
          return [];
        }

        var recipes = recipesModel.getRecipes();

        var rankMap = {};

        _.forEach(foods, function (food) {
          var recipesWithFood = _.filter(recipes, function (recipe) {
            return _.includes(recipe._foods, food);
          });

          _.forEach(recipesWithFood, function (recipe) {
            if (!_.has(rankMap, recipe.name)) {
              rankMap[recipe.name] = 0;
            }

            rankMap[recipe.name] += 1;
          });
        });

        var invertedRankMap = _.invert(rankMap, true);
        var bestMatchesIndex = _.last(_.keys(invertedRankMap).sort());
        var bestMatches = invertedRankMap[bestMatchesIndex];

        return _.filter(recipes, function (recipe) {
          return _.includes(bestMatches, recipe.name);
        });
      },
      findSimilarRecipes: function findSimilarRecipes(targetFoods, allFoods) {
        //var recipes = findRecipesWithFoods(targetFoods);
        var recipes = recipesModel.getRecipes();
        var numFoods = allFoods.length;
        var targetVector = createEmptyVector(numFoods);

        if (_.isEmpty(targetFoods)) {
          return [];
        }

        // Create vector from specified foods...
        _.forEach(targetFoods, function (food) {
          targetVector[food.vectorIndex] = 1;
        });

        // Create vectors for foods in each recipe...
        _.forEach(recipes, function (recipe) {
          var recipeVector = createEmptyVector(numFoods);

          _.forEach(recipe._foods, function (food) {
            recipeVector[food.vectorIndex] = 1;
          });

          recipe.vector = recipeVector;

          // Find Euclidean distances between recipe vectors and food vectors...
          recipe.euclideanDistance = euclideanDistance(recipe.vector, targetVector);
        });

        // Return the top 10 most similar recipes...
        return _.take(_.sortBy(recipes, "euclideanDistance"), 10);
      },
      getRecipes: function getRecipes() {
        return recipesModel.getRecipes();
      },
      getSelectedRecipe: function getSelectedRecipe() {
        if (_.isEmpty(selectedRecipe)) {
          return _.first(_.sortBy(recipesModel.getRecipes(), "name"));
        }

        return selectedRecipe;
      },
      getTotalRecipes: function getTotalRecipes() {
        return _.size(recipesModel.getRecipes());
      },
      hasRecipes: function hasRecipes() {
        return (!_.isEmpty(recipesModel.getRecipes()));
      },
      isFullRecipe: function (recipe) {
        return (_.has(recipe, "description") || _.has(recipe, "instructions"));
      },
      isRecipeInProgress: function isRecipeInProgress(recipe) {
        return (_.has(recipe, "inProgress") && recipe.inProgress === true);
      },
      isSelectedRecipe: function isSelectedRecipe(recipe) {
        return (selectedRecipe === recipe);
      },
      setSelectedRecipe: function setSelectedRecipe(recipe) {
        selectedRecipe = recipe;
      }
    };

    return service;
  }

  angular.module("app")
    .factory("recipesService", ["recipesModel", recipesService]);

})(window, window.angular);