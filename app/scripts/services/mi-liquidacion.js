'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.miLiquidacion
 * @description
 * # miLiquidacion
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('miLiquidacion', function (constantes, $resource) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'mis-liquidaciones/:sid',
          {sid : '@sid'},
          {   
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      }
    }
  });
