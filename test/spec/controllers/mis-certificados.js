'use strict';

describe('Controller: MisCertificadosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var MisCertificadosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MisCertificadosCtrl = $controller('MisCertificadosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MisCertificadosCtrl.awesomeThings.length).toBe(3);
  });
});
