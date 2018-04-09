'use strict';

describe('Controller: HaberesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var HaberesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HaberesCtrl = $controller('HaberesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HaberesCtrl.awesomeThings.length).toBe(3);
  });
});
