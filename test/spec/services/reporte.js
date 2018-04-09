'use strict';

describe('Service: reporte', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var reporte;
  beforeEach(inject(function (_reporte_) {
    reporte = _reporte_;
  }));

  it('should do something', function () {
    expect(!!reporte).toBe(true);
  });

});
