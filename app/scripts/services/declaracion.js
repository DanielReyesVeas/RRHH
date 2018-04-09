'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.declaracion
 * @description
 * # declaracion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('declaracion', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'declaraciones/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },           
            eliminarMasivo : function(){
                return $resource(constantes.URL + 'declaraciones/eliminar/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            }
        };
  });