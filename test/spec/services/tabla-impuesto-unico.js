'use strict';

describe('Service: tablaImpuestoUnico', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tablaImpuestoUnico;
  beforeEach(inject(function (_tablaImpuestoUnico_) {
    tablaImpuestoUnico = _tablaImpuestoUnico_;
  }));

  it('should do something', function () {
    expect(!!tablaImpuestoUnico).toBe(true);
  });

});
