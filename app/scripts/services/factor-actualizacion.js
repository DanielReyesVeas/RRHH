'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.factorActualizacion
 * @description
 * # factorActualizacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('factorActualizacion', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'factores-actualizacion/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            modificar : function(){
              return $resource(constantes.URL + 'factores-actualizacion/modificar/masivo',
                {},
                { post : { 'method': 'POST' } }
              );
            }
        };
  });