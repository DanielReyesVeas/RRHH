'use strict';

describe('Service: miCartaNotificacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var miCartaNotificacion;
  beforeEach(inject(function (_miCartaNotificacion_) {
    miCartaNotificacion = _miCartaNotificacion_;
  }));

  it('should do something', function () {
    expect(!!miCartaNotificacion).toBe(true);
  });

});
