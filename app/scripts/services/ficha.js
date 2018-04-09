'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.ficha
 * @description
 * # ficha
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('ficha', function ($resource, constantes) {
    return {
      datos: function () {
        return $resource(constantes.URL + 'fichas/:id',
          {id : '@id'},
          {
            update : { 'method': 'PUT' },
            delete : { 'method': 'DELETE' },
            create : { 'method': 'POST' }
          }
        );
      },
      unificar : function(){
        return $resource(constantes.URL + 'fichas/unificar/obtener',
          {},
          { post : { 'method': 'POST' } }
        );
      }
    }
  });