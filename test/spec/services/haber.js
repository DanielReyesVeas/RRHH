'use strict';

describe('Service: haber', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var haber;
  beforeEach(inject(function (_haber_) {
    haber = _haber_;
  }));

  it('should do something', function () {
    expect(!!haber).toBe(true);
  });

});
