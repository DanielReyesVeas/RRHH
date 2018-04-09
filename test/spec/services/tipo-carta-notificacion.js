'use strict';

describe('Service: tipoCartaNotificacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tipoCartaNotificacion;
  beforeEach(inject(function (_tipoCartaNotificacion_) {
    tipoCartaNotificacion = _tipoCartaNotificacion_;
  }));

  it('should do something', function () {
    expect(!!tipoCartaNotificacion).toBe(true);
  });

});
