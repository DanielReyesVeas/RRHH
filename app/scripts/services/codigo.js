'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.codigo
 * @description
 * # codigo
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('codigo', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'codigos/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            masivo : function(){
                return $resource(constantes.URL + 'codigos/ingreso/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            updateMasivo : function(){
                return $resource(constantes.URL + 'codigos/update/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            }
        };
  });
