'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.contrato
 * @description
 * # contrato
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tipoContrato', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tipos-contrato/:sid',
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
