'use strict';

describe('Controller: ApvsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var ApvsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApvsCtrl = $controller('ApvsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ApvsCtrl.awesomeThings.length).toBe(3);
  });
});
