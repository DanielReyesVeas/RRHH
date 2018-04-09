'use strict';

describe('Service: descuento', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var descuento;
  beforeEach(inject(function (_descuento_) {
    descuento = _descuento_;
  }));

  it('should do something', function () {
    expect(!!descuento).toBe(true);
  });

});
