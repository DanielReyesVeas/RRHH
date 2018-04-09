'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CentralizacionCtrl
 * @description
 * # CentralizacionCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CentralizacionCtrl', function ($scope, $http, $uibModal, $filter, $anchorScroll, anio, constantes, $rootScope, Notification, mesDeTrabajo, $location) {
    
    $anchorScroll();
    
    $scope.cargado = false;

    if($rootScope.globals.currentUser.empresa){
      $scope.mesDeTrabajo = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
      $scope.anio = $scope.mesDeTrabajo.anio;
    }
    $scope.cierre = {};

    function actualizarOptions(anio){
      $scope.cierre.anio = $filter('filter')( $scope.anios, anio, true )[0];
    }

    function cargarDatos(sid){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = anio.datosCentralizacion().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.anios = response.anios;
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $scope.isGenerar = response.isLiquidaciones;
        $scope.isCentralizado = response.isCentralizado;
        $rootScope.cargando = false;      
        $scope.cargado = true;  
        actualizarOptions(response.anio.anio);
      });
    };

    $scope.selectAnio = function(){
      cargarDatos($scope.cierre.anio.sid);
    }

    $scope.detalle = function(mes){
      $rootScope.cargando = true;
      var datos = mesDeTrabajo.detalleCentralizacion().get({ mes: mes.mes });
      datos.$promise.then(function(response){
        $rootScope.cargando = false;
        openDetalle(response.datos);
      });
    }

    cargarDatos(0);

    function centralizar(mes){
      $rootScope.cargando = true;
      var datos = mesDeTrabajo.centralizar().post({}, mes);
      datos.$promise.then(function(response){
        $rootScope.cargando = false;      
      });
    }

    $scope.openCentralizar = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-centralizar.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCentralizar',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(0);
      }, function () {
        javascript:void(0)
      });
    }

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-detalle-centralizacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCentralizacion',
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
        javascript:void(0)
      });
    }

  })
  .controller('FormDetalleCentralizacion', function ($scope, $uibModalInstance, objeto, $rootScope, fecha) {

    $scope.datos = angular.copy(objeto);

    $scope.aceptar = function(){
      $uibModalInstance.close(objeto);
    }

  })
  .controller('FormCentralizar', function ($scope, constantes, $uibModalInstance, objeto, $rootScope, mesDeTrabajo, Notification) {

    $scope.constantes = constantes;
    $scope.empresa = $rootScope.globals.currentUser.empresa;
    console.log($scope.empresa)
    $scope.mes = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
    $scope.mesActual = $scope.mes.mesActivo;
    $scope.preCentralizado = false;
    $scope.erroresCentralizacion=[];
    $scope.centralizado = false;
    $scope.columnasCC=[];

    $scope.preCentralizar = function(){
      $scope.erroresCentralizacion=[];
      $rootScope.cargando = true;
      var obj = { mes : $scope.mes.mes };
      var datos = mesDeTrabajo.preCentralizar().post({}, obj );
      datos.$promise.then(function(response){
        $rootScope.cargando = false;
        if( response.datos.errores.length == 0 ){
          $scope.comprobante = response.datos.comprobante;
          $scope.columnasCC = response.datos.centrosCostos;
          $scope.sumaDebe = response.datos.sumaDebe;
          $scope.sumaHaber = response.datos.sumaHaber;
          $scope.nombreDocumentoExcel = response.nombreDocumentoExcel;
          $scope.nombreDocumentoPDF = response.nombreDocumentoPDF;
          $scope.preCentralizado = true;
        }else{
          $scope.erroresCentralizacion = response.datos.errores;
        }
      });
    }

    $scope.centralizar = function(){
      $rootScope.cargando = true;
      var obj = { comprobante : $scope.comprobante };
      var datos = mesDeTrabajo.centralizar().post({}, obj );
      datos.$promise.then(function(response){
        if(response.success){
          $uibModalInstance.close(response.mensaje);
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando=false;
        $scope.centralizado = true;
      });
    }

    $scope.aceptar = function(){
      $uibModalInstance.close(objeto);
    }

  });
