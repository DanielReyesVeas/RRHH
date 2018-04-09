'use strict';

describe('Service: tablasEstructurantes', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var tablasEstructurantes;
  beforeEach(inject(function (_tablasEstructurantes_) {
    tablasEstructurantes = _tablasEstructurantes_;
  }));

  it('should do something', function () {
    expect(!!tablasEstructurantes).toBe(true);
  });

});
