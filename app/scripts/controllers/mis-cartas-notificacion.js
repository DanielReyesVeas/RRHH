'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MisCartasNotificacionCtrl
 * @description
 * # MisCartasNotificacionCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MisCartasNotificacionCtrl', function ($rootScope, $filter, $uibModal, miCartaNotificacion, $scope, $anchorScroll, constantes, Notification) {
    
    $anchorScroll();

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var response = miCartaNotificacion.datos().get();
      response.$promise.then(function(response){
        $scope.datos = response.datos.cartasNotificacion;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    cargarDatos();

    $scope.detalle = function(car, nuevaVentana){
      $rootScope.cargando=true;
      if(nuevaVentana){
        var url = constantes.URL + 'trabajadores/documento/descargar-pdf/' + car.sidDocumento;
        window.open(url);
        $rootScope.cargando = false;
      }else{
        open(car);
      }
    }

    function open(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-mi-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMiCartaNotificacionFrameCtrl',
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
  .controller('FormMiCartaNotificacionFrameCtrl', function ($scope, $sce, $uibModal, constantes, $filter, $uibModalInstance, objeto, Notification, $rootScope) {
    $scope.objeto = angular.copy(objeto);
    $scope.titulo = "Carta de Notificación";
    $scope.subtitulo = $scope.objeto.nombreCompleto;

    $scope.url = constantes.URL + 'trabajadores/documento/descargar-pdf/' + $scope.objeto.sidDocumento;
    $scope.cargado = false;
    $rootScope.cargando = false;
    $scope.cargado = true;

    if($scope.objeto.cartaNotificacion){
      $scope.trabajador = $scope.objeto.cartaNotificacion;
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
