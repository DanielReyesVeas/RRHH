'use strict';

describe('Controller: TitulosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TitulosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TitulosCtrl = $controller('TitulosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TitulosCtrl.awesomeThings.length).toBe(3);
  });
});
