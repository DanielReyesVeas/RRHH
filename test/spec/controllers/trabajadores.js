'use strict';

describe('Controller: TrabajadoresCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var TrabajadoresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajadoresCtrl = $controller('TrabajadoresCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajadoresCtrl.awesomeThings.length).toBe(3);
  });
});
