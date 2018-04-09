'use strict';

describe('Controller: CentralizacionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CentralizacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CentralizacionCtrl = $controller('CentralizacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CentralizacionCtrl.awesomeThings.length).toBe(3);
  });
});
