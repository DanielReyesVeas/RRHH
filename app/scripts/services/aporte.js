'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.aporte
 * @description
 * # aporte
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('aporte', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'aportes/:sid',
          {sid : '@sid'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      centroCosto : function(){
        return $resource(constantes.URL + 'aportes/centro-costo/obtener/:sid');
      },
      updateCuenta : function(){
        return $resource(constantes.URL + 'aportes/cuentas/actualizar',
          {},
          { post : { 'method': 'POST' } }
        );
      },
      updateCuentaCentrosCosto : function(){
        return $resource(constantes.URL + 'aportes/cuentas-centros-costos/actualizar',
          {},
          { post : { 'method': 'POST' } }
        );
      }
    };
  });
