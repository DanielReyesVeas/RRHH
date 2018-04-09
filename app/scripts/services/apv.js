'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.apv
 * @description
 * # apv
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('apv', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'apvs/:sid',
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
