'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tablaCaja
 * @description
 * # tablaCaja
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tablaCaja', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tasas-cajas-ex-regimen/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            modificar : function(){
              return $resource(constantes.URL + 'tasas-cajas-ex-regimen/modificar/masivo',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });