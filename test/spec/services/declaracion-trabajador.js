'use strict';

describe('Service: declaracionTrabajador', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var declaracionTrabajador;
  beforeEach(inject(function (_declaracionTrabajador_) {
    declaracionTrabajador = _declaracionTrabajador_;
  }));

  it('should do something', function () {
    expect(!!declaracionTrabajador).toBe(true);
  });

});
