'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.afp
 * @description
 * # afp
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('afp', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'afps/:sid',
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
