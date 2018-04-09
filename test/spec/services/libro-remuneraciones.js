'use strict';

describe('Service: libroRemuneraciones', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var libroRemuneraciones;
  beforeEach(inject(function (_libroRemuneraciones_) {
    libroRemuneraciones = _libroRemuneraciones_;
  }));

  it('should do something', function () {
    expect(!!libroRemuneraciones).toBe(true);
  });

});
