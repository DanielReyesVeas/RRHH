'use strict';

describe('Service: nominaBancaria', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var nominaBancaria;
  beforeEach(inject(function (_nominaBancaria_) {
    nominaBancaria = _nominaBancaria_;
  }));

  it('should do something', function () {
    expect(!!nominaBancaria).toBe(true);
  });

});
