'use strict';

describe('Service: licencia', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var licencia;
  beforeEach(inject(function (_licencia_) {
    licencia = _licencia_;
  }));

  it('should do something', function () {
    expect(!!licencia).toBe(true);
  });

});
