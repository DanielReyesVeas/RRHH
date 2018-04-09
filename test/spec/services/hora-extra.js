'use strict';

describe('Service: horaExtra', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var horaExtra;
  beforeEach(inject(function (_horaExtra_) {
    horaExtra = _horaExtra_;
  }));

  it('should do something', function () {
    expect(!!horaExtra).toBe(true);
  });

});
