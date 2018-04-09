'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.anio
 * @description
 * # anio
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('anio', function (constantes, $resource) {
        return {
            datos: function () {
                return $resource(constantes.URL + 'anios/:sid',
                    {sid : '@sid'},
                    {   
                        update : { 'method': 'PUT' },
                        delete : { 'method': 'DELETE' },
                        create : { 'method': 'POST' }
                    }
                );
            },
            datosCierre : function(){
              return $resource(constantes.URL + 'anio-remuneracion/datos-cierre/obtener');
            },
            datosCentralizacion : function(){
              return $resource(constantes.URL + 'anio-remuneracion/datos-centralizacion/obtener/:sid');
            },
            cerrarMeses : function(){
              return $resource(constantes.URL + 'anio-remuneracion/cerrar-meses/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            feriados : function(){
              return $resource(constantes.URL + 'anio-remuneracion/feriados/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            feriadosVacaciones : function(){
              return $resource(constantes.URL + 'anio-remuneracion/feriados-vacaciones/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            gratificacion : function(){
              return $resource(constantes.URL + 'anio-remuneracion/gratificacion/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            calendario : function(){
              return $resource(constantes.URL + 'anio-remuneracion/calendario/obtener');
            },
            calendarioVacaciones : function(){
              return $resource(constantes.URL + 'anio-remuneracion/calendario-vacaciones/obtener');
            }
        };
  });
