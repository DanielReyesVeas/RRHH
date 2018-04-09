'use strict';

describe('Service: documentoEmpresa', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var documentoEmpresa;
  beforeEach(inject(function (_documentoEmpresa_) {
    documentoEmpresa = _documentoEmpresa_;
  }));

  it('should do something', function () {
    expect(!!documentoEmpresa).toBe(true);
  });

});
