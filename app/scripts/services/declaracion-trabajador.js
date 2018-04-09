'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.declaracionTrabajador
 * @description
 * # declaracionTrabajador
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('declaracionTrabajador', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'declaraciones-trabajadores/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },           
            eliminarMasivo : function(){
                return $resource(constantes.URL + 'declaraciones-trabajadores/eliminar/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            }
        };
  });