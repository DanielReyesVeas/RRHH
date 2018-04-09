'use strict';

describe('Controller: MisCartasNotificacionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var MisCartasNotificacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MisCartasNotificacionCtrl = $controller('MisCartasNotificacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MisCartasNotificacionCtrl.awesomeThings.length).toBe(3);
  });
});
