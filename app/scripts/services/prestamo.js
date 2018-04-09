'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.prestamo
 * @description
 * # prestamo
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('prestamo', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'prestamos/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            }
        };
  });