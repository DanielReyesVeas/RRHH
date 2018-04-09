'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.plantillaFiniquito
 * @description
 * # plantillaFiniquito
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('plantillaFiniquito', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'plantillas-finiquitos/:sid',
          {sid : '@sid'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      lista : function(){
        return $resource(constantes.URL + 'plantillas-finiquitos/input/obtener');
      }
    };
  });
