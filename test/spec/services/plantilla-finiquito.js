'use strict';

describe('Service: plantillaFiniquito', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var plantillaFiniquito;
  beforeEach(inject(function (_plantillaFiniquito_) {
    plantillaFiniquito = _plantillaFiniquito_;
  }));

  it('should do something', function () {
    expect(!!plantillaFiniquito).toBe(true);
  });

});
