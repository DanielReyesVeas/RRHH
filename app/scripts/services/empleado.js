'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.empleado
 * @description
 * # empleado
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('empleado', function ($rootScope, $resource, constantes) {
    
    return {
      datos : function(){
        return $resource(constantes.URL + 'empleados/:sid',
          { sid : '@sid'},
          {
            create : {'method' : 'POST'},
            update : {'method' : 'PUT'},
            delete : {'method' : 'DELETE'}
          }
        );
      },
      perfil: function(){
        return $resource(constantes.URL + 'empleados/misdatos/cambiar', {},{
          post : { method : 'POST'}
        });
      },
      cambiarPermisos: function(){
        return $resource(constantes.URL + 'empleados/permisos/cambiar', {},{
          post : { method : 'POST'}
        });
      },
      cambiarPermisosMasivo: function(){
        return $resource(constantes.URL + 'empleados/permisos/cambiar-masivo', {},{
          post : { method : 'POST'}
        });
      },
      activarUsuario: function(){
        return $resource(constantes.URL + 'empleados/portal/activar', {},{
          post : { method : 'POST'}
        });
      },
      activarMasivo: function(){
        return $resource(constantes.URL + 'empleados/portal/activar-masivo', {},{
          post : { method : 'POST'}
        });
      },
      desactivarMasivo: function(){
        return $resource(constantes.URL + 'empleados/portal/desactivar-masivo', {},{
          post : { method : 'POST'}
        });
      },
      reactivarUsuario: function(){
        return $resource(constantes.URL + 'empleados/portal/reactivar', {},{
          post : { method : 'POST'}
        });
      },
      generarClave: function(){
        return $resource(constantes.URL + 'empleados/portal/generar-clave', {},{
          post : { method : 'POST'}
        });
      },
      generarClaveMasivo: function(){
        return $resource(constantes.URL + 'empleados/portal/generar-clave-masivo', {},{
          post : { method : 'POST'}
        });
      }
    }
  });
