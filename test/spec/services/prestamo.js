'use strict';

describe('Service: prestamo', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var prestamo;
  beforeEach(inject(function (_prestamo_) {
    prestamo = _prestamo_;
  }));

  it('should do something', function () {
    expect(!!prestamo).toBe(true);
  });

});
