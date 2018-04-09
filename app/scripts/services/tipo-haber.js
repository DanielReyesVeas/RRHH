'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.haber
 * @description
 * # haber
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tipoHaber', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tipos-haber/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            ingresoHaberes : function(){
              return $resource(constantes.URL + 'tipos-haber/ingreso-haberes/obtener');
            },
            cuenta : function(){
              return $resource(constantes.URL + 'tipos-haber/cuentas/obtener/:sid');
            },
            centroCosto : function(){
              return $resource(constantes.URL + 'tipos-haber/centro-costo/obtener/:sid');
            },
            updateCuenta : function(){
              return $resource(constantes.URL + 'tipos-haber/cuentas/actualizar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            updateCuentaCentrosCosto : function(){
              return $resource(constantes.URL + 'tipos-haber/cuentas-centros-costos/actualizar',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });