'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.nacionalidad
 * @description
 * # nacionalidad
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('nacionalidad', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'nacionalidades/:sid',
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
