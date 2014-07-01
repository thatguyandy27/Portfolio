'use strict';

describe('Controller: CsssolarsystemCtrl', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var CsssolarsystemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsssolarsystemCtrl = $controller('CsssolarsystemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
