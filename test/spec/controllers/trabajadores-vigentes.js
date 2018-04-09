'use strict';

describe('Controller: TrabajadoresVigentesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TrabajadoresVigentesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajadoresVigentesCtrl = $controller('TrabajadoresVigentesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajadoresVigentesCtrl.awesomeThings.length).toBe(3);
  });
});
