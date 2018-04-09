'use strict';

describe('Service: documento', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var documento;
  beforeEach(inject(function (_documento_) {
    documento = _documento_;
  }));

  it('should do something', function () {
    expect(!!documento).toBe(true);
  });

});
