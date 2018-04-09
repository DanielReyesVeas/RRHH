'use strict';

describe('Controller: NominaBancariaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var NominaBancariaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NominaBancariaCtrl = $controller('NominaBancariaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NominaBancariaCtrl.awesomeThings.length).toBe(3);
  });
});
