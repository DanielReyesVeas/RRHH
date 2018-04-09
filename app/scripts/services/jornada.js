'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.menu
 * @description
 * # jornada
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
    .factory('jornada', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'jornadas/:sid',
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
