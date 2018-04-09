'use strict';

describe('Service: clausulaFiniquito', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var clausulaFiniquito;
  beforeEach(inject(function (_clausulaFiniquito_) {
    clausulaFiniquito = _clausulaFiniquito_;
  }));

  it('should do something', function () {
    expect(!!clausulaFiniquito).toBe(true);
  });

});
