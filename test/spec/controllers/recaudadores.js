'use strict';

describe('Controller: RecaudadoresCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var RecaudadoresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecaudadoresCtrl = $controller('RecaudadoresCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecaudadoresCtrl.awesomeThings.length).toBe(3);
  });
});
