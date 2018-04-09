'use strict';

describe('Service: valorIndicador', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var valorIndicador;
  beforeEach(inject(function (_valorIndicador_) {
    valorIndicador = _valorIndicador_;
  }));

  it('should do something', function () {
    expect(!!valorIndicador).toBe(true);
  });

});
