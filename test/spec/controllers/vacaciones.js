'use strict';

describe('Controller: VacacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var VacacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VacacionesCtrl = $controller('VacacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VacacionesCtrl.awesomeThings.length).toBe(3);
  });
});
