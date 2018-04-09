'use strict';

describe('Controller: AsociarDocumentosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var AsociarDocumentosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AsociarDocumentosCtrl = $controller('AsociarDocumentosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AsociarDocumentosCtrl.awesomeThings.length).toBe(3);
  });
});
