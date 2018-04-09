'use strict';

describe('Controller: TiendasCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TiendasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TiendasCtrl = $controller('TiendasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TiendasCtrl.awesomeThings.length).toBe(3);
  });
});
