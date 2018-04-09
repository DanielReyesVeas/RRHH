'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ArchivoPreviredCtrl
 * @description
 * # ArchivoPreviredCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ArchivoPreviredCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification) {
    $anchorScroll();
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = trabajador.previred().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $scope.isGenerar = response.isLiquidaciones;
        $rootScope.cargando = false;      
        $scope.cargado = true;  
      });
    };

    cargarDatos();

    $scope.generarArchivo = function(){
      $rootScope.cargando=true;
      var url = $scope.constantes.URL + 'trabajadores/archivo-previred/descargar-excel';
      window.open(url, "_self");
      $rootScope.cargando=false;
    }

  });