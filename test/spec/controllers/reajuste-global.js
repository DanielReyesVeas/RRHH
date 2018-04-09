'use strict';

describe('Controller: ReajusteGlobalCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var ReajusteGlobalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReajusteGlobalCtrl = $controller('ReajusteGlobalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReajusteGlobalCtrl.awesomeThings.length).toBe(3);
  });
});
