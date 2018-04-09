'use strict';

describe('Service: empleado', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var empleado;
  beforeEach(inject(function (_empleado_) {
    empleado = _empleado_;
  }));

  it('should do something', function () {
    expect(!!empleado).toBe(true);
  });

});
