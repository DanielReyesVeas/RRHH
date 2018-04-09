'use strict';

describe('Controller: TablasCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TablasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TablasCtrl = $controller('TablasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TablasCtrl.awesomeThings.length).toBe(3);
  });
});
