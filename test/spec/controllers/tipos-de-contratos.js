'use strict';

describe('Controller: TiposDeContratosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TiposDeContratosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TiposDeContratosCtrl = $controller('TiposDeContratosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TiposDeContratosCtrl.awesomeThings.length).toBe(3);
  });
});
