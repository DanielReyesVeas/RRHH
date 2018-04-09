'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tablaGlobalMensual
 * @description
 * # tablaGlobalMensual
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tablaGlobalMensual', function (constantes, $resource) {
        return {
            tablas : function(){
              return $resource(constantes.URL + 'tabla-global-mensual/tablas/obtener');
            },
            modificar : function(){
              return $resource(constantes.URL + 'tabla-global-mensual/modificar/masivo',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });