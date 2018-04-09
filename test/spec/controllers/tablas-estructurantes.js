'use strict';

describe('Controller: TablasEstructurantesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TablasEstructurantesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TablasEstructurantesCtrl = $controller('TablasEstructurantesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TablasEstructurantesCtrl.awesomeThings.length).toBe(3);
  });
});
