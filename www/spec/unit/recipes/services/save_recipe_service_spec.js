describe("a save recipe service", function () {

  var $httpBackend;
  var saveRecipeService;
  var recipesModelMock;

  var responseData = {
    recipes: [{
      description: "A delicious mixture of chopped vegetables.",
      id: 1,
      in_progress: true,
      instructions: "<ol><li>Chop vegetables.</li><li>Combine.</li></ol>",
      name: "Salsa"
    }]
  };

  beforeEach(function () {
    module("app", function ($provide, $urlRouterProvider) {
      $urlRouterProvider.deferIntercept();

      // Handle mocks...
      recipesModelMock = jasmine.createSpyObj("recipesModel", ["updateOne", "getRecipeById"]);

      $provide.value("recipesModel", recipesModelMock);
    });

    inject(function ($injector) {
      $httpBackend = $injector.get("$httpBackend");
      $httpBackend.when("PUT", "/api/v1/recipes/recipes/1/").respond(responseData);

      saveRecipeService = $injector.get("saveRecipeService");
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should save that a user has started making a recipe", function () {

    $httpBackend.expectPUT("/api/v1/recipes/recipes/1/");
    saveRecipeService(1, true);
    $httpBackend.flush();

    // Confirm model update called...
    expect(recipesModelMock.updateOne).toHaveBeenCalledWith(responseData);

  });

});