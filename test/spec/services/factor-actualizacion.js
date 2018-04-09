'use strict';

describe('Service: factorActualizacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var factorActualizacion;
  beforeEach(inject(function (_factorActualizacion_) {
    factorActualizacion = _factorActualizacion_;
  }));

  it('should do something', function () {
    expect(!!factorActualizacion).toBe(true);
  });

});
