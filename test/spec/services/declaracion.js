'use strict';

describe('Service: declaracion', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var declaracion;
  beforeEach(inject(function (_declaracion_) {
    declaracion = _declaracion_;
  }));

  it('should do something', function () {
    expect(!!declaracion).toBe(true);
  });

});
