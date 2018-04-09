'use strict';

describe('Controller: LibroRemuneracionesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var LibroRemuneracionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LibroRemuneracionesCtrl = $controller('LibroRemuneracionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LibroRemuneracionesCtrl.awesomeThings.length).toBe(3);
  });
});
