'use strict';

describe('Controller: DocumentosEmpresaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var DocumentosEmpresaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DocumentosEmpresaCtrl = $controller('DocumentosEmpresaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DocumentosEmpresaCtrl.awesomeThings.length).toBe(3);
  });
});
