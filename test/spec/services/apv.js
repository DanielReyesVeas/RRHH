'use strict';

describe('Service: apv', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var apv;
  beforeEach(inject(function (_apv_) {
    apv = _apv_;
  }));

  it('should do something', function () {
    expect(!!apv).toBe(true);
  });

});
