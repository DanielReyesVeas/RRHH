'use strict';

describe('Service: contrato', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var contrato;
  beforeEach(inject(function (_contrato_) {
    contrato = _contrato_;
  }));

  it('should do something', function () {
    expect(!!contrato).toBe(true);
  });

});
