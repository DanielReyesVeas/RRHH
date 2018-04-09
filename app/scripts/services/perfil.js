'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.perfil
 * @description
 * # perfil
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('perfil', function ($rootScope, $resource, constantes) {
    
    return {
      datos : function(){
        return $resource(constantes.URL + 'perfiles/:id',
          { id : '@id'},
          {
            create : {'method' : 'POST'},
            update : {'method' : 'PUT'},
            delete : {'method' : 'DELETE'}
          }
        );
      },
      opciones : function(){
        return $resource(constantes.URL + 'perfiles/opciones-formulario/obtener');
      },
      menu : function(){
          return $resource(constantes.URL + 'menu/perfiles-usuario/obtener');
      },
      empresas : function(){
          return $resource(constantes.URL + 'empresas');
      }
    };
  });
