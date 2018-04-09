'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.causalFiniquito
 * @description
 * # causalFiniquito
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('causalFiniquito', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'causales-finiquito/:sid',
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
