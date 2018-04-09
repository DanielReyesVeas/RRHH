'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.miCertificado
 * @description
 * # miCertificado
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('miCertificado', function (constantes, $resource) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'mis-certificados/:sid',
          {sid : '@sid'},
          {   
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      }
    }
  });
