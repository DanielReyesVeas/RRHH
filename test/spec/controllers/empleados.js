'use strict';

describe('Controller: EmpleadosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var EmpleadosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmpleadosCtrl = $controller('EmpleadosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EmpleadosCtrl.awesomeThings.length).toBe(3);
  });
});
