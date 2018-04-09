'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:HaberesCtrl
 * @description
 * # HaberesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TablaHaberesCtrl', function ($rootScope, $scope, $uibModal, $filter, tipoHaber, $anchorScroll, constantes, Notification, mesDeTrabajo) {
    $anchorScroll();
    
    $scope.datos = [];
    $scope.constantes = constantes;    
    $scope.cargado = false;

    $scope.tabImponibles = true;
    $scope.tabNoImponibles = false;

    $scope.openTab = function(tab){
      switch (tab) {
        case 'imponibles':
          $scope.tabImponibles = true;
          $scope.tabNoImponibles = false;
          break;
        case 'noImponibles':
          $scope.tabImponibles = false;
          $scope.tabNoImponibles = true;
          break;
      }
    }

    function openHaber(obj, cuentas) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-tipo-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTiposHaberCtrl',
        resolve: {
          objeto: function () {
            return obj;
          },
          imponible: function () {
            return $scope.tabImponibles;
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      }, function () {
        javascript:void(0)
      });
    };

    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = tipoHaber.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }else{
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.errores.error[0], title: 'Mensaje del Sistema', delay: ''});
          $rootScope.cargando=false;
        }
      });
    }
    
    $scope.editar = function(hab){
      $rootScope.cargando=true;
      var datos = tipoHaber.datos().get({sid:hab.sid});      
      datos.$promise.then(function(response){
        openHaber(response.datos);
        $rootScope.cargando=false;
      });
    };

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = tipoHaber.datos().get();
      datos.$promise.then(function(response){
        $scope.imponibles = response.imponibles;
        $scope.noImponibles = response.noImponibles;
        $scope.accesos = response.accesosTabla;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormTiposHaberCtrl', function ($scope, imponible, $uibModalInstance, objeto, Notification, $rootScope, tipoHaber, $uibModal, $filter) {

    if(objeto){
      $scope.tipoHaber = angular.copy(objeto);
      $scope.titulo = 'Modificación Haberes';
      $scope.encabezado = $scope.tipoHaber.nombre;
    }else{
      $scope.tipoHaber = { imponible : imponible, tributable : imponible, gratificacion : imponible, calculaHorasExtras : imponible, proporcionalDiasTrabajados : imponible };
      $scope.titulo = 'Ingreso Haberes';
      $scope.encabezado = 'Nuevo Haber';
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      var response;
      if( $scope.tipoHaber.sid ){
        response = tipoHaber.datos().update({sid:$scope.tipoHaber.sid}, $scope.tipoHaber);
      }else{
        response = tipoHaber.datos().create({}, $scope.tipoHaber);
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close(response.mensaje);
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    };
    
});