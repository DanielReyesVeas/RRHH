'use strict';

describe('Controller: ReportesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var ReportesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesCtrl = $controller('ReportesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesCtrl.awesomeThings.length).toBe(3);
  });
});
