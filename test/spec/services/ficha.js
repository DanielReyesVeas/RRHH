'use strict';

describe('Service: ficha', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var ficha;
  beforeEach(inject(function (_ficha_) {
    ficha = _ficha_;
  }));

  it('should do something', function () {
    expect(!!ficha).toBe(true);
  });

});
