'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.plantillaCertificado
 * @description
 * # plantillaCertificado
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('plantillaCertificado', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'plantillas-certificados/:sid',
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