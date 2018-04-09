'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:IngresoLicenciasCtrl
 * @description
 * # IngresoLicenciasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('IngresoLicenciasCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, licencia, constantes, $rootScope, Notification) {
    $anchorScroll();
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = trabajador.totalLicencias().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

    $scope.open = function(){
      $rootScope.cargando=true;
      var datos = licencia.datos().get({sid: 0});
      datos.$promise.then(function(response){        
        $rootScope.cargando=false;
        openLicencia(response);
      })
    }

    function openLicencia(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-licencia.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormLicenciasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();  
      }, function () {
        javascript:void(0)
      });
    };

    $scope.openDetalleLicencias = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-licencias.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleLicenciasCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();         
      }, function () {
        cargarDatos();      
      });
    };

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.licencias().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.openDetalleLicencias( response );
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormDetalleLicenciasCtrl', function ($rootScope, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, licencia, trabajador) { 
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);    

    function cargarDatos(tra){
      $rootScope.cargando=true;
      var datos = trabajador.licencias().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
      });
    };

    $scope.editar = function(lic, tra){
      $rootScope.cargando=true;
      var datos = licencia.datos().get({sid: lic.sid});
      datos.$promise.then(function(response){
        $scope.openLicencia( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(lic, tra){
      $rootScope.cargando=true;
      $scope.result = licencia.datos().delete({ sid: lic.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(tra);
        }
      });
    }

    $scope.openLicencia = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-licencia.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormLicenciasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(object.sidTrabajador);         
      }, function () {
        javascript:void(0)
      });
    };

  })
  .controller('FormLicenciasCtrl', function ($rootScope, Notification, $scope, $uibModalInstance, objeto, licencia, fecha) {
    var mesActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
    $scope.selectedDates = [];
    var disabledDates = angular.copy(tomadas);
    $scope.totalDias = 0;
    $scope.activeDate = fecha.fechaActiva();
    var ultimoMes = $rootScope.globals.currentUser.empresa.ultimoMes.fechaRemuneracion;
    var primerMes = $rootScope.globals.currentUser.empresa.primerMes.mes;
    
    $scope.isSelect = false;
/*
    if(objeto.trabajador){
      $scope.trabajador = angular.copy(objeto.trabajador);
      $scope.licencia = angular.copy(objeto);
      $scope.licencia.desde = fecha.convertirFecha($scope.licencia.desde);
      $scope.licencia.hasta = fecha.convertirFecha($scope.licencia.hasta);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Licencia Médica';
    }else{
      $scope.trabajador = angular.copy(objeto);
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Licencia Médica';
      $scope.licencia = { desde : fecha.fechaActiva(), hasta : fecha.fechaActiva() };
    }*/

    if(objeto.datos){
      $scope.titulo = 'Licencias Médicas';
      $scope.encabezado = 'Modificación Licencia Médica';
      $scope.licencia = angular.copy(objeto.datos)
      $scope.isEdit = true;
      actualizarOptions();
    }else{
      $scope.isEdit = false;
      $scope.licencia = {};
      $scope.trabajadores = angular.copy(objeto.trabajadores);
      $scope.titulo = 'Licencias Médicas';
      $scope.encabezado = 'Nuevo Licencia Médica';
    }

    $scope.guardar = function(licen, trabajador){
      $rootScope.cargando=true;
      var mes = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
      var response;
      if(licen.desde==fecha.fechaActiva()){
        licen.desde = fecha.convertirFecha(fecha.convertirFechaFormato(licen.desde));
      }
      if(licen.hasta==fecha.fechaActiva()){
        licen.hasta = fecha.convertirFecha(fecha.convertirFechaFormato(licen.hasta));
      }
      var Licencia = { idTrabajador : trabajador.id, idMes : mes.id, dias : licen.dias, codigo : licen.codigo, desde : licen.desde, hasta : licen.hasta, observacion : licen.observacion };

      if( $scope.licencia.sid ){
        response = licencia.datos().update({sid:$scope.licencia.sid}, Licencia);
      }else{
        response = licencia.datos().create({}, Licencia);
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, sidTrabajador : trabajador.sid });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    }

    $scope.calcularDias = function(){
      if($scope.licencia.desde && $scope.licencia.hasta){
        if($scope.licencia.desde == $scope.licencia.hasta){
          $scope.licencia.dias = 1;
        }else{
          $scope.licencia.dias = (($scope.licencia.hasta - $scope.licencia.desde) / 86400000 + 1);
        }
      }
    }

    // Fecha
    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: fecha.convertirFecha(mesActual.fechaRemuneracion),
      minDate: fecha.convertirFecha(mesActual.mes),
      startingDay: 1
    };  

    $scope.openFechaHasta = function() {
      $scope.popupFechaHasta.opened = true;
    };

    $scope.openFechaDesde = function() {
      $scope.popupFechaDesde.opened = true;
    };

    $scope.format = ['dd-MMMM-yyyy'];

    $scope.popupFechaHasta = {
      opened: false
    };
    $scope.popupFechaDesde = {
      opened: false
    };

  });

