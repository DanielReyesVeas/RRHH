'use strict';

describe('Controller: TablaGlobalMensualCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TablaGlobalMensualCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TablaGlobalMensualCtrl = $controller('TablaGlobalMensualCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TablaGlobalMensualCtrl.awesomeThings.length).toBe(3);
  });
});
