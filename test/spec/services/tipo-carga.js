'use strict';

describe('Service: tipoCarga', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tipoCarga;
  beforeEach(inject(function (_tipoCarga_) {
    tipoCarga = _tipoCarga_;
  }));

  it('should do something', function () {
    expect(!!tipoCarga).toBe(true);
  });

});
