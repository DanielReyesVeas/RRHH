'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.horaExtra
 * @description
 * # horaExtra
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('horaExtra', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'horas-extra/:sid',
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