'use strict';

describe('Service: clausulaContrato', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var clausulaContrato;
  beforeEach(inject(function (_clausulaContrato_) {
    clausulaContrato = _clausulaContrato_;
  }));

  it('should do something', function () {
    expect(!!clausulaContrato).toBe(true);
  });

});
