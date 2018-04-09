'use strict';

describe('Service: anio', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var anio;
  beforeEach(inject(function (_anio_) {
    anio = _anio_;
  }));

  it('should do something', function () {
    expect(!!anio).toBe(true);
  });

});
