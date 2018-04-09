'use strict';

describe('Controller: PlanillaCostoEmpresaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var PlanillaCostoEmpresaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanillaCostoEmpresaCtrl = $controller('PlanillaCostoEmpresaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlanillaCostoEmpresaCtrl.awesomeThings.length).toBe(3);
  });
});
