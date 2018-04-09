'use strict';

describe('Controller: CierreMesualCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CierreMesualCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CierreMesualCtrl = $controller('CierreMesualCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CierreMesualCtrl.awesomeThings.length).toBe(3);
  });
});
