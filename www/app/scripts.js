(function (window, angular, undefined) {

  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("meals", {
        url: "/meals",
        template: "<div ui-view></div>",
        resolve: {
          dishes: function (dishesService, loadDishesService) {
            if (!dishesService.hasDishes()) {
              loadDishesService.getDishes();
            }

            return dishesService.getDishes();
          }
        },
        abstract: true
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function DishesController($scope, dishes, dishesService) {}

  function DishesRouterConfig($stateProvider) {
    $stateProvider.state("meals.dishes", {
      url: "/dishes",
      templateUrl: "/static/dishes/views/dishes/dishes.html",
      controller: "DishesController"
    });
  }

  angular.module("app")
    .controller("DishesController", ["$scope", "dishes", "dishesService", DishesController])
    .config(["$stateProvider", DishesRouterConfig]);

})(window, window.angular);

(function (window, angular, undefined) {

  "use strict";

  function HomeController($scope) {}

  function HomeRouterConfig($stateProvider) {
    $stateProvider.state("home", {
      url: "/",
      templateUrl: "/static/home/views/home/home.html",
      controller: "HomeController"
    });
  }

  angular.module("app")
    .controller("HomeController", ["$scope", HomeController])
    .config(["$stateProvider", HomeRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function MenuController($scope, dishes) {}

  function MenusRouterConfig($stateProvider) {
    $stateProvider.state("meals.menus", {
      url: "/menus",
      templateUrl: "/static/menus/views/menus/menus.html",
      controller: "MenuController"
    });
  }

  angular.module("app")
    .controller("MenuController", ["$scope", "dishes", MenuController])
    .config(["$stateProvider", MenusRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function IngredientsController($scope, dishes, dishesService, ingredientsService, settingsService) {
    $scope.addSelectedIngredient = addSelectedIngredient;
    $scope.frequency = frequency;
    $scope.getDishes = getDishes;
    $scope.getDishByName = getDishByName;
    $scope.getIngredients = getIngredients;
    $scope.getMatchingDishes = getMatchingDishes;
    $scope.getNumMatchingDishes = getNumMatchingDishes;
    $scope.getSelectedIngredient = getSelectedIngredient;
    $scope.getSelectedIngredients = getSelectedIngredients;
    $scope.getTotalIngredients = getTotalIngredients;
    $scope.hasSelectedIngredients = hasSelectedIngredients;
    $scope.numIngredients = 15;
    $scope.setSelectedDish = setSelectedDish;
    $scope.setSelectedIngredient = setSelectedIngredient;
    $scope.removeSelectedIngredient = removeSelectedIngredient;

    function addSelectedIngredient(ingredient) {
      ingredientsService.addSelectedIngredient(ingredient);
    }

    function frequency(ingredient) {
      var percentage = Math.round(ingredient.count / dishesService.getTotalDishes() * 100);

      return (percentage === Infinity) ? 0 : percentage;
    }

    function getDishes() {
      return dishesService.getDishes();
    }

    function getDishByName(name) {
      return _.find(dishesService.getDishes(), "name", name);
    }

    function getIngredients() {
      var ingredients = ingredientsService.getIngredients();

      // Remove ingredient exclusions...
      ingredients = _.difference(ingredients, settingsService.getIngredientExclusions());

      // Remove ingredient tag exclusions...
      _.forEach(settingsService.getIngredientTagExclusions(), function (tag) {
        ingredients = _.difference(ingredients, _.filter(ingredients, function (ingredient) {
          return _.includes(ingredient._tags, tag);
        }));
      });

      ingredients = _.difference(ingredients, settingsService.getIngredientTagExclusions());

      // Remove selected ingredients...
      ingredients = _.difference(ingredients, ingredientsService.getSelectedIngredients());

      return ingredients;
    }

    function getMatchingDishes() {
      return dishesService.findDishesWithIngredients(ingredientsService.getSelectedIngredients());
    }

    function getNumMatchingDishes() {
      return _.size($scope.getMatchingDishes());
    }

    function getSelectedIngredient() {
      return ingredientsService.getSelectedIngredient();
    }

    function getSelectedIngredients() {
      return ingredientsService.getSelectedIngredients();
    }

    function getTotalIngredients() {
      return _.size($scope.getIngredients());
    }

    function hasSelectedIngredients() {
      return !_.isEmpty(ingredientsService.getSelectedIngredients());
    }

    function setSelectedDish(dish) {
      dishesService.setSelectedDish(dish);
    }

    function setSelectedIngredient(ingredient) {
      ingredientsService.setSelectedIngredient(ingredient);
    }

    function removeSelectedIngredient(ingredient) {
      ingredientsService.removeSelectedIngredient(ingredient);
    }
  }

  function IngredientsRouterConfig($stateProvider) {
    $stateProvider.state("meals.ingredients", {
      url: "/ingredients",
      templateUrl: "/static/ingredients/views/ingredients/ingredients.html",
      controller: "IngredientsController"
    });
  }

  angular.module("app")
    .controller("IngredientsController", [
      "$scope", "dishes", "dishesService", "ingredientsService", "settingsService", IngredientsController
    ])
    .config(["$stateProvider", IngredientsRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function PantryController($scope, dishes) {}

  function PantryRouterConfig($stateProvider) {
    $stateProvider.state("meals.pantry", {
      url: "/pantry",
      templateUrl: "/static/pantry/views/pantry/pantry.html",
      controller: "PantryController"
    });
  }

  angular.module("app")
    .controller("PantryController", ["$scope", "dishes", PantryController])
    .config(["$stateProvider", PantryRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function SettingsController($scope, ingredientsService, settingsService, tagsService) {
    $scope.addIngredientExclusion = addIngredientExclusion;
    $scope.addIngredientTagExclusion = addIngredientTagExclusion;
    $scope.getIngredients = getIngredients;
    $scope.getIngredientExclusions = getIngredientExclusions;
    $scope.getIngredientTagExclusions = getIngredientTagExclusions;
    $scope.getTags = getTags;
    $scope.removeIngredientExclusion = removeIngredientExclusion;
    $scope.removeIngredientTagExclusion = removeIngredientTagExclusion;

    function addIngredientExclusion(exclusion) {
      settingsService.addIngredientExclusion(exclusion);
    }

    function addIngredientTagExclusion(exclusion) {
      settingsService.addIngredientTagExclusion(exclusion);
    }

    function getIngredients() {
      return ingredientsService.getIngredients();
    }

    function getIngredientExclusions() {
      return settingsService.getIngredientExclusions();
    }

    function getIngredientTagExclusions() {
      return settingsService.getIngredientTagExclusions();
    }

    function getTags() {
      return tagsService.getTags();
    }

    function removeIngredientExclusion(exclusion) {
      settingsService.removeIngredientExclusion(exclusion);
    }

    function removeIngredientTagExclusion(exclusion) {
      settingsService.removeIngredientTagExclusion(exclusion);
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
      "$scope", "ingredientsService", "settingsService", "tagsService", SettingsController
    ])
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function hasIngredient() {
    return function hasIngredientFilter(dishes, ingredient) {
      return _.filter(dishes, function (dish) {
        return _.includes(dish.ingredients, ingredient.id);
      });
    };
  }

  angular.module("app")
    .filter("hasIngredient", hasIngredient);

})(window, window.angular);
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

  angular.module("app")
    .factory("DishesModel", [DishesModel]);

})(window, window.angular);
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
(function (window, angular, undefined) {

  "use strict";

  function loadDishesService($http, BASE_URL, DishesModel) {
    var service = {
      getDishes: getDishes
    };

    function getDishes() {
      return $http.get(BASE_URL + "meals/dishes/").then(function (response) {
        DishesModel.update(response.data);
      }, function () {
        console.error("Dishes failed to load!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("loadDishesService", ["$http", "BASE_URL", "DishesModel", loadDishesService]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function title() {
    return function titleFilter(text) {
      return _.startCase(text);
    };
  }

  angular.module("app")
    .filter("title", title);

})(window, window.angular);
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
(function (window, angular, undefined) {

  "use strict";

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

  angular.module("app")
    .factory("tagsService", ["DishesModel", tagsService]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

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
    .service("settingsService", [settingsService]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function PillboxController($scope) {
    $scope.addTag = addTag;
    $scope.onKeyPressed = onKeyPressed;
    $scope.removeTag = removeTag;
    $scope.tagName = null;

    function addTag(tagName) {
      var tagObject = _.findWhere($scope.getCollection(), {name: tagName});

      if (tagObject && !_.includes($scope.exclusions, tagObject)) {
        $scope.exclusions.push(tagObject);
      }
    }

    function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addTag($scope.tagName);
        $scope.tagName = null;
      }
    }

    function removeTag(tag) {
      _.remove($scope.exclusions, tag);
    }
  }

  function pillbox() {
    return {
      restrict: "A",
      scope: {
        getCollection: "&collection",
        exclusions: "="
      },
      templateUrl: "/static/views/pillbox.html",
      controller: "PillboxController"
    };
  }

  angular.module("app")
    .controller("PillboxController", ["$scope", PillboxController])
    .directive("pillbox", [pillbox]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function DynamicListController($scope) {
    $scope.addElement = addElement;
    $scope.name = null;
    $scope.onKeyPressed = onKeyPressed;
    $scope.removeElement = removeElement;

    function addElement(name) {
      var element = _.find($scope.getCollection(), {name: name});

      if (!_.isEmpty(element) && !_.includes($scope.getElements(), element)) {
        $scope.addFn({element: element});
      }
    }

    function onKeyPressed(event) {
      if (event.keyCode === 13) {
        $scope.addElement($scope.name);
        $scope.name = null;
      }
    }

    function removeElement(element) {
      $scope.removeFn({element: element});
    }
  }

  function dynamicList() {
    return {
      restrict: "A",
      scope: {
        getCollection: "&collection",
        getElements: "&elements",
        addFn: "&",
        removeFn: "&"
      },
      templateUrl: "/static/global/views/dynamic_list/dynamic_list.html",
      controller: "DynamicListController"
    };
  }

  angular.module("app")
    .controller("DynamicListController", ["$scope", DynamicListController])
    .directive("dynamicList", [dynamicList]);

})(window, window.angular);
(function (window, angular, undefined) {
  
  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function PillboxTagController($scope) {}

  function pillboxTag() {
    return {
      restrict: "A",
      require: "^pillbox",
      scope: {
        tag: "=",
        removeTag: "&"
      },
      templateUrl: "/static/views/pillbox_tag.html",
      controller: "PillboxTagController"
    };
  }

  angular.module("app")
    .controller("PillboxTagController", ["$scope", PillboxTagController])
    .directive("pillboxTag", [pillboxTag]);

})(window, window.angular);
(function (window, angular, undefined) {
  
  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {
  
  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {
  
  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function DishController($scope) {

  }

  function dish() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/dishes/views/dishes/components/dish/dish.html",
      controller: "DishController"
    };
  }

  angular.module("app")
    .directive("dish", ["$scope", dish]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function DishDetailController($scope, dishesService) {
    $scope.getSelectedDish = getSelectedDish;
    $scope.getTotalIngredients = getTotalIngredients;

    function getSelectedDish() {
      return dishesService.getSelectedDish();
    }

    function getTotalIngredients() {
      return _.size(dishesService.getSelectedDish()._ingredients);
    }
  }

  function dishDetail() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/dishes/views/dishes/components/dish_detail/dish_detail.html",
      controller: "DishDetailController"
    };
  }

  angular.module("app")
    .controller("DishDetailController", ["$scope", "dishesService", DishDetailController])
    .directive("dishDetail", [dishDetail]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function DishListController($scope, dishesService) {
    $scope.getDishes = getDishes;
    $scope.getTotalDishes = getTotalDishes;
    $scope.hasDishes = hasDishes;
    $scope.isSelectedDish = isSelectedDish;
    $scope.setSelectedDish = setSelectedDish;

    function getDishes() {
      return dishesService.getDishes();
    }

    function getTotalDishes() {
      return _.size(dishesService.getDishes());
    }

    function hasDishes() {
      return dishesService.hasDishes();
    }

    function isSelectedDish(value) {
      return dishesService.isSelectedDish(value);
    }

    function setSelectedDish(value) {
      dishesService.setSelectedDish(value);
    }
  }

  function dishList() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/dishes/views/dishes/components/dish_list/dish_list.html",
      controller: "DishListController"
    };
  }

  angular.module("app")
    .controller("DishListController", ["$scope", "dishesService", DishListController])
    .directive("dishList", [dishList]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function IngredientController($scope) {

  }

  function ingredient() {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/static/ingredients/views/ingredients/components/ingredient/ingredient.html",
      controller: "IngredientController"
    };
  }

  angular.module("app")
    .directive("ingredient", ["$scope", ingredient]);

})(window, window.angular);