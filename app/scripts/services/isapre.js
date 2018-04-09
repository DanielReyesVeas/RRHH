'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.isapre
 * @description
 * # isapre
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('isapre', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'isapres/:sid',
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
