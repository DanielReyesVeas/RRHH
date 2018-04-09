'use strict';

describe('Service: codigo', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var codigo;
  beforeEach(inject(function (_codigo_) {
    codigo = _codigo_;
  }));

  it('should do something', function () {
    expect(!!codigo).toBe(true);
  });

});
