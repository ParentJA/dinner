describe("a settings service", function () {

  var recipe1;
  var recipe2;
  var recipe3;
  var settingsService;

  beforeEach(function () {

    module("app", function () {

    });

    inject(function ($injector) {
      recipe1 = {
        id: 1,
        name: "Recipe 1",
        foods: [1, 2, 3, 4, 5]
      };
      recipe2 = {
        id: 2,
        name: "Recipe 2",
        foods: [1, 2, 3, 4]
      };
      recipe3 = {
        id: 3,
        name: "Recipe 3",
        foods: [1, 2, 3]
      };
      settingsService = $injector.get("settingsService");
    });

  });

  it("should filter recipes according to the number of foods they reference", function () {

    var recipes = [recipe1, recipe2, recipe3];

    expect(settingsService.filterByFoodCount(recipes, 0, 5)).toEqual(recipes);
    expect(settingsService.filterByFoodCount(recipes, 1, 4)).toEqual([recipe2, recipe3]);
    expect(settingsService.filterByFoodCount(recipes, 2, 3)).toEqual([recipe3]);
    expect(settingsService.filterByFoodCount(recipes, 4, 5)).toEqual([recipe1, recipe2]);
    expect(settingsService.filterByFoodCount(recipes, 5, 5)).toEqual([recipe1]);

  });

  it("should filter recipes by the fewest number of foods they reference", function () {

    var recipe4 = {
      id: 4,
      name: "Recipe 4",
      foods: [3, 4, 5]
    };
    var recipes = [recipe1, recipe2, recipe3, recipe4];

    expect(settingsService.filterByFewestFoodCount(recipes)).toEqual([recipe3, recipe4]);

  });

  it("should filter recipes by the greatest number of foods they reference", function () {

    var recipe4 = {
      id: 4,
      name: "Recipe 4",
      foods: [3, 4, 5, 6, 7]
    };
    var recipes = [recipe1, recipe2, recipe3, recipe4];

    expect(settingsService.filterByGreatestFoodCount(recipes)).toEqual([recipe1, recipe4]);

  });

  it("should filter recipes by whether they include a list of foods", function () {

    var recipes = [recipe1, recipe2, recipe3];

    expect(settingsService.filterByIncludedFoods(recipes, [1, 2, 3])).toEqual(recipes);
    expect(settingsService.filterByIncludedFoods(recipes, [4, 5])).toEqual([recipe1]);

  });

  it("should filter recipes by whether they exclude a list of foods", function () {

    var recipes = [recipe1, recipe2, recipe3];

    expect(settingsService.filterByExcludedFoods(recipes, [1, 2, 3])).toEqual([]);
    expect(settingsService.filterByExcludedFoods(recipes, [4, 5])).toEqual([recipe2, recipe3]);

  });

});