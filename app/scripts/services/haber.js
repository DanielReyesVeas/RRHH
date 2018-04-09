'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.haber
 * @description
 * # haber
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('haber', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'haberes/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }   
                    }
                );
            },
            masivo : function(){
                return $resource(constantes.URL + 'haberes/ingreso/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            eliminarPermanente : function(){
              return $resource(constantes.URL + 'haberes/permanentes/eliminar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            importar : function(){
                return $resource(constantes.URL + 'haberes/generar-ingreso/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            importarMasivo : function(){
                return $resource(constantes.URL + 'haberes/generar-ingreso-masivo/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            }
        };
  });
