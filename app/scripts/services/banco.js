'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.banco
 * @description
 * # banco
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('banco', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'bancos/:sid',
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