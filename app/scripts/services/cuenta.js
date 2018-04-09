'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.cuenta
 * @description
 * # cuenta
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('cuenta', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'cuentas/:sid',
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