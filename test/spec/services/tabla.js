'use strict';

describe('Service: tabla', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tabla;
  beforeEach(inject(function (_tabla_) {
    tabla = _tabla_;
  }));

  it('should do something', function () {
    expect(!!tabla).toBe(true);
  });

});
