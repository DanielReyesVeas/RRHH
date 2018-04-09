'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.funcionario
 * @description
 * # funcionario
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
    .factory('funcionario', function ($resource, $http, constantes) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'usuarios/:id',
                    {id : '@id'},
                    {
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            opciones : function(){
                return $resource(constantes.URL + 'usuarios/opciones/formulario');
            },
            perfil: function(){
                return $resource(constantes.URL + 'misdatos', {},{
                    post : { method : 'POST'}
                });
            },            
            buscarRut : function(rut){
                return $resource(constantes.URL + 'usuarios/buscar-rut/' + rut);
            },
            typeahead : function( val ){
                return $http.get( constantes.URL + 'usuarios/buscador/json', {
                    params: {
                        termino: val
                    }
                }).then(function(response){
                    return response.data.map(function(item){
                        return item;
                    });
                });
            },
            listaProductManager : function(){
                return $resource(constantes.URL + 'usuarios/listado-productManager/json');
            },
            listaVendedor : function(){
                return $resource(constantes.URL + 'usuarios/listado-vendedor/json');
            },
            typeaheadVendedor : function( val ){
                return $http.get( constantes.URL + 'usuarios/buscar-vendedor/json', {
                    params: {
                        termino: val
                    }
                }).then(function(response){
                    return response.data.map(function(item){
                        return item;
                    });
                });
            },
            typeaheadProductManager : function( val ){
                return $http.get( constantes.URL + 'usuarios/buscar-productManager/json', {
                    params: {
                        termino: val
                    }
                }).then(function(response){
                    return response.data.map(function(item){
                        return item;
                    });
                });
            }
        };
  });
