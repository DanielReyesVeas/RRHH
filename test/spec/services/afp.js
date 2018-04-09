'use strict';

describe('Service: afp', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var afp;
  beforeEach(inject(function (_afp_) {
    afp = _afp_;
  }));

  it('should do something', function () {
    expect(!!afp).toBe(true);
  });

});
