'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.documento
 * @description
 * # documento
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('documento', function(constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'documentos/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            importar : function(){
                return $resource(constantes.URL + 'documentos/archivo/importar',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            eliminarDocumento : function(){
                return $resource(constantes.URL + 'documentos/archivo/eliminar',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            subir : function(){
                return $resource(constantes.URL + 'documentos/archivo/subir',
                    {},
                    { post : { 'method': 'POST' } }
                );
            }
        };
  });
