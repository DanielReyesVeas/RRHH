'use strict';

describe('Service: miLiquidacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var miLiquidacion;
  beforeEach(inject(function (_miLiquidacion_) {
    miLiquidacion = _miLiquidacion_;
  }));

  it('should do something', function () {
    expect(!!miLiquidacion).toBe(true);
  });

});
