'use strict';

describe('Controller: TiposCargaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TiposCargaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TiposCargaCtrl = $controller('TiposCargaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TiposCargaCtrl.awesomeThings.length).toBe(3);
  });
});
