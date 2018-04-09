'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.documentoEmpresa
 * @description
 * # documentoEmpresa
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('documentoEmpresa', function(constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'documentos-empresa/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            importar : function(){
                return $resource(constantes.URL + 'documentos-empresa/archivo/importar',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            subir : function(){
                return $resource(constantes.URL + 'documentos-empresa/archivo/subir',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            publicos : function(){
                return $resource(constantes.URL + 'documentos-empresa/publicos/obtener');
            }
        };
  });
