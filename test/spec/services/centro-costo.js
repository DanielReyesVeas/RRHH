'use strict';

describe('Service: centroCosto', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var centroCosto;
  beforeEach(inject(function (_centroCosto_) {
    centroCosto = _centroCosto_;
  }));

  it('should do something', function () {
    expect(!!centroCosto).toBe(true);
  });

});
