'use strict';

describe('Controller: CartasDeNotificacionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CartasDeNotificacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartasDeNotificacionCtrl = $controller('CartasDeNotificacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CartasDeNotificacionCtrl.awesomeThings.length).toBe(3);
  });
});
