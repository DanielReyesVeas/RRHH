'use strict';

describe('Service: isapre', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var isapre;
  beforeEach(inject(function (_isapre_) {
    isapre = _isapre_;
  }));

  it('should do something', function () {
    expect(!!isapre).toBe(true);
  });

});
