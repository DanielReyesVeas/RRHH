'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.titulo
 * @description
 * # titulo
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('titulo', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'titulos/:sid',
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