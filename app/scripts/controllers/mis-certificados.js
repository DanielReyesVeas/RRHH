'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MisCertificadosCtrl
 * @description
 * # MisCertificadosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MisCertificadosCtrl', function ($rootScope, $filter, $uibModal, miCertificado, $scope, $anchorScroll, constantes, Notification) {
    
    $anchorScroll();

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var response = miCertificado.datos().get();
      response.$promise.then(function(response){
        $scope.datos = response.datos.certificados;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    cargarDatos();

    $scope.detalle = function(cer, nuevaVentana){
      $rootScope.cargando=true;
      if(nuevaVentana){
        var url = constantes.URL + 'trabajadores/documento/descargar-pdf/' + cer.sidDocumento;
        window.open(url);
        $rootScope.cargando = false;
      }else{
        open(cer);
      }
    }

    function open(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-mi-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMiCertificadoFrameCtrl',
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
  .controller('FormMiCertificadoFrameCtrl', function ($scope, $sce, $uibModal, constantes, $filter, $uibModalInstance, objeto, Notification, $rootScope) {
    $scope.objeto = angular.copy(objeto);
    $scope.titulo = "Certificado";
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
