'use strict';

describe('Service: glosa', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var glosa;
  beforeEach(inject(function (_glosa_) {
    glosa = _glosa_;
  }));

  it('should do something', function () {
    expect(!!glosa).toBe(true);
  });

});
