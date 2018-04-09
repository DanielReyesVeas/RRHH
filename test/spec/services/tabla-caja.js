'use strict';

describe('Service: tablaCaja', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tablaCaja;
  beforeEach(inject(function (_tablaCaja_) {
    tablaCaja = _tablaCaja_;
  }));

  it('should do something', function () {
    expect(!!tablaCaja).toBe(true);
  });

});
