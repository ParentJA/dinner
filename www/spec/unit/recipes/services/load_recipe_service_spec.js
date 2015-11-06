describe("a load recipe service", function () {

  var $httpBackend;
  var loadRecipeService;
  var recipesModelMock;

  var responseData = {
    recipes: [{
      description: "A delicious mixture of chopped vegetables.",
      id: 1,
      instructions: "<ol><li>Chop vegetables.</li><li>Combine.</li></ol>",
      name: "Salsa"
    }]
  };

  beforeEach(function () {
    module("app", function ($provide, $urlRouterProvider) {
      $urlRouterProvider.deferIntercept();

      // Handle mocks...
      recipesModelMock = jasmine.createSpyObj("recipesModel", ["updateOne"]);

      $provide.value("recipesModel", recipesModelMock);
    });

    inject(function ($injector) {
      $httpBackend = $injector.get("$httpBackend");
      $httpBackend.when("GET", "/api/v1/recipes/recipes/1/").respond(responseData);

      loadRecipeService = $injector.get("loadRecipeService");
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should get a full recipe", function () {

    $httpBackend.expectGET("/api/v1/recipes/recipes/1/");
    loadRecipeService(1);
    $httpBackend.flush();

    // Confirm model update called...
    expect(recipesModelMock.updateOne).toHaveBeenCalledWith(responseData);

  });

});