describe("a recipes service", function () {

  var recipe = {
    id: 1,
    name: "Salsa"
  };
  var recipesModelMock;
  var recipesService;

  beforeEach(function () {
    module("app", function ($provide) {
      // Handle mocks...
      recipesModelMock = jasmine.createSpyObj("recipesModel", ["getRecipes"]);
      recipesModelMock.getRecipes = function () {
        return [recipe];
      };

      $provide.value("recipesModel", recipesModelMock);
    });

    inject(function ($injector) {
      recipesService = $injector.get("recipesService");
    });
  });

  it("should return whether a recipe is full", function () {

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

});