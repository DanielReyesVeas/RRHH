'use strict';

describe('Controller: TiposDeJornadasCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TiposDeJornadasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TiposDeJornadasCtrl = $controller('TiposDeJornadasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TiposDeJornadasCtrl.awesomeThings.length).toBe(3);
  });
});
