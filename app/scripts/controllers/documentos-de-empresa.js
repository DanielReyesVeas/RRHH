'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:DocumentosDeEmpresaCtrl
 * @description
 * # DocumentosDeEmpresaCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('DocumentosDeEmpresaCtrl', function ($rootScope, $filter, $uibModal, documentoEmpresa, $scope, $anchorScroll, constantes, Notification) {
    
    $anchorScroll();

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var response = documentoEmpresa.publicos().get();
      response.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    cargarDatos();

    $scope.detalle = function(doc, nuevaVentana){
      $rootScope.cargando=true;
      if(nuevaVentana){
        var url = constantes.URL + 'documentos-empresa/documento/descargar-documento/' + doc.sid;
        window.open(url);
        $rootScope.cargando = false;
      }else{
        open(doc);
      }
    }

    function open(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-mi-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMiDocumentoEmpresaFrameCtrl',
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
  .controller('FormMiDocumentoEmpresaFrameCtrl', function ($scope, $sce, $uibModal, constantes, $filter, $uibModalInstance, objeto, Notification, $rootScope) {
    $scope.objeto = angular.copy(objeto);
    $scope.titulo = "Documento Empresa";
    $scope.subtitulo = $scope.objeto.alias;

    $scope.url = constantes.URL + 'documentos-empresa/documento/descargar-documento/' + $scope.objeto.sid;
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

