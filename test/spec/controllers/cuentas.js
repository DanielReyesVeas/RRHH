'use strict';

describe('Controller: CuentasCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CuentasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CuentasCtrl = $controller('CuentasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CuentasCtrl.awesomeThings.length).toBe(3);
  });
});
