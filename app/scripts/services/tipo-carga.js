'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tipoCarga
 * @description
 * # tipoCarga
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tipoCarga', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tipos-carga/:sid',
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

