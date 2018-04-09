'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.comuna
 * @description
 * # comuna
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('comuna', function ($resource, $http, constantes) {
        return {
            buscar : function( val ){
                return $http.get( constantes.URL + 'comunas/buscador/json', {
                    params: {
                        termino: val
                    }
                }).then(function(response){
                    return response.data.map(function(item){
                        return item;
                    });
                });
            }
        };
    });
