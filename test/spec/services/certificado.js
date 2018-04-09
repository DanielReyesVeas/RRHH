'use strict';

describe('Service: certificado', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var certificado;
  beforeEach(inject(function (_certificado_) {
    certificado = _certificado_;
  }));

  it('should do something', function () {
    expect(!!certificado).toBe(true);
  });

});
