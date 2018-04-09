'use strict';

describe('Service: trabajador', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var trabajador;
  beforeEach(inject(function (_trabajador_) {
    trabajador = _trabajador_;
  }));

  it('should do something', function () {
    expect(!!trabajador).toBe(true);
  });

});
