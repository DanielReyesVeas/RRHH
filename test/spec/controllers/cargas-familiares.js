'use strict';

describe('Controller: CargasFamiliaresCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CargasFamiliaresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CargasFamiliaresCtrl = $controller('CargasFamiliaresCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CargasFamiliaresCtrl.awesomeThings.length).toBe(3);
  });
});
