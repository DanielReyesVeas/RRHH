'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tabla
 * @description
 * # tabla
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tabla', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tablas/:id',
                    {id : '@id'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            }
        };
  });