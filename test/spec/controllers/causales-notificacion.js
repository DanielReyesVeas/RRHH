'use strict';

describe('Controller: CausalesNotificacionCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var CausalesNotificacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CausalesNotificacionCtrl = $controller('CausalesNotificacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CausalesNotificacionCtrl.awesomeThings.length).toBe(3);
  });
});
