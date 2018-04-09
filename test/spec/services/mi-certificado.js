'use strict';

describe('Service: miCertificado', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var miCertificado;
  beforeEach(inject(function (_miCertificado_) {
    miCertificado = _miCertificado_;
  }));

  it('should do something', function () {
    expect(!!miCertificado).toBe(true);
  });

});
