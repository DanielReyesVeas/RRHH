'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.trabajador
 * @description
 * # trabajador
 * Factory in the angularjsApp.
 */
angular.module('angularjsApp')
  .factory('trabajador', function (constantes, $resource) {
        return {
            datos: function () {
              return $resource(constantes.URL + 'trabajadores/:sid',
                {sid : '@sid'},
                {   
                    update : { 'method': 'PUT' },
                    delete : { 'method': 'DELETE' },
                    create : { 'method': 'POST' }
                }
              );
            },
            input : function(){
              return $resource(constantes.URL + 'trabajadores/input/obtener');
            },
            inputActivos : function(){
              return $resource(constantes.URL + 'trabajadores/input-activos/obtener');
            },
            totalInasistencias : function(){
              return $resource(constantes.URL + 'trabajadores/total-inasistencias/obtener');
            },
            totalLicencias : function(){
              return $resource(constantes.URL + 'trabajadores/total-licencias/obtener');
            },
            totalHorasExtra : function(){
              return $resource(constantes.URL + 'trabajadores/total-horas-extra/obtener');
            },
            totalPrestamos : function(){
              return $resource(constantes.URL + 'trabajadores/total-prestamos/obtener');
            },
            totalCargas : function(){
              return $resource(constantes.URL + 'trabajadores/total-cargas-familiares/obtener');
            },
            totalApvs : function(){
              return $resource(constantes.URL + 'trabajadores/total-apvs/obtener');
            },
            inasistencias : function(){
              return $resource(constantes.URL + 'trabajadores/inasistencias/obtener/:sid');
            },
            licencias : function(){
              return $resource(constantes.URL + 'trabajadores/licencias/obtener/:sid');
            },
            horasExtra : function(){
              return $resource(constantes.URL + 'trabajadores/horas-extra/obtener/:sid');
            },
            prestamos : function(){
              return $resource(constantes.URL + 'trabajadores/prestamos/obtener/:sid');
            },
            vacaciones : function(){
              return $resource(constantes.URL + 'trabajadores/vacaciones/obtener/:sid');
            },
            apvs : function(){
              return $resource(constantes.URL + 'trabajadores/apvs/obtener/:sid');
            },
            cargas : function(){
              return $resource(constantes.URL + 'trabajadores/cargas-familiares/obtener/:sid');
            },
            cargasAutorizar : function(){
              return $resource(constantes.URL + 'trabajadores/cargas-familiares-autorizar/obtener/:sid');
            },
            autorizarCargas : function(){
              return $resource(constantes.URL + 'trabajadores/autorizar-cargas-familiares/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            cambiarTramo : function(){
              return $resource(constantes.URL + 'trabajadores/tramo/cambiar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            formularioContrato : function(){
              return $resource(constantes.URL + 'trabajadores/opciones/formulario-contrato');
            },
            afps : function(){
              return $resource(constantes.URL + 'trabajadores/opciones/afps');
            }, 
            secciones : function(){
              return $resource(constantes.URL + 'trabajadores/secciones/formulario');
            }, 
            seccion : function(){
              return $resource(constantes.URL + 'trabajadores/seccion/obtener/:sid');
            },                         
            haberes : function(){
              return $resource(constantes.URL + 'trabajadores/haberes/obtener/:sid');
            },
            descuentos : function(){
              return $resource(constantes.URL + 'trabajadores/descuentos/obtener/:sid');
            },
            ingresados : function(){
              return $resource(constantes.URL + 'trabajadores/ingresados/obtener');
            },
            trabajadoresFiniquitos : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-finiquitos/obtener');
            },
            vigentes : function(){
              return $resource(constantes.URL + 'trabajadores/vigentes/obtener');
            },
            previred : function(){
              return $resource(constantes.URL + 'trabajadores/archivo-previred/obtener');
            },
            reajuste : function(){
              return $resource(constantes.URL + 'trabajadores/reajuste/obtener');
            },
            trabajadoresLiquidaciones : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-liquidaciones/obtener');
            },
            trabajadoresF1887 : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-f1887/obtener/:sid');
            },
            trabajadoresDocumentos : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-documentos/obtener');
            },
            trabajadoresVacaciones : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-vacaciones/obtener');
            },
            trabajadoresSemanaCorrida : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-semana-corrida/obtener');
            },
            planillaCostoEmpresa : function(){
              return $resource(constantes.URL + 'trabajadores/planilla-costo-empresa/obtener');
            },
            trabajadoresCartasNotificacion : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-cartas-notificacion/obtener');
            },
            trabajadoresCertificados : function(){
              return $resource(constantes.URL + 'trabajadores/trabajadores-certificados/obtener');
            },
            cartasNotificacion : function(){
              return $resource(constantes.URL + 'trabajadores/cartas-notificacion/obtener/:sid');
            },
            finiquitos : function(){
              return $resource(constantes.URL + 'trabajadores/finiquitos/obtener/:sid');
            },
            certificados : function(){
              return $resource(constantes.URL + 'trabajadores/certificados/obtener/:sid');
            },
            documentos : function(){
              return $resource(constantes.URL + 'trabajadores/documentos/obtener/:sid');
            },
            contratos : function(){
              return $resource(constantes.URL + 'trabajadores/contratos/obtener/:sid');
            },
            fichas : function(){
              return $resource(constantes.URL + 'trabajadores/fichas/obtener/:sid');
            },
            liquidacion : function(){
              return $resource(constantes.URL + 'trabajadores/liquidacion/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            f1887Trabajadores : function(){
              return $resource(constantes.URL + 'trabajadores/f1887-trabajadores/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            f1887 : function(){
              return $resource(constantes.URL + 'trabajadores/f1887/generar/:anio');
            },
            verF1887 : function(){
              return $resource(constantes.URL + 'trabajadores/f1887/ver/:anio');
            },
            carta : function(){
              return $resource(constantes.URL + 'trabajadores/carta-notificacion/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            contrato : function(){
              return $resource(constantes.URL + 'trabajadores/contrato/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            finiquito : function(){
              return $resource(constantes.URL + 'trabajadores/finiquito/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            certificado : function(){
              return $resource(constantes.URL + 'trabajadores/certificado/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            reajustar : function(){
              return $resource(constantes.URL + 'trabajadores/reajuste/masivo',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            finiquitar : function(){
              return $resource(constantes.URL + 'trabajadores/finiquitar/generar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            generarLibro : function(){
              return $resource(constantes.URL + 'trabajadores/libro-remuneraciones/generar-excel',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            generarNomina : function(){
              return $resource(constantes.URL + 'trabajadores/nomina-bancaria/generar-excel',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            generarPlanilla : function(){
              return $resource(constantes.URL + 'trabajadores/planilla-costo-empresa/generar-excel',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            semanaCorrida : function(){
              return $resource(constantes.URL + 'trabajadores/semana-corrida/actualizar',
                  {},
                  { post : { 'method': 'POST' } }
              );
            },
            importar : function(){
                return $resource(constantes.URL + 'trabajadores/generar-ingreso/masivo',
                    {},
                    { post : { 'method': 'POST' } }
                );
            },
            liquidacionObservaciones : function(){
              return $resource(constantes.URL + 'trabajadores/liquidacion/registro-observaciones/:id',
                  { id : "@id"},
                  { post : { 'method': 'POST' } }
              );
            }
        };
  });
