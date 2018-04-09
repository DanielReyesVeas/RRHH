'use strict';

describe('Controller: IngresoHorasExtraCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var IngresoHorasExtraCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IngresoHorasExtraCtrl = $controller('IngresoHorasExtraCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IngresoHorasExtraCtrl.awesomeThings.length).toBe(3);
  });
});
