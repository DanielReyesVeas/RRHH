'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.reporte
 * @description
 * # reporte
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('reporte', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'reportes/:sid',
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