'use strict';

describe('Service: plantillaCertificado', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var plantillaCertificado;
  beforeEach(inject(function (_plantillaCertificado_) {
    plantillaCertificado = _plantillaCertificado_;
  }));

  it('should do something', function () {
    expect(!!plantillaCertificado).toBe(true);
  });

});
