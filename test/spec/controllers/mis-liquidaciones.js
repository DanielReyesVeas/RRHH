'use strict';

describe('Controller: MisLiquidacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var MisLiquidacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MisLiquidacionesCtrl = $controller('MisLiquidacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MisLiquidacionesCtrl.awesomeThings.length).toBe(3);
  });
});
