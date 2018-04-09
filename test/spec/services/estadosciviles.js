'use strict';

describe('Service: estadosCiviles', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var estadosCiviles;
  beforeEach(inject(function (_estadosCiviles_) {
    estadosCiviles = _estadosCiviles_;
  }));

  it('should do something', function () {
    expect(!!estadosCiviles).toBe(true);
  });

});
