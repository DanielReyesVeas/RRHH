'use strict';

describe('Controller: DescuentosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var DescuentosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DescuentosCtrl = $controller('DescuentosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DescuentosCtrl.awesomeThings.length).toBe(3);
  });
});
