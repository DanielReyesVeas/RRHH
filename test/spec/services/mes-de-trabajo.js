'use strict';

describe('Service: mesDeTrabajo', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var mesDeTrabajo;
  beforeEach(inject(function (_mesDeTrabajo_) {
    mesDeTrabajo = _mesDeTrabajo_;
  }));

  it('should do something', function () {
    expect(!!mesDeTrabajo).toBe(true);
  });

});
