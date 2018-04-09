'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.cargo
 * @description
 * # cargo
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('cargo', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'cargos/:sid',
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