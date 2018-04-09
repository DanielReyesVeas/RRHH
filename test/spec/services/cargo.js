'use strict';

describe('Service: cargo', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var cargo;
  beforeEach(inject(function (_cargo_) {
    cargo = _cargo_;
  }));

  it('should do something', function () {
    expect(!!cargo).toBe(true);
  });

});
