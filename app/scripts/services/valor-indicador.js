'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.valorIndicador
 * @description
 * # valorIndicador
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('valorIndicador', function (constantes, $resource) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'valores-indicadores/:sid',
          {sid : '@sid'},
          {   
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      indicadores : function(){
        return $resource(constantes.URL + 'valores-indicadores/indicadores/obtener/:fecha');
      },
      masivo : function(){
        return $resource(constantes.URL + 'valor-indicador/ingreso/masivo',
          {},
          { post : { 'method': 'POST' } }
        );
      },
      modificar : function(){
        return $resource(constantes.URL + 'valor-indicador/modificar/masivo',
          {},
          { post : { 'method': 'POST' } }
        );
      }
    };
  });




