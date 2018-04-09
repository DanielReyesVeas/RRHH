'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.finiquito
 * @description
 * # finiquito
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('finiquito', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'finiquitos/:sid',
          {sid : '@sid'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      calcular : function(){
        return $resource(constantes.URL + 'finiquitos/calculo/obtener',
          {},
          { post : { 'method': 'POST' } }
        );
      }
    };
  });
