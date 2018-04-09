'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.cartaNotificacion
 * @description
 * # cartaNotificacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('cartaNotificacion', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'cartas-notificacion/:sid',
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

