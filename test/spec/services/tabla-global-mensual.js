'use strict';

describe('Service: tablaGlobalMensual', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tablaGlobalMensual;
  beforeEach(inject(function (_tablaGlobalMensual_) {
    tablaGlobalMensual = _tablaGlobalMensual_;
  }));

  it('should do something', function () {
    expect(!!tablaGlobalMensual).toBe(true);
  });

});
