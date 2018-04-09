'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.liquidacion
 * @description
 * # liquidacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('liquidacion', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'liquidaciones/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            libroRemuneraciones: function(){
                return $resource(constantes.URL + 'liquidaciones/libro-remuneraciones/obtener');
            },
            eliminarMasivo : function(){
                return $resource(constantes.URL + 'liquidaciones/eliminar/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            imprimirMasivo : function(){
                return $resource(constantes.URL + 'liquidaciones/imprimir/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            }
        };
  });