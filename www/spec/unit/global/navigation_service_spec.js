describe("a navigation service", function () {

  var navigationService;

  beforeEach(function () {
    module("app");

    inject(function ($injector) {
      navigationService = $injector.get("navigationService");
    });
  });

  it("should open navigation", function () {

    navigationService.openNavigation();
    expect(navigationService.isNavigationOpen()).toEqual(true);

  });

  it("should close navigation", function () {

    navigationService.closeNavigation();
    expect(navigationService.isNavigationOpen()).toEqual(false);

  });

  it("should toggle navigation", function () {

    navigationService.toggleNavigation();
    expect(navigationService.isNavigationOpen()).toEqual(true);
    navigationService.toggleNavigation();
    expect(navigationService.isNavigationOpen()).toEqual(false);

  });

});