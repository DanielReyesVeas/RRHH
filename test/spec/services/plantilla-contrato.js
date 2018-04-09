'use strict';

describe('Service: plantillaContrato', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var plantillaContrato;
  beforeEach(inject(function (_plantillaContrato_) {
    plantillaContrato = _plantillaContrato_;
  }));

  it('should do something', function () {
    expect(!!plantillaContrato).toBe(true);
  });

});
