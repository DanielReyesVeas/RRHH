'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.vacaciones
 * @description
 * # vacaciones
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('vacaciones', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'vacaciones/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            recalcular : function(){
              return $resource(constantes.URL + 'vacaciones/recalculo/obtener',
                {},
                { post : { 'method': 'POST' } }
              );
            },
            eliminarTomaVacaciones : function(){
              return $resource(constantes.URL + 'vacaciones/toma-vacaciones/eliminar',
                {},
                { post : { 'method': 'POST' } }
              );
            },
            tomaVacaciones : function(){
              return $resource(constantes.URL + 'vacaciones/toma-vacaciones/obtener',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });
