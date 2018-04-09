'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.certificado
 * @description
 * # certificado
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('certificado', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'certificados/:sid',
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

