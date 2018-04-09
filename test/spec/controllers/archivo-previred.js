'use strict';

describe('Controller: ArchivoPreviredCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var ArchivoPreviredCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArchivoPreviredCtrl = $controller('ArchivoPreviredCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArchivoPreviredCtrl.awesomeThings.length).toBe(3);
  });
});
