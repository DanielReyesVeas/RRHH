'use strict';
var scopeSystem;
/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.utils.masks',
    'ngFileUpload',
    'ui-notification',
    'ngStorage',
    'ui.tinymce',
    'multipleDatePicker',
    'gm.datepickerMultiSelect',
    'vcRecaptcha',
    'flow'
  ])
  .config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
    
    $routeProvider
      .when('/login/:SId?', {
        templateUrl: 'views/comun/login.html?v=1.2.3.4',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        controllerAs: 'menu'
      })
      .when('/funcionarios', {
        templateUrl: 'views/funcionarios.html',
        controller: 'FuncionariosCtrl',
        controllerAs: 'funcionarios'
      })
      .when('/inicio', {
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl',
        controllerAs: 'inicio'
      })
      .when('/empresas', {
        templateUrl: 'views/empresas.html',
        controller: 'EmpresasCtrl',
        controllerAs: 'empresas'
      })
      .when('/tabla-impuesto-unico', {
        templateUrl: 'views/tabla-impuesto-unico.html',
        controller: 'TablaImpuestoUnicoCtrl',
        controllerAs: 'tablaImpuestoUnico'
      })
      .when('/tabla-global-mensual', {
        templateUrl: 'views/tabla-global-mensual.html',
        controller: 'TablaGlobalMensualCtrl',
        controllerAs: 'tablaGlobalMensual'
      })
      .when('/trabajadores', {
        templateUrl: 'views/trabajadores.html',
        controller: 'TrabajadoresCtrl',
        controllerAs: 'trabajadores'
      })
      .when('/tipos-contrato', {
        templateUrl: 'views/tipos-contrato.html',
        controller: 'TiposContratoCtrl',
        controllerAs: 'TiposContrato'
      })
      .when('/jornadas', {
        templateUrl: 'views/jornadas.html',
        controller: 'JornadasCtrl',
        controllerAs: 'jornadas'
      })
      .when('/tabla-haberes', {
        templateUrl: 'views/tabla-haberes.html',
        controller: 'TablaHaberesCtrl',
        controllerAs: 'tablaHaberes'
      })
      .when('/tabla-descuentos', {
        templateUrl: 'views/tabla-descuentos.html',
        controller: 'TablaDescuentosCtrl',
        controllerAs: 'tablaDescuentos'
      })
      .when('/ingreso-haberes', {
        templateUrl: 'views/ingreso-haberes.html',
        controller: 'IngresoHaberesCtrl',
        controllerAs: 'ingresoHaberes'
      })
      .when('/ingreso-descuentos', {
        templateUrl: 'views/ingreso-descuentos.html',
        controller: 'IngresoDescuentosCtrl',
        controllerAs: 'ingresoDescuentos'
      })
      .when('/ingreso-inasistencias', {
        templateUrl: 'views/ingreso-inasistencias.html',
        controller: 'IngresoInasistenciasCtrl',
        controllerAs: 'ingresoInasistencias'
      })
      .when('/ingreso-licencias', {
        templateUrl: 'views/ingreso-licencias.html',
        controller: 'IngresoLicenciasCtrl',
        controllerAs: 'ingresoLicencias'
      })
      .when('/ingreso-horas-extra', {
        templateUrl: 'views/ingreso-horas-extra.html',
        controller: 'IngresoHorasExtraCtrl',
        controllerAs: 'ingresoHorasExtra'
      })
      .when('/ingreso-prestamos', {
        templateUrl: 'views/ingreso-prestamos.html',
        controller: 'IngresoPrestamosCtrl',
        controllerAs: 'ingresoPrestamos'
      })
      .when('/tablas-estructurantes', {
        templateUrl: 'views/tablas-estructurantes.html',
        controller: 'TablasEstructurantesCtrl',
        controllerAs: 'tablasEstructurantes'
      })
      .when('/organica', {
        templateUrl: 'views/organica.html',
        controller: 'OrganicaCtrl',
        controllerAs: 'organica'
      })
      .when('/tablas', {
        templateUrl: 'views/tablas.html',
        controller: 'TablasCtrl',
        controllerAs: 'tablas'
      })
      .when('/recaudadores', {
        templateUrl: 'views/recaudadores.html',
        controller: 'RecaudadoresCtrl',
        controllerAs: 'recaudadores'
      })
      .when('/cargas-familiares', {
        templateUrl: 'views/cargas-familiares.html',
        controller: 'CargasFamiliaresCtrl',
        controllerAs: 'cargasFamiliares'
      })
      .when('/trabajadores-vigentes', {
        templateUrl: 'views/trabajadores-vigentes.html',
        controller: 'TrabajadoresVigentesCtrl',
        controllerAs: 'trabajadoresVigentes'
      })
      .when('/asociar-documentos', {
        templateUrl: 'views/asociar-documentos.html',
        controller: 'AsociarDocumentosCtrl',
        controllerAs: 'asociarDocumentos'
      })
      .when('/reajuste-global', {
        templateUrl: 'views/reajuste-global.html',
        controller: 'ReajusteGlobalCtrl',
        controllerAs: 'reajusteGlobal'
      })
      .when('/liquidaciones-de-sueldo', {
        templateUrl: 'views/liquidaciones-de-sueldo.html',
        controller: 'LiquidacionesDeSueldoCtrl',
        controllerAs: 'liquidacionesDeSueldo'
      })
      .when('/perfiles', {
        templateUrl: 'views/perfiles.html',
        controller: 'PerfilesCtrl',
        controllerAs: 'perfiles'
      })
      .when('/libro-remuneraciones', {
        templateUrl: 'views/libro-remuneraciones.html',
        controller: 'LibroRemuneracionesCtrl',
        controllerAs: 'libroRemuneraciones'
      })
      .when('/finiquitar-trabajador', {
        templateUrl: 'views/finiquitar-trabajador.html',
        controller: 'FiniquitarTrabajadorCtrl',
        controllerAs: 'finiquitarTrabajador'
      })
      .when('/causales-finiquito', {
        templateUrl: 'views/causales-finiquito.html',
        controller: 'CausalesFiniquitoCtrl',
        controllerAs: 'causalesFiniquito'
      })
      .when('/nomina-bancaria', {
        templateUrl: 'views/nomina-bancaria.html',
        controller: 'NominaBancariaCtrl',
        controllerAs: 'nominaBancaria'
      })
      .when('/cartas-de-notificacion', {
        templateUrl: 'views/cartas-de-notificacion.html',
        controller: 'CartasDeNotificacionCtrl',
        controllerAs: 'cartasDeNotificacion'
      })
      .when('/clausulas-contrato', {
        templateUrl: 'views/clausulas-contrato.html',
        controller: 'ClausulasContratoCtrl',
        controllerAs: 'clausulasContrato'
      })
      .when('/trabajadores-vacaciones', {
        templateUrl: 'views/trabajadores-vacaciones.html',
        controller: 'TrabajadoresVacacionesCtrl',
        controllerAs: 'trabajadoresVacaciones'
      })
      .when('/certificados', {
        templateUrl: 'views/certificados.html',
        controller: 'CertificadosCtrl',
        controllerAs: 'certificados'
      })
      .when('/planilla-costo-empresa', {
        templateUrl: 'views/planilla-costo-empresa.html',
        controller: 'PlanillaCostoEmpresaCtrl',
        controllerAs: 'planillaCostoEmpresa'
      })
      .when('/cargos', {
        templateUrl: 'views/cargos.html',
        controller: 'CargosCtrl',
        controllerAs: 'cargos'
      })
      .when('/titulos', {
        templateUrl: 'views/titulos.html',
        controller: 'TitulosCtrl',
        controllerAs: 'titulos'
      })
      .when('/cierre-mensual', {
        templateUrl: 'views/cierre-mensual.html',
        controller: 'CierreMensualCtrl',
        controllerAs: 'cierreMensual'
      })
      .when('/clausulas-finiquito', {
        templateUrl: 'views/clausulas-finiquito.html',
        controller: 'ClausulasFiniquitoCtrl',
        controllerAs: 'clausulasFiniquito'
      })
      .when('/causales-notificacion', {
        templateUrl: 'views/causales-notificacion.html',
        controller: 'CausalesNotificacionCtrl',
        controllerAs: 'causalesNotificacion'
      })
      .when('/archivo-previred', {
        templateUrl: 'views/archivo-previred.html',
        controller: 'ArchivoPreviredCtrl',
        controllerAs: 'archivoPrevired'
      })
      .when('/tipos-carga', {
        templateUrl: 'views/tipos-carga.html',
        controller: 'TiposCargaCtrl',
        controllerAs: 'tiposCarga'
      })
      .when('/gestion-cuentas', {
        templateUrl: 'views/gestion-cuentas.html',
        controller: 'GestionCuentasCtrl',
        controllerAs: 'gestionCuentas'
      })
      .when('/gratificacion', {
        templateUrl: 'views/gratificacion.html',
        controller: 'GratificacionCtrl',
        controllerAs: 'gratificacion'
      })
      .when('/semana-corrida', {
        templateUrl: 'views/semana-corrida.html',
        controller: 'SemanaCorridaCtrl',
        controllerAs: 'semanaCorrida'
      })
      .when('/tabla-cajas', {
        templateUrl: 'views/tabla-cajas.html',
        controller: 'TablaCajasCtrl',
        controllerAs: 'tablaCajas'
      })
      .when('/centro-costos', {
        templateUrl: 'views/centro-costos.html',
        controller: 'CentroCostosCtrl',
        controllerAs: 'centroCostos'
      })
      .when('/tiendas', {
        templateUrl: 'views/tiendas.html',
        controller: 'TiendasCtrl',
        controllerAs: 'tiendas'
      })
      .when('/cuentas', {
        templateUrl: 'views/cuentas.html',
        controller: 'CuentasCtrl',
        controllerAs: 'cuentas'
      })
      .when('/documentos-empresa', {
        templateUrl: 'views/documentos-empresa.html',
        controller: 'DocumentosEmpresaCtrl',
        controllerAs: 'documentosEmpresa'
      })
      .when('/empleados', {
        templateUrl: 'views/empleados.html',
        controller: 'EmpleadosCtrl',
        controllerAs: 'empleados'
      })
      .when('/solicitudes', {
        templateUrl: 'views/solicitudes.html',
        controller: 'SolicitudesCtrl',
        controllerAs: 'solicitudes'
      })
      .when('/documentos-de-empresa', {
        templateUrl: 'views/documentos-de-empresa.html',
        controller: 'DocumentosDeEmpresaCtrl',
        controllerAs: 'documentosDeEmpresa'
      })
      .when('/mis-certificados', {
        templateUrl: 'views/mis-certificados.html',
        controller: 'MisCertificadosCtrl',
        controllerAs: 'misCertificados'
      })
      .when('/mis-cartas-notificacion', {
        templateUrl: 'views/mis-cartas-notificacion.html',
        controller: 'MisCartasNotificacionCtrl',
        controllerAs: 'misCartasNotificacion'
      })
      .when('/mis-liquidaciones', {
        templateUrl: 'views/mis-liquidaciones.html',
        controller: 'MisLiquidacionesCtrl',
        controllerAs: 'misLiquidaciones'
      })
      .when('/apvs', {
        templateUrl: 'views/apvs.html',
        controller: 'ApvsCtrl',
        controllerAs: 'apvs'
      })
      .when('/centralizacion', {
        templateUrl: 'views/centralizacion.html',
        controller: 'CentralizacionCtrl',
        controllerAs: 'centralizacion'
      })
      .when('/reportes', {
        templateUrl: 'views/reportes.html',
        controller: 'ReportesCtrl',
        controllerAs: 'reportes'
      })
      .when('/f1887', {
        templateUrl: 'views/f1887.html',
        controller: 'F1887Ctrl',
        controllerAs: 'f1887'
      })
      .when('/factores-actualizacion', {
        templateUrl: 'views/factores-actualizacion.html',
        controller: 'FactoresActualizacionCtrl',
        controllerAs: 'factoresActualizacion'
      })
      .otherwise({
        redirectTo: '/login'
      });
    })
    .directive('ngSpinnerLoader', ['$rootScope',
        function($rootScope) {
            return {
                link: function(scope, element) {
                   
                    // by defult hide the spinner bar
                    element.addClass('hide'); // hide spinner bar by default
                    // display the spinner bar whenever the route changes(the content part started loading)
                    $rootScope.$on('$routeChangeStart', function() {
                        element.removeClass('hide'); // show spinner bar
                    });
                    // hide the spinner bar on rounte change success(after the content loaded)
                    $rootScope.$on('$routeChangeSuccess', function() {
                        setTimeout(function(){
                            element.addClass('hide'); // hide spinner bar
                        },500);
                        angular.element('html, body').animate({
                            scrollTop: 0
                        }, 500);   
                    });
                }
            };
        }
    ])    

    .directive('icheck', function($timeout) {
        return {
            require: 'ngModel',
            link: function($scope, element, $attrs, ngModel) {
                return $timeout(function() {
                    var value;
                    value = $attrs.value;

                    $scope.$watch($attrs.ngModel, function(){
                         angular.element(element).iCheck('update');
                    });

                    return angular.element(element).iCheck({
                        checkboxClass: 'icheckbox_flat-blue',
                        radioClass: 'iradio_flat-blue'

                    }).on('ifChanged', function(event) {
                        if (angular.element(element).attr('type') === 'checkbox' && $attrs.ngModel) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if (angular.element(element).attr('type') === 'radio' && $attrs.ngModel) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    })

    .run(function($rootScope, $location, $localStorage, $http, $timeout, $interval, constantes, Notification, $resource){
        // keep user logged in after page refresh
        $rootScope.globals = $localStorage.globals || {};
        if( $rootScope.globals ){
            if ($rootScope.globals.currentUser) {
       //         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }
        }


        $rootScope.checkVersion = function(){
            var datosVersion = $resource(constantes.URL + 'inicio/version').get();
            datosVersion.$promise.then(function(respuesta){
                
                $rootScope.habilitarVista=true;

                if( constantes.version !== respuesta.version ){
                    var versionMensaje = Notification.info({message: 'Existe una nueva versión del sistema (<b>'+respuesta.version+'</b>) disponible para ser cargada. Presione el botón F5 o recargue la página nuevamente para instalarla.', title: 'Mensaje del Sistema', delay:''});
                    $interval.cancel( $rootScope.revision);
                    $rootScope.revision = $interval(function(){
                        versionMensaje.then(function(notification){
                            notification.kill();
                        });
                        $rootScope.checkVersion();
                    }, 30000);

                }else{
                    $interval.cancel( $rootScope.revision);
                    $rootScope.revision = $interval(function(){
                        $rootScope.checkVersion();
                    }, 30000);
                }

            });
        };

        // comprobar version para que puedan descargar la nueva
        if( !constantes.version ){
      //      $rootScope.checkVersion();
        }else{
            $rootScope.revision = $timeout(function(){
                $rootScope.checkVersion();
            }, 1000);
        }

 
        $rootScope.$on('$locationChangeStart', function () {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $location.path().indexOf('/login') === -1;

            if( $rootScope.globals ){
              

                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }

                if( $rootScope.globals.currentUser ){
                    var permitir = $rootScope.globals.currentUser.accesos.indexOf( $location.path() ) >= 0;
                    if( !permitir ){
                        if( $rootScope.globals.currentUser.default ){
                            $location.path( $rootScope.globals.currentUser.default );
                        }else{
                            $location.path('/login');
                        }
                    }
                }
                
            }
        });
    })
    .controller('systemCtrl', function($rootScope, $scope, $filter, $timeout, $uibModal, $injector, $route, $location, $localStorage, $window, $http, applicationService, quickViewService, builderService, Notification, pluginsService, login, constantes, valorIndicador){
        scopeSystem = $scope;
        $rootScope.cargando=false;
        $rootScope.validarVersion=false;
        $rootScope.revisarVersion=false;
        $rootScope.versionTime=10000;
        $scope.constantes = constantes;

        $scope.cerrarModals=function(){
            var $uibModalStack = $injector.get('$uibModalStack');
            $uibModalStack.dismissAll();
        };
        
        function openNoAutorizado(){
          var miModal = $uibModal.open({
            animation: true,
            templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
            controller: 'FormNoAutorizadoCtrl',
            size: 'sm'
          });
          miModal.result.then(function () {
          }, function () {
            javascript:void(0)
          });
        }

        $scope.comprobarAcceso = function(url){
          if( $rootScope.globals.currentUser ){
            var permitir = $rootScope.globals.currentUser.accesos.indexOf(url) >= 0;
            if( !permitir ){
              openNoAutorizado();
            }else{
              $location.path(url);
            }
          }
        }        

        $scope.logout = function(){
          var portal="";
          if( $rootScope.globals.currentUser.isEmpleado ){
            portal = angular.copy($rootScope.globals.currentUser.empresa.portal);
          }
          login.ClearCredentials();
          $location.path('/login' + (portal? '/' + portal : ''));
        };

        $scope.openSoporteOnline=function(){
            var ancho=800;
            var alto=600;
            var newUrl = 'http://soporte.easysystems.cl/chat?locale=Es&usuario=' + $rootScope.globals.currentUser.cliente;
            var posicionX =(screen.width/2)-(ancho/2); 
            var posicionY =(screen.height/2)-(alto/2); 
            $window.open(newUrl, 'SOPORTEONLINEEASYSYSTEMSRRHH', 'width='+ancho+',height='+alto+',left='+posicionX+',top='+posicionY+', scrollbars=yes');
        };

        $scope.openFormPassword = function(){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalPassword.html',
                controller: 'ModalFormPasswordCtrl',
                size: '800'
            });
            modalInstance.result.then(function (mensaje) {
                Notification.success({message: mensaje, title:'Notificación del Sistema'});
            });
        };

        $scope.openContactoComercial = function(){
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContactoComercial.html',
                controller: 'ModalFormContactoComercialCtrl',
                size: '700'
            });

            modalInstance.result.then(function (mensaje) {
                Notification.success({message: mensaje, title:'Notificación del Sistema'});
            });
        };

        $scope.cambiarEmpresa = function(empresa){
            $rootScope.cargando=true;
            var request = $http({
                method: 'post',
                url: constantes.URL + 'cambiar-empresa',
                data: {
                    empresa: empresa.id,
                    actual : $location.path()
                }
            });
            // Store the data-dump of the FORM scope.
            request.then(              
                function( response ) {
                    if(response.data.success){
                      $rootScope.globals.currentUser.empresa = response.data.empresa;
                      
                      $rootScope.globals.currentUser.menu = response.data.menu.menu;
                      $rootScope.globals.currentUser.accesos = response.data.menu.secciones;
                      $rootScope.globals.currentUser.default = response.data.menu.inicio;
                      $rootScope.globals.currentUser.listaMesesDeTrabajo = response.data.listaMesesDeTrabajo;
                      $rootScope.globals.indicadores = response.data.indicadores;                        
                      
                      if(!$rootScope.globals.indicadores){
                        $rootScope.globals.isIndicadores = false;
                        $location.path('/tabla-global-mensual');
                      }else{
                        $rootScope.globals.isIndicadores = true;
                        if( response.data.recargar ){
                          $timeout(function(){
                            $('#main-menu').smartmenus('refresh');
                          }, 500);        
                          $route.reload();                    
                        }else{
                          $timeout(function(){
                            $('#main-menu').smartmenus('refresh');
                          }, 500);  
                          $route.reload();  
                          $location.path('/inicio');
                        }
                      }   
                        
                    }else{
                      Notification.error({message: 'Hubo un problema al intentar conectarse a la base de datos', title: 'Mensaje del Sistema'});
                    }
                    $rootScope.cargando=false;
                }
            );
        };

        $scope.cambiarMesDeTrabajo = function(mesDeTrabajo){
            $rootScope.cargando=true;            
            var request = $http({
                method: 'post',
                url: constantes.URL + 'cambiar-mes-de-trabajo',
                data: {
                    mes: mesDeTrabajo,
                    actual : $location.path()
                }
            });
            // Store the data-dump of the FORM scope.
            request.then(
                function( response ) {                
                    if(response.data.success){
                      $rootScope.globals.currentUser.empresa.mesDeTrabajo = response.data.mesActual;
                      $rootScope.globals.currentUser.listaMesesDeTrabajo = response.data.listaMesesDeTrabajo;
                      $rootScope.globals.indicadores.uf = response.data.uf;
                      $rootScope.globals.indicadores.utm = response.data.utm;
                      $rootScope.globals.indicadores.uta = response.data.uta;                        

                      $rootScope.globals.isIndicadores = true;
                      if( response.data.recargar ){
                        $timeout(function(){
                          $('#main-menu').smartmenus('refresh');
                        }, 500);        
                        $route.reload();                    
                      }else{
                        $timeout(function(){
                          $('#main-menu').smartmenus('refresh');
                        }, 500);  
                        $route.reload();  
                        $location.path('/inicio');
                      }
                    }else{                      
                      Notification.error({message: response.data.mensaje, title: 'Mensaje del Sistema'});
                    }
                    $rootScope.cargando=false;
                }
            );
        };

        $scope.filtroEmpresa = function(item){
            if( item ){
                if( item.id !== $rootScope.globals.currentUser.empresa.id ){ 
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };


        angular.element(document).ready(function () {     
            applicationService.init();
            quickViewService.init();
            builderService.init();
            pluginsService.init();
        });
        
        $scope.$on('$viewContentLoaded', function () {
            
            pluginsService.init();
            applicationService.customScroll();
            applicationService.handlePanelAction();
            angular.element('.nav.nav-sidebar .nav-active').removeClass('nav-active active');
            angular.element('.nav.nav-sidebar .active:not(.nav-parent)').closest('.nav-parent').addClass('nav-active active');

            if($location.$$path === '/' || $location.$$path === '/layout-api'){
                angular.element('.nav.nav-sidebar .nav-parent').removeClass('nav-active active');
                angular.element('.nav.nav-sidebar .nav-parent .children').removeClass('nav-active active');
                if (angular.element('body').hasClass('sidebar-collapsed') && !angular.element('body').hasClass('sidebar-hover')){ return; }
                if (angular.element('body').hasClass('submenu-hover')){ return;}
                angular.element('.nav.nav-sidebar .nav-parent .children').slideUp(200);
                angular.element('.nav-sidebar .arrow').removeClass('active');
            }

        });
    
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $timeout(function(){
            $('#main-menu').smartmenus('refresh');
        }, 500);

    })
    .controller('FormNoAutorizadoCtrl', function ($scope, $uibModalInstance) {

      $scope.titulo = "Permisos Insuficientes";
      $scope.mensaje = "<b>El Usuario no posee los permisos necesarios para ingresar.</b>";
      $scope.isExclamation = true;
      $scope.cancel = 'Cerrar';

      $scope.cerrar = function(){
        $uibModalInstance.close();
      }

    })    
    .controller('ModalFormPasswordCtrl', function ($scope, $rootScope, $uibModalInstance, Notification, funcionario, empleado) {
        var usuario = $rootScope.globals.currentUser;
        $scope.objeto = {};
        $rootScope.cargando=false;
        $scope.guardar = function () {
            $rootScope.cargando=true;
            var datos;
            if(usuario.isEmpleado){
              datos = empleado.perfil().post( {}, $scope.objeto );
            }else{
              datos = funcionario.perfil().post( {}, $scope.objeto );
            }
            datos.$promise.then(
                function( data ){
                    if (data.success) {
                        $uibModalInstance.close( data.mensaje );
                    }else{          
                        Notification.error({message: data.mensaje, title:'Notificación del Sistema'});
                        $scope.objeto = {};
                    }
                    $rootScope.cargando=false;
                }
            );
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    })

    .controller('ModalFormContactoComercialCtrl', function ($scope, $rootScope, $uibModalInstance, Notification) {
        $scope.objeto = {};
      

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .directive('ngViewClass', function ($location) {
        return {
            link: function (scope, element, attrs) {
                var classes = attrs.ngViewClass ? attrs.ngViewClass.replace(/ /g, '').split(',') : [];
                setTimeout(function () {
                
                    if (angular.element(element).hasClass('ng-enter')) {
                        for (var i = 0; i < classes.length; i++) {
                            var route = classes[i].split(':')[1];
                            var newclass = classes[i].split(':')[0];

                            if (route === $location.path()) {
                                angular.element(element).addClass(newclass);
                            } else {
                                angular.element(element).removeClass(newclass);
                            }
                        }
                    }
                });

            }
        };
    })
    
    .directive('confirmationClick', function( $uibModal, $sce ) {
        return {
            restrict: 'A',
            link: function(scope, elt, attrs) {
                elt.bind('click', function() {
                    var msg = $sce.trustAsHtml( attrs.confirmationNeeded ) || 'Estas seguro de continuar?';

                    var modalInstance = $uibModal.open({
                        animation: scope.animationsEnabled,
                        templateUrl: 'views/modal-confirmation.html',
                        controller: 'ModalFormDialogCtrl',
                        size:'sm',
                        resolve: {
                            objeto: function(){
                                return {
                                    titulo : 'Confirmación',
                                    mensaje : msg
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        var action = attrs.confirmClick? attrs.confirmClick : attrs.confirmationClick;
                        if (action){
                            scope.$eval(action);
                        }
                        }, function () {
        javascript:void(0)
                    });
                });
            },
        };
    })

    .controller('ModalFormDialogCtrl', [ '$scope', '$uibModalInstance', 'objeto' , function ($scope, $uibModalInstance, objeto) {
        $scope.dialog = objeto;
        $scope.aceptar = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 6000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
    })
    .config(function (uibDatepickerConfig, uibDatepickerPopupConfig ) {
        uibDatepickerConfig.showWeeks = false;
        uibDatepickerPopupConfig .showButtonBar = false;
    })
    .factory('redirectInterceptor', function($q, $location, $window, constantes, $rootScope, $interval, $localStorage, $injector){

        function cerrarVentanas(){
            var $uibModalStack = $injector.get('$uibModalStack');
            $uibModalStack.dismissAll();
        }

        return  {
            'response':function(response){
              
                if (typeof response.data === 'string' && response.data.indexOf('login-error-status')>-1) {
                    $rootScope.globals = {};
                    $rootScope.menu = {};
                    cerrarVentanas();
                    $localStorage.$reset();
                    $location.path('/login' + ($rootScope.path ? '/' + $rootScope.path : ''));
                    $interval.cancel( $rootScope.revision);
                    $rootScope.revision = $interval(function(){
                        $rootScope.checkVersion();
                    }, 30000);
                    $rootScope.habilitarVista=false;

                    return $q.reject(response);
                }else{
                    return response;
                }
                
                return response;
            }
        };
        
    })
    .factory('fecha', function($filter, $rootScope){
      var fun = {
        convertirFecha: function(date){
          if(date){
            date = new Date( date + 'T09:30:00' );
          }
          return date;
        },
        convertirFechaFormato: function(date){
          if(date){
            date = $filter('date')(new Date(date),'yyyy-MM-dd');
          }
          return date;
        },
        obtenerMes: function(date){
          if(!date){
            date = new Date();
          }    
          date = this.convertirFecha(date);

          var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);

          return primerDia;
        },
        obtenerFechaTexto: function(date){
          if(!date){
            date = new Date();
          }            
          var mes = this.obtenerMesTexto(date.getMonth());
          var dia = date.getDate();
          var anio = date.getFullYear();

          if(dia<10){
            var dd = 0;
          }else{
            var dd = '';
          }
          
          var texto = dd + dia + ' de ' + mes + ' de ' + anio;
          
          return texto;
        },
        obtenerMesTexto: function(mes){
          switch(mes){
            case 0:
              return 'Enero';
              break;
            case 1:
              return 'Febrero';
              break;
            case 2:
              return 'Marzo';
              break;
            case 3:
              return 'Abril';
              break;
            case 4:
              return 'Mayo';
              break;
            case 5:
              return 'Junio';
              break;
            case 6:
              return 'Julio';
              break;
            case 7:
              return 'Agosto';
              break;
            case 8:
              return 'Septiembre';
              break;
            case 9:
              return 'Octubre';
              break;
            case 10:
              return 'Noviembre';
              break;
            case 11:
              return 'Diciembre';
              break;
          }
        },
        fechaActiva: function(){
          var mes = this.convertirFecha($rootScope.globals.currentUser.empresa.mesDeTrabajo.mes).setHours(0, 0, 0, 0);
          var fechaRemuneracion = this.convertirFecha($rootScope.globals.currentUser.empresa.mesDeTrabajo.fechaRemuneracion).setHours(0, 0, 0, 0);
          var fechaActual = this.convertirFecha(new Date()).setHours(0, 0, 0, 0);
          if(fechaActual <= fechaRemuneracion && fechaActual >= mes){
            return fechaActual;
          }
          return mes;
        }
      }    
      return fun;       
    })    
    .factory('moneda', function($rootScope){
      var fun = {
        convertirUF: function(valor, noRound){
          var pesos = (valor * $rootScope.globals.indicadores.uf.valor);
          if(noRound){
            return pesos;
          }
          return Math.round(pesos);
        },
        convertirUTM: function(valor, noRound){
          var pesos = (valor * $rootScope.globals.indicadores.utm.valor);
          if(noRound){
            return pesos;
          }
          return Math.round(pesos);
        },
        convertir: function(valor, moneda, noRound){
          if(moneda==='UF'){
            valor = this.convertirUF(valor);
          }else if(moneda==='UTM'){
            valor = this.convertirUTM(valor);
          }
          if(noRound){
            return valor;
          }
          return Math.round(valor);
        }
      }    
      return fun;
    }) 
    .factory('validations', function($rootScope, fecha){
      var fun = {
        validaRUT: function(rut){
          if(rut){
            var a = '';
            var resto = 0;
            var sumatoria = 0;
            var sumar = [2,3,4,5,6,7,2,3];
            var dig = rut[rut.length-1];

            for(var i=(rut.length - 2), j=0; i>=0; i--, j++){
              sumatoria = sumatoria + (rut[i] * sumar[j]);
            }

            resto = (sumatoria % 11);
            var digito = (11 - resto);
            if(digito===11){
              digito = 0;
            }else if(digito===10){
              digito = 'k';
            }

            if(dig.toLowerCase() === 'k'){
              dig = dig.toLowerCase();
            }

            if(digito == dig){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        },
        validaFecha: function(date){
          var anioActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo.anio;
          date = date.split("-");
          if(date.length===3){
            var dia = date[0];
            var mes = date[1];
            var anio = date[2];
            var ultimoDia = new Date(anio, (mes), 0).getDate();

            if(dia > 0 && dia <= ultimoDia){
              if(mes > 0 && mes <= 12){
                if(anio > 1900){
                  return true;
                }
              }
            }

          }
          return false;
        },
        validaFechaMin: function(date, fechaMin){
          date = fecha.convertirFechaFormato(date)
          fechaMin = fecha.convertirFechaFormato(fechaMin)
          if(date < fechaMin){
            return false;
          }
          return true;
        }
      }    
      return fun;
    }) 
    .factory('utilities', function(){
      var fun = {
        unidad: function(valor, plural, saltar, milesima, millonesima, mil, tilde){          
          var unidad;
          if(saltar){
            unidad = '';
          }else{
            if(milesima || millonesima){
              var un = valor.substr(0,1);
            }else{
              var un = valor;
            }
            switch(un){
              case '0':
                if(milesima){ 
                  if(mil){       
                    unidad = 'mil ';                
                  }else{
                    unidad = '';
                  }
                }else{
                  if(millonesima){
                    unidad = 'millones ';
                  }else{
                    if(!plural){
                      unidad = 'cero ';
                    }else{
                      unidad = '';
                    }
                  }
                }
                break;
              case '1':      
                if(milesima){                          
                  unidad = 'mil ';  
                  if(!plural){
                    unidad = 'un mil '; 
                  }                 
                }else{
                  if(millonesima){
                    unidad = 'un millón ';
                  }else{
                    if(tilde){
                      unidad = 'ún ';
                    }else{
                      unidad = 'un ';                  
                    }
                  }
                }
                break;
              case '2':
                if(milesima){        
                  unidad = 'dos mil ';                
                }else{
                  if(millonesima){
                    unidad = 'dos millones ';
                  }else{
                    unidad = 'dos ';
                  }
                }
                break;
              case '3':
                if(milesima){        
                  unidad = 'tres mil ';                
                }else{
                  if(millonesima){
                    unidad = 'tres millones ';
                  }else{
                    unidad = 'tres ';
                  }
                }
                break;
              case '4':
                if(milesima){        
                  unidad = 'cuatro mil ';                
                }else{
                  if(millonesima){
                    unidad = 'cuatro millones ';
                  }else{
                    unidad = 'cuatro ';
                  }
                }
                break;
              case '5':
                if(milesima){        
                  unidad = 'cinco mil ';                
                }else{
                  if(millonesima){
                    unidad = 'cinco millones ';
                  }else{
                    unidad = 'cinco ';
                  }
                }
                break;
              case '6':
                if(milesima){        
                  unidad = 'seis mil ';                
                }else{
                  if(millonesima){
                    unidad = 'seis millones ';
                  }else{
                    if(tilde){
                      unidad = 'séis ';
                    }else{
                      unidad = 'seis ';                      
                    }
                  }
                }
                break;
              case '7':
                if(milesima){        
                  unidad = 'siete mil ';                
                }else{
                  if(millonesima){
                    unidad = 'siete millones ';
                  }else{
                    unidad = 'siete ';
                  }
                }
                break;
              case '8':
                if(milesima){        
                  unidad = 'ocho mil ';                
                }else{
                  if(millonesima){
                    unidad = 'ocho millones ';
                  }else{
                    unidad = 'ocho ';
                  }
                }
                break;
              case '9':
                if(milesima){        
                  unidad = 'nueve mil ';                
                }else{
                  if(millonesima){
                    unidad = 'nueve millones ';
                  }else{
                    unidad = 'nueve ';
                  }
                }
                break;
              }
          }

          if(milesima){
            valor = valor.substr(1,3);
            return unidad + this.centena(valor, false, false, mil);
          }else if(millonesima){
            valor = valor.substr(1,6);            
            if(valor==='000000'){
              return unidad + 'de pesos';
            }else{
              if(valor[0]==='0' && valor[1]==='0' && valor[2]==='0'){
                mil = false;                
              }
              return unidad + this.centena(valor, true, false, mil); 
            }
          }

          if(!plural && valor==='1'){
            unidad += 'peso';
          }else{
            unidad += 'pesos';
          }

          return unidad;
        },
        decena: function(valor, milesima, millonesima, mil){
          var dec = valor.substr(0,1);
          var un = valor.substr(1,1);
          var decena;
          var saltar = false;
          var tilde = false;

          switch(dec){
            case '0':
              decena = '';
              break;
            case '1':
              if(un>5){
                decena = 'dieci';
                saltar = false;
                tilde = true;
              }else{
                switch(un){
                  case '0':
                    if(millonesima){
                      decena = 'diez millones ';
                    }else{
                      if(milesima){        
                        decena = 'diez mil ';                                
                      }else{
                        decena = 'diez ';
                      }
                    }                    
                    break;
                  case '1':
                    if(millonesima){
                      decena = 'once millones ';
                    }else{
                      if(milesima){        
                        decena = 'once mil ';                                
                      }else{
                        decena = 'once ';
                      }
                    }   
                    break;
                  case '2':
                    if(millonesima){
                      decena = 'doce millones ';
                    }else{
                      if(milesima){        
                        decena = 'doce mil ';                                
                      }else{
                        decena = 'doce ';
                      }
                    }   
                    break;
                  case '3':
                    if(millonesima){
                      decena = 'trece millones ';
                    }else{
                      if(milesima){        
                        decena = 'trece mil ';                                
                      }else{
                        decena = 'trece ';
                      }
                    }   
                    break;
                  case '4':
                    if(millonesima){
                      decena = 'catorce millones ';
                    }else{
                      if(milesima){        
                        decena = 'catorce mil ';                                
                      }else{
                        decena = 'catorce ';
                      }
                    }  
                    break;
                  case '5':
                    if(millonesima){
                      decena = 'quince millones ';
                    }else{
                      if(milesima){        
                        decena = 'quince mil ';                                
                      }else{
                        decena = 'quince ';
                      }
                    }
                    break;                    
                }         
                saltar = true;                       
              }
              break;
            case '2':
              if(un==='0'){
                decena = 'veinte ';
              }else{
                decena = 'veinti';
                tilde = true;
              }
              break;
            case '3':
              if(un==='0'){
                decena = 'treinta ';
              }else{
                decena = 'treinta y ';
              }
              break;
            case '4':
              if(un==='0'){
                decena = 'cuarenta ';
              }else{
                decena = 'cuarenta y ';
              }
              break;
            case '5':
              if(un==='0'){
                decena = 'cincuenta ';
              }else{
                decena = 'cincuenta y ';
              }
              break;
            case '6':
              if(un==='0'){
                decena = 'sesenta ';
              }else{
                decena = 'sesenta y ';
              }
              break;
            case '7':
              if(un==='0'){
                decena = 'setenta ';
              }else{
                decena = 'setenta y ';
              }
              break;
            case '8':
              if(un==='0'){
                decena = 'ochenta ';
              }else{
                decena = 'ochenta y ';
              }
              break;
            case '9':
              if(un==='0'){
                decena = 'noventa ';
              }else{
                decena = 'noventa y ';
              }
              break;
          }

          if(milesima){
            var un = valor.substr(1,4);
            return decena + this.unidad(un, false, saltar, milesima, millonesima, mil, tilde);
          }else if(millonesima){
            var un = valor.substr(1,7);
            return decena + this.unidad(un, true, saltar, milesima, millonesima, mil, tilde);            
          }
          return decena + this.unidad(un, true, saltar, milesima, millonesima, mil, tilde);
        },
        centena: function(valor, milesima, millonesima, mil){
          var dec = valor.substr(1,2);
          var cen = valor.substr(0,1);
          var centena;

          switch(cen){
            case '0':
              centena = '';
              break;
            case '1':
              if(dec>0){
                centena = 'ciento ';
              }else{
                centena = 'cien ';
              }
              break;
            case '2':
              centena = 'doscientos ';
              break;
            case '3':
              centena = 'trescientos ';
              break;
            case '4':
              centena = 'cuatrocientos ';
              break;
            case '5':
              centena = 'quinientos ';
              break;
            case '6':
              centena = 'seiscientos ';
              break;
            case '7':
              centena = 'setecientos ';
              break;
            case '8':
              centena = 'ochocientos ';
              break;
            case '9':
              centena = 'novecientos ';
              break;
          }

          if(milesima){
            var dec = valor.substr(1,5);
            return centena + this.decena(dec, milesima, millonesima, mil);
          }else if(millonesima){
            var dec = valor.substr(1,8);
            return centena + this.decena(dec, milesima, millonesima, mil);
          }
          return centena + this.decena(dec, milesima, millonesima, mil);
          
        },
        convertirPalabras: function(valor){
          var numero = valor.toString();
          if(numero.length===1){
            return this.unidad(numero, false, false, false, false, true, false);
          }else if(numero.length===2){
            return this.decena(numero, false, false, true);
          }else if(numero.length===3){
            return this.centena(numero, false, false, true);
          }else if(numero.length===4){
            return this.unidad(numero, true, false, true, false, true, false);
          }else if(numero.length===5){
            return this.decena(numero, true, false, true);
          }else if(numero.length===6){
            return this.centena(numero, true, false, true);
          }else if(numero.length===7){
            return this.unidad(numero, true, false, false, true, true, false);
          }else if(numero.length===8){
            return this.decena(numero, false, true, true);
          }else if(numero.length===9){
            return this.centena(numero, false, true, true);
          }          
        }
      }    
      return fun;       
    }) 
    .config(['$httpProvider',function($httpProvider) {
        $httpProvider.interceptors.push('redirectInterceptor');
    }])
    .filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }])
    .filter('orderObjectBy', function() {
      return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
          filtered.push(item);
        });
        filtered.sort(function (a, b) {
          return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
      };
    })
    .filter('capitalize', function() {
      return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
      }
    })
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .filter("formatofecha", function() {
        return function(input) {
            if( input ){
                alert('input: ' + input);
                return input.replace(/\//g, "-");
            }
        }
    })
    .directive('regularFecha',function() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope,elem,attrs,ngModelCtrl) {
          var dRegex = new RegExp(attrs.awDatepickerPattern);

          ngModelCtrl.$parsers.unshift(parserFecha);         

          function parserFecha(value) {
            if (typeof value === 'string') {
                value = value.replace(/\//g, '-');
            }
            return value;
          };
        }
      };
    });