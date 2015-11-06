describe("a recipe model", function () {

  var recipesModel;
  var responseData = {
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
    module("app");

    inject(function ($injector) {
      recipesModel = $injector.get("recipesModel");
    });
  });

  it("should update the information for a collection of recipes", function () {

    //Confirm that the models has an update() method...
    expect(recipesModel.update).toBeDefined();

    recipesModel.update(responseData);

    var foods = recipesModel.getFoods();
    var food = _.find(foods, "id", 1);

    // Confirm that categories have been attached to the food...
    expect(food._categories).toEqual([{
      description: "vegetable",
      id: 1
    }]);

    // Confirm that a vector index has been attached to the food...
    expect(food.vectorIndex).toEqual(0);

    var recipes = recipesModel.getRecipes();
    var recipe = _.find(recipes, "id", 1);

    // Confirm that categories have been attached to the recipe...
    expect(recipe._categories).toEqual([{
      description: "Mexican",
      id: 1
    }]);

    // Confirm that food objects have been attached to the recipe...
    expect(recipe._foods).toEqual([{
      categories: [1],
      count: 1,
      id: 1,
      name: "tomatoes",
      vectorIndex: 0,
      _categories: [{
        description: "vegetable",
        id: 1
      }]
    }]);

  });

  describe("a recipe model that has already been updated", function () {

    beforeEach(function () {
      recipesModel.update(responseData);
    });

    it("should update the information for a single recipe", function () {

      // Confirm that the model has an updateOne() method...
      expect(recipesModel.updateOne).toBeDefined();

      var description = "A delicious mixture of chopped vegetables.";
      var instructions = "<ol><li>Chop vegetables.</li><li>Combine.</li></ol>";

      // Example response data...
      var data = {
        recipes: [{
          description: description,
          id: 1,
          instructions: instructions,
          name: "Salsa"
        }]
      };

      recipesModel.updateOne(data);

      var recipes = recipesModel.getRecipes();
      var recipe = _.find(recipes, "id", 1);

      // Confirm that a description and instructions have been added to the recipe...
      expect(recipe.description).toEqual(description);
      expect(recipe.instructions).toEqual(instructions);

    });

    it("should get a list of food categories", function () {

      var foodCategories = recipesModel.getFoodCategories();

      expect(foodCategories).toEqual(responseData.food_categories);

    });

    it("should get a list of foods", function () {

      var foods = recipesModel.getFoods();

      expect(foods).toEqual([{
        categories: [1],
        count: 1,
        id: 1,
        name: "tomatoes",
        vectorIndex: 0,
        _categories: [{
          description: "vegetable",
          id: 1
        }]
      }]);

    });

    it("should get a list of recipe categories", function () {

      var recipeCategories = recipesModel.getRecipeCategories();

      expect(recipeCategories).toEqual(responseData.recipe_categories);

    });

  });

});