'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tipoCartaNotificacion
 * @description
 * # tipoCartaNotificacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('plantillaCartaNotificacion', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'plantillas-cartas-notificacion/:sid',
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

