'use strict';

describe('Service: comuna', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var comuna;
  beforeEach(inject(function (_comuna_) {
    comuna = _comuna_;
  }));

  it('should do something', function () {
    expect(!!comuna).toBe(true);
  });

});
