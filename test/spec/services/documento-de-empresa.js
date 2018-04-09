'use strict';

describe('Service: documentoDeEmpresa', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var documentoDeEmpresa;
  beforeEach(inject(function (_documentoDeEmpresa_) {
    documentoDeEmpresa = _documentoDeEmpresa_;
  }));

  it('should do something', function () {
    expect(!!documentoDeEmpresa).toBe(true);
  });

});
