'use strict';

describe('Controller: IngresoDescuentosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var IngresoDescuentosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IngresoDescuentosCtrl = $controller('IngresoDescuentosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IngresoDescuentosCtrl.awesomeThings.length).toBe(3);
  });
});
