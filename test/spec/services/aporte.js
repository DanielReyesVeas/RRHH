'use strict';

describe('Service: aporte', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var aporte;
  beforeEach(inject(function (_aporte_) {
    aporte = _aporte_;
  }));

  it('should do something', function () {
    expect(!!aporte).toBe(true);
  });

});
