'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MisLiquidacionesCtrl
 * @description
 * # MisLiquidacionesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MisLiquidacionesCtrl', function ($rootScope, $filter, $uibModal, miLiquidacion, $scope, $anchorScroll, constantes, Notification) {
    
    $anchorScroll();

    function cargarDatos(sid){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var response = miLiquidacion.datos().get({sid: sid});
      response.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.anios = response.anios;
        $rootScope.cargando = false;
        $scope.cargado = true;
        actualizarOptions(response.anio.anio);
      });
    }

    $scope.objeto = {};

    function actualizarOptions(anio){
      $scope.objeto.anio = $filter('filter')( $scope.anios, anio, true )[0];
    }

    $scope.selectAnio = function(){
      cargarDatos($scope.objeto.anio.sid);
    }

    cargarDatos(0);

    $scope.detalle = function(liq, nuevaVentana){
      $rootScope.cargando=true;
      if(nuevaVentana){
        var url = constantes.URL + 'trabajadores/documento/descargar-pdf/' + liq.sidDocumento;
        window.open(url);
        $rootScope.cargando = false;
      }else{
        open(liq);
      }
    }

    function open(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-mi-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMiLiquidacionFrameCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function (datos) {
        javascript:void(0);            
      }, function () {
        javascript:void(0);
      });
    }

  })
  .controller('FormMiLiquidacionFrameCtrl', function ($scope, $sce, $uibModal, constantes, $filter, $uibModalInstance, objeto, Notification, $rootScope) {
    $scope.objeto = angular.copy(objeto);

    $scope.titulo = "Liquidación de Sueldo";
    $scope.subtitulo = $scope.objeto.nombreCompleto;

    $scope.url = constantes.URL + 'trabajadores/documento/descargar-pdf/' + $scope.objeto.sidDocumento;
    $scope.cargado = false;
    $rootScope.cargando = false;
    $scope.cargado = true;

    if($scope.objeto.liquidacion){
      $scope.trabajador = $scope.objeto.liquidacion;
    }else{
      $scope.trabajador = $scope.objeto;
    }

    $scope.trustSrc = function(src){
      return $sce.trustAsResourceUrl(src);
    }

    $scope.iframeLoadedCallBack = function(){
      $scope.cargado = true;
    }

  });
