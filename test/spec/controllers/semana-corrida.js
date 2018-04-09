'use strict';

describe('Controller: SemanaCorridaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var SemanaCorridaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SemanaCorridaCtrl = $controller('SemanaCorridaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SemanaCorridaCtrl.awesomeThings.length).toBe(3);
  });
});
