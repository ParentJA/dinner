describe("Karma Test", function () {

  beforeEach(function () {
    module("app");
  });

  it("return true", function () {
    expect(true).toBe(true);
  });
});

describe("Pantry data is stored in a model.", function () {

  var pantriesModel;

  beforeEach(function () {
    module("app");

    inject(function ($injector) {
      pantriesModel = $injector.get('pantriesModel');
    });
  });

  it("has an interface defined", function () {
    expect(pantriesModel.getPantries).toBeDefined();
    expect(pantriesModel.update).toBeDefined();
  });

  //it("returns pantry data", function () {});

  it("can be updated with valid data", function () {
    var data = {
      pantries: [{
        id: 1,
        name: "Home",
        foods: [{
          id: 1,
          name: "tomatoes",
          categories: [{
            id: 1,
            description: "vegetable"
          }]
        }]
      }]
    };

    pantriesModel.update(data);

    var pantries = pantriesModel.getPantries();

    expect(pantries.length).toEqual(1);

    var pantry = _.first(pantries);

    expect(pantry.id).toEqual(1);
    expect(pantry.name).toEqual("Home");
    expect(pantry.foods).toBeDefined();
    expect(pantry._foods).toBeDefined();
  });

});