describe("core routes", function () {

  var scope;
  var state;

  beforeEach(function () {
    module("app");

    inject(function ($rootScope, $state) {
      scope = $rootScope.$new();
      state = $state;
    });
  });

  it("should default to the home state", function () {

    scope.$apply();

    expect(state.current.name).toEqual("home");

  });

});