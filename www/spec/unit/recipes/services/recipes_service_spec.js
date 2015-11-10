describe("a recipes service", function () {

  var recipes = [{
    id: 1,
    name: "Salsa"
  }, {
    id: 2,
    name: "Tomatillo Salsa"
  }];

  var recipesModel;
  var recipesService;

  beforeEach(function () {
    module("app");

    inject(function ($injector) {
      recipesModel = $injector.get("recipesModel");

      spyOn(recipesModel, "getRecipes").and.returnValue(recipes);

      recipesService = $injector.get("recipesService");
    });
  });

  it("should return whether a recipe is full", function () {

    var recipe = _.first(recipes);
    var isFullRecipe = recipesService.isFullRecipe(recipe);

    expect(isFullRecipe).toEqual(false);

    isFullRecipe = recipesService.isFullRecipe({
      description: "A delicious mixture of chopped vegetables.",
      id: 1,
      instructions: "<ol><li>Chop vegetables.</li><li>Combine.</li></ol>",
      name: "Salsa"
    });

    expect(isFullRecipe).toEqual(true);

  });

  it("should be able to store and retrieve a selected recipe", function () {

    // If no recipe is selected, the selected recipe is the first recipe...
    var firstRecipe = _.first(recipes);
    var selectedRecipe = recipesService.getSelectedRecipe();

    expect(selectedRecipe).toEqual(firstRecipe);

    // A recipe can be selected...
    var lastRecipe = _.last(recipes);

    recipesService.setSelectedRecipe(lastRecipe);

    expect(recipesService.isSelectedRecipe(lastRecipe)).toBe(true);

  });

  it("should return a list of recipes", function () {

    expect(recipesService.hasRecipes()).toBe(true);
    expect(recipesService.getRecipes()).toEqual(recipes);
    expect(recipesService.getTotalRecipes()).toEqual(2);

  });

});

describe("a recipe search system", function () {

  // Foods...
  var avocados;
  var cilantro;
  var garlic;
  var limes;
  var onions;
  var tomatillos;
  var tomatoes;
  var salt;
  var serranoPeppers;

  // Recipes...
  var guacamole;
  var tomatoSalsa;
  var tomatilloSalsa;

  var recipes;
  var recipesModel;
  var recipesService;

  beforeEach(function () {
    module("app");

    inject(function ($injector) {
      recipesModel = $injector.get("recipesModel");
      recipesService = $injector.get("recipesService");
    });
  });

  beforeEach(function () {
    // Handle foods...
    avocados = {
      id: 1,
      name: "avocados",
      vectorIndex: 0
    };

    cilantro = {
      id: 2,
      name: "cilantro",
      vectorIndex: 1
    };

    garlic = {
      id: 3,
      name: "garlic",
      vectorIndex: 2
    };

    limes = {
      id: 4,
      name: "limes",
      vectorIndex: 3
    };

    onions = {
      id: 5,
      name: "onions",
      vectorIndex: 4
    };

    tomatillos = {
      id: 6,
      name: "tomatillos",
      vectorIndex: 5
    };

    tomatoes = {
      id: 7,
      name: "tomatoes",
      vectorIndex: 6
    };

    salt = {
      id: 8,
      name: "salt",
      vectorIndex: 7
    };

    serranoPeppers = {
      id: 9,
      name: "serrano peppers",
      vectorIndex: 8
    };

    guacamole = {
      id: 3,
      name: "Guacamole",
      _foods: [onions, serranoPeppers, tomatoes, garlic, cilantro, avocados, salt, limes]
    };

    tomatilloSalsa = {
      id: 2,
      name: "Tomatillo Salsa",
      _foods: [tomatillos, serranoPeppers, cilantro, onions, salt]
    };

    tomatoSalsa = {
      id: 1,
      name: "Tomato Salsa",
      _foods: [tomatoes, serranoPeppers, onions, garlic, cilantro, salt, limes]
    };

    recipes = [tomatoSalsa, tomatilloSalsa, guacamole];

    spyOn(recipesModel, "getRecipes").and.returnValue(recipes);
  });

  it("should return foods that have the highest number of matching foods", function () {

    var foods;
    var recipes;

    // Get recipes that have a single shared ingredient that is not shared by the others...
    foods = [tomatoes];
    recipes = recipesService.findRecipesWithFoods(foods);

    expect(_.map(recipes, "name").sort()).toEqual(["Guacamole", "Tomato Salsa"]);

    // Get recipes that have exclusive ingredients...
    foods = [tomatillos];
    recipes = recipesService.findRecipesWithFoods(foods);

    expect(_.map(recipes, "name").sort()).toEqual(["Tomatillo Salsa"]);

    // Get recipes that ingredients that are shared by all...
    foods = [cilantro, onions, salt, serranoPeppers];
    recipes = recipesService.findRecipesWithFoods(foods);

    expect(_.map(recipes, "name").sort()).toEqual(["Guacamole", "Tomatillo Salsa", "Tomato Salsa"]);

    // Get recipes that are the best match...
    foods = [tomatillos, serranoPeppers, cilantro, onions, salt];
    recipes = recipesService.findRecipesWithFoods(foods);

    expect(_.map(recipes, "name").sort()).toEqual(["Tomatillo Salsa"]);

  });

  it("should return recipes that are most similar to a given recipe", function () {

    var foods;
    var recipeFoods;
    var recipes;

    // Get recipes sorted in order of how close they match...
    foods = [avocados, cilantro, garlic, limes, onions, salt, serranoPeppers, tomatillos, tomatoes];
    recipeFoods = [tomatillos, serranoPeppers, cilantro, onions, salt];
    recipes = recipesService.findSimilarRecipes(recipeFoods, foods);

    // Have the highest number of matching ingredients and the smallest difference in number of ingredients...
    expect(_.map(recipes, "name")).toEqual(["Tomatillo Salsa", "Tomato Salsa", "Guacamole"]);

    recipeFoods = [tomatoes, serranoPeppers, onions, garlic, cilantro, salt, limes];
    recipes = recipesService.findSimilarRecipes(recipeFoods, foods);

    // Have the highest number of matching ingredients and the smallest difference in number of ingredients...
    expect(_.map(recipes, "name")).toEqual(["Tomato Salsa", "Guacamole", "Tomatillo Salsa"]);

  });

});