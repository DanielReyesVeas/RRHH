'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.causalNotificacion
 * @description
 * # causalNotificacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('causalNotificacion', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'causales-notificacion/:sid',
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
