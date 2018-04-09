'use strict';

describe('Service: tomaVacaciones', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tomaVacaciones;
  beforeEach(inject(function (_tomaVacaciones_) {
    tomaVacaciones = _tomaVacaciones_;
  }));

  it('should do something', function () {
    expect(!!tomaVacaciones).toBe(true);
  });

});
