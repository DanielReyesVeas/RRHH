'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.descuento
 * @description
 * # descuento
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tipoDescuento', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tipos-descuento/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            ingresoDescuentos : function(){
              return $resource(constantes.URL + 'tipos-descuento/ingreso-descuentos/obtener');
            },
            cuenta : function(){
              return $resource(constantes.URL + 'tipos-descuento/cuentas/obtener/:sid');
            },
            centroCosto : function(){
              return $resource(constantes.URL + 'tipos-descuento/centro-costo/obtener/:sid');
            },
            updateCuenta : function(){
              return $resource(constantes.URL + 'tipos-descuento/cuentas/actualizar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            updateCuentaCentrosCosto : function(){
              return $resource(constantes.URL + 'tipos-descuento/cuentas-centros-costos/actualizar',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });