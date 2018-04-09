'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.cuenta
 * @description
 * # cuenta
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('tipoCuenta', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'tipos-cuenta/:sid',
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