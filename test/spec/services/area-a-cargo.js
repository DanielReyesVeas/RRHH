'use strict';

describe('Service: areaACargo', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var areaACargo;
  beforeEach(inject(function (_areaACargo_) {
    areaACargo = _areaACargo_;
  }));

  it('should do something', function () {
    expect(!!areaACargo).toBe(true);
  });

});
