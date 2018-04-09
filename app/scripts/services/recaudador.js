'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.recaudador
 * @description
 * # recaudador
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('recaudador', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'recaudadores/:sid',
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