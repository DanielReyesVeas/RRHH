'use strict';

describe('Service: tipoDocumento', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tipoDocumento;
  beforeEach(inject(function (_tipoDocumento_) {
    tipoDocumento = _tipoDocumento_;
  }));

  it('should do something', function () {
    expect(!!tipoDocumento).toBe(true);
  });

});
