'use strict';

describe('Controller: OrganicaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var OrganicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganicaCtrl = $controller('OrganicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrganicaCtrl.awesomeThings.length).toBe(3);
  });
});
