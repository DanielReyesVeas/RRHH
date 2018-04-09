'use strict';

describe('Controller: SolicitudesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var SolicitudesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SolicitudesCtrl = $controller('SolicitudesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SolicitudesCtrl.awesomeThings.length).toBe(3);
  });
});
