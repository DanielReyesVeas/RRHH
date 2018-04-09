'use strict';

describe('Service: inasistencia', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var inasistencia;
  beforeEach(inject(function (_inasistencia_) {
    inasistencia = _inasistencia_;
  }));

  it('should do something', function () {
    expect(!!inasistencia).toBe(true);
  });

});
