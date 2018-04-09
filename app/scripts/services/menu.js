'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.menu
 * @description
 * # menu
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
    .factory('menu', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'menu/:id',
                    {id : '@id'},
                    {
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            opciones : function(){
                return $resource(constantes.URL + 'menu/opciones-formulario/obtener');
            }
        };
  });
