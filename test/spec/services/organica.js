'use strict';

describe('Service: organica', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var organica;
  beforeEach(inject(function (_organica_) {
    organica = _organica_;
  }));

  it('should do something', function () {
    expect(!!organica).toBe(true);
  });

});
