'use strict';

describe('Service: liquidacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var liquidacion;
  beforeEach(inject(function (_liquidacion_) {
    liquidacion = _liquidacion_;
  }));

  it('should do something', function () {
    expect(!!liquidacion).toBe(true);
  });

});
