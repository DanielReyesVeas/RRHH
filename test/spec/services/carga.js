'use strict';

describe('Service: carga', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var carga;
  beforeEach(inject(function (_carga_) {
    carga = _carga_;
  }));

  it('should do something', function () {
    expect(!!carga).toBe(true);
  });

});
