'use strict';

describe('Service: cartaNotificacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var cartaNotificacion;
  beforeEach(inject(function (_cartaNotificacion_) {
    cartaNotificacion = _cartaNotificacion_;
  }));

  it('should do something', function () {
    expect(!!cartaNotificacion).toBe(true);
  });

});
