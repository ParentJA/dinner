describe("a load recipes service", function () {

  var $httpBackend;
  var loadRecipesService;
  var recipesModelMock;

  var responseData = {
    recipes: [{
      categories: [1],
      foods: [1],
      id: 1,
      name: "Salsa"
    }]
  };

  var responseDataCategories = {
    recipe_categories: [{
      description: "Mexican",
      id: 1
    }],
    recipes: [{
      categories: [1],
      foods: [1],
      id: 1,
      name: "Salsa"
    }]
  };

  var responseDataFoods = {
    foods: [{
      categories: [1],
      count: 1,
      id: 1,
      name: "tomatoes"
    }],
    recipes: [{
      categories: [1],
      foods: [1],
      id: 1,
      name: "Salsa"
    }]
  };

  var responseDataCategoriesFoods = {
    food_categories: [{
      description: "vegetable",
      id: 1
    }],
    foods: [{
      categories: [1],
      count: 1,
      id: 1,
      name: "tomatoes"
    }],
    recipe_categories: [{
      description: "Mexican",
      id: 1
    }],
    recipes: [{
      categories: [1],
      foods: [1],
      id: 1,
      name: "Salsa"
    }]
  };

  beforeEach(function () {
    module("app", function ($provide, $urlRouterProvider) {
      $urlRouterProvider.deferIntercept();

      // Handle mocks...
      recipesModelMock = jasmine.createSpyObj("recipesModel", ["update"]);

      $provide.value("recipesModel", recipesModelMock);
    });

    inject(function ($injector) {
      $httpBackend = $injector.get("$httpBackend");
      $httpBackend.when("GET", "/api/v1/recipes/recipes/?categories=false&foods=false").respond(responseData);
      $httpBackend.when("GET", "/api/v1/recipes/recipes/?categories=true&foods=false").respond(responseDataCategories);
      $httpBackend.when("GET", "/api/v1/recipes/recipes/?categories=false&foods=true").respond(responseDataFoods);
      $httpBackend.when("GET", "/api/v1/recipes/recipes/?categories=true&foods=true").respond(responseDataCategoriesFoods);

      loadRecipesService = $injector.get("loadRecipesService");
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should get a basic list of recipes", function () {

    var useCategories = false;
    var useFoods = false;

    $httpBackend.expectGET("/api/v1/recipes/recipes/?categories=false&foods=false");
    loadRecipesService(useCategories, useFoods);
    $httpBackend.flush();

    // Confirm model update called...
    expect(recipesModelMock.update).toHaveBeenCalledWith(responseData);

  });

  it("should get a basic list of recipes with categories", function () {

    var useCategories = true;
    var useFoods = false;

    $httpBackend.expectGET("/api/v1/recipes/recipes/?categories=true&foods=false");
    loadRecipesService(useCategories, useFoods);
    $httpBackend.flush();

    // Confirm model update called...
    expect(recipesModelMock.update).toHaveBeenCalledWith(responseDataCategories);

  });

  it("should get a basic list of recipes with foods", function () {

    var useCategories = false;
    var useFoods = true;

    $httpBackend.expectGET("/api/v1/recipes/recipes/?categories=false&foods=true");
    loadRecipesService(useCategories, useFoods);
    $httpBackend.flush();

    // Confirm model update called...
    expect(recipesModelMock.update).toHaveBeenCalledWith(responseDataFoods);

  });

  it("should get a basic list of recipes with categories and foods", function () {

    var useCategories = true;
    var useFoods = true;

    $httpBackend.expectGET("/api/v1/recipes/recipes/?categories=true&foods=true");
    loadRecipesService(useCategories, useFoods);
    $httpBackend.flush();

    // Confirm model update called...
    expect(recipesModelMock.update).toHaveBeenCalledWith(responseDataCategoriesFoods);

  });

});