'use strict';

describe('Service: causalFiniquito', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var causalFiniquito;
  beforeEach(inject(function (_causalFiniquito_) {
    causalFiniquito = _causalFiniquito_;
  }));

  it('should do something', function () {
    expect(!!causalFiniquito).toBe(true);
  });

});
