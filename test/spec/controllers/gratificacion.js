'use strict';

describe('Controller: GratificacionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var GratificacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GratificacionCtrl = $controller('GratificacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GratificacionCtrl.awesomeThings.length).toBe(3);
  });
});
