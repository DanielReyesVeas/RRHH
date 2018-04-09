'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.tramoHoraExtra
 * @description
 * # tramoHoraExtra
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tramoHoraExtra', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tramos-horas-extra/:sid',
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