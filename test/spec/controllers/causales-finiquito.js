'use strict';

describe('Controller: CausalesFiniquitoCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CausalesFiniquitoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CausalesFiniquitoCtrl = $controller('CausalesFiniquitoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CausalesFiniquitoCtrl.awesomeThings.length).toBe(3);
  });
});
