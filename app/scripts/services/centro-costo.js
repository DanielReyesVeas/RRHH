'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.centroCosto
 * @description
 * # centroCosto
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('centroCosto', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'centros-costo/:sid',
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