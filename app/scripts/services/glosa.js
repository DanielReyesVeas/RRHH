'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.glosa
 * @description
 * # glosa
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('glosa', function(constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'glosas/:sid',
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
