'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.licencia
 * @description
 * # licencia
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('licencia', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'licencias/:sid',
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