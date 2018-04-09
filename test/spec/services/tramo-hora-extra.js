'use strict';

describe('Service: tramoHoraExtra', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tramoHoraExtra;
  beforeEach(inject(function (_tramoHoraExtra_) {
    tramoHoraExtra = _tramoHoraExtra_;
  }));

  it('should do something', function () {
    expect(!!tramoHoraExtra).toBe(true);
  });

});
