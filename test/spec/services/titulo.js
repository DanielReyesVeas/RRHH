'use strict';

describe('Service: titulo', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var titulo;
  beforeEach(inject(function (_titulo_) {
    titulo = _titulo_;
  }));

  it('should do something', function () {
    expect(!!titulo).toBe(true);
  });

});
