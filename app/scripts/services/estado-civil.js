'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.estadosCiviles
 * @description
 * # estadosCiviles
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('estadoCivil', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'estados-civiles/:sid',
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

