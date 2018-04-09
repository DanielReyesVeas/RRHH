'use strict';

describe('Directive: pass', function () {

  // load the directive's module
  beforeEach(module('angularjsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pass></pass>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pass directive');
  }));
});
