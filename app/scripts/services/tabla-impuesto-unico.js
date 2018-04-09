'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tablaImpuestoUnico
 * @description
 * # tablaImpuestoUnico
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tablaImpuestoUnico', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tabla-impuesto-unico/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            modificar : function(){
              return $resource(constantes.URL + 'tabla-impuesto-unico/modificar/masivo',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });