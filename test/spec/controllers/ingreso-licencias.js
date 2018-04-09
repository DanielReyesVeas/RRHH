'use strict';

describe('Controller: IngresoLicenciasCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var IngresoLicenciasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IngresoLicenciasCtrl = $controller('IngresoLicenciasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IngresoLicenciasCtrl.awesomeThings.length).toBe(3);
  });
});
