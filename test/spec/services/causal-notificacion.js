'use strict';

describe('Service: causalNotificacion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var causalNotificacion;
  beforeEach(inject(function (_causalNotificacion_) {
    causalNotificacion = _causalNotificacion_;
  }));

  it('should do something', function () {
    expect(!!causalNotificacion).toBe(true);
  });

});
