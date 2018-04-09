'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.clausulaFiniquito
 * @description
 * # clausulaFiniquito
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('clausulaFiniquito', function (constantes, $resource) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'clausulas-finiquito/:sid',
          {sid : '@sid'},
          {   
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      plantilla : function(){
        return $resource(constantes.URL + 'clausulas-finiquito/plantilla-finiquito/obtener/:sid');
      }
    };
  });
