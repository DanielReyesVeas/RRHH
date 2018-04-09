'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.contrato
 * @description
 * # contrato
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('contrato', function(constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'contratos/:sid',
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
