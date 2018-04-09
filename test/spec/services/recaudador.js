'use strict';

describe('Service: recaudador', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var recaudador;
  beforeEach(inject(function (_recaudador_) {
    recaudador = _recaudador_;
  }));

  it('should do something', function () {
    expect(!!recaudador).toBe(true);
  });

});
