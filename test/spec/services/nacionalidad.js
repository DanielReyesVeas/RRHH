'use strict';

describe('Service: nacionalidad', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var nacionalidad;
  beforeEach(inject(function (_nacionalidad_) {
    nacionalidad = _nacionalidad_;
  }));

  it('should do something', function () {
    expect(!!nacionalidad).toBe(true);
  });

});
