'use strict';

describe('Controller: DocumentosEmpresaEmpleadoCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var DocumentosEmpresaEmpleadoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocumentosEmpresaEmpleadoCtrl = $controller('DocumentosEmpresaEmpleadoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DocumentosEmpresaEmpleadoCtrl.awesomeThings.length).toBe(3);
  });
});
