'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.organica
 * @description
 * # organica
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('organica', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'secciones/:sid',
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
