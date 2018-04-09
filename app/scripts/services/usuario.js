'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.usuario
 * @description
 * # usuario
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
    .factory('usuario', function ($rootScope, $resource, constantes) {
    
    return {
      datos : function(){
        return $resource(constantes.URL + 'usuarios/:id',
          { id : '@id'},
          {
            create : {'method' : 'POST'},
            update : {'method' : 'PUT'},
            delete : {'method' : 'DELETE'}
          }
        );
      },
      opciones : function(){
        return $resource(constantes.URL + 'usuarios/opciones-formulario/obtener');
      }
    };
  });
