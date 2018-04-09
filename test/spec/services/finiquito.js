'use strict';

describe('Service: finiquito', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var finiquito;
  beforeEach(inject(function (_finiquito_) {
    finiquito = _finiquito_;
  }));

  it('should do something', function () {
    expect(!!finiquito).toBe(true);
  });

});
