'use strict';

describe('Controller: FactoresActualizacionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var FactoresActualizacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FactoresActualizacionCtrl = $controller('FactoresActualizacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FactoresActualizacionCtrl.awesomeThings.length).toBe(3);
  });
});
