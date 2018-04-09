'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.mesDeTrabajo
 * @description
 * # mesDeTrabajo
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('mesDeTrabajo', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'mes-de-trabajo/:sid',
          {sid : '@sid'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      preCentralizar : function(){
        return $resource(constantes.URL + 'mes-de-trabajo/pre-centralizar/obtener',
            {},
            { post : { 'method': 'POST' } }
        );
      },
      centralizar : function(){
        return $resource(constantes.URL + 'mes-de-trabajo/centralizar/obtener',
            {},
            { post : { 'method': 'POST' } }
        );
      },
      detalleCentralizacion : function(){
        return $resource(constantes.URL + 'mes-de-trabajo/detalle-centralizacion/obtener/:mes');
      }
    };
  });
