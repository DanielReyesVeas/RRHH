'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.plantillaContrato
 * @description
 * # plantillaContrato
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('plantillaContrato', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'plantillas-contratos/:sid',
          {sid : '@sid'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      lista : function(){
        return $resource(constantes.URL + 'plantillas-contratos/input/obtener');
      }
    };
  });
