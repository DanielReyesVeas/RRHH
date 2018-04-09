'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tipoDocumento
 * @description
 * # tipoDocumento
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tipoDocumento', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'tipos-documento/:sid',
          {sid : '@sid'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      }
    };
  });
