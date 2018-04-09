'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.miCartaNotificacion
 * @description
 * # miCartaNotificacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('miCartaNotificacion', function (constantes, $resource) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'mis-cartas-notificacion/:sid',
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
