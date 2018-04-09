'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tienda
 * @description
 * # tienda
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tienda', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tiendas/:sid',
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