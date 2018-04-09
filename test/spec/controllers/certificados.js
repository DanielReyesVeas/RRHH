'use strict';

describe('Controller: CertificadosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CertificadosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CertificadosCtrl = $controller('CertificadosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CertificadosCtrl.awesomeThings.length).toBe(3);
  });
});
