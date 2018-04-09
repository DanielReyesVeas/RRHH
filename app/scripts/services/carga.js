'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.carga
 * @description
 * # carga
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('carga', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'cargas/:sid',
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