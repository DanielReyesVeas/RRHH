'use strict';

describe('Service: banco', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var banco;
  beforeEach(inject(function (_banco_) {
    banco = _banco_;
  }));

  it('should do something', function () {
    expect(!!banco).toBe(true);
  });

});
