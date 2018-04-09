'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.clausulaContrato
 * @description
 * # clausulaContrato
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('clausulaContrato', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'clausulas-contrato/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            plantilla : function(){
              return $resource(constantes.URL + 'clausulas-contrato/plantilla-contrato/obtener/:sid');
            }
        };
  });
