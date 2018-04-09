'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.inasistencia
 * @description
 * # inasistencia
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('inasistencia', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'inasistencias/:sid',
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