'use strict';

describe('Service: cuenta', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var cuenta;
  beforeEach(inject(function (_cuenta_) {
    cuenta = _cuenta_;
  }));

  it('should do something', function () {
    expect(!!cuenta).toBe(true);
  });

});
