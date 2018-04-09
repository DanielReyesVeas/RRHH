'use strict';

describe('Controller: F1887Ctrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var F1887Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    F1887Ctrl = $controller('F1887Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(F1887Ctrl.awesomeThings.length).toBe(3);
  });
});
