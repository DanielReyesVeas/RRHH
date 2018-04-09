'use strict';

describe('Controller: TablaCajasCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TablaCajasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TablaCajasCtrl = $controller('TablaCajasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TablaCajasCtrl.awesomeThings.length).toBe(3);
  });
});
