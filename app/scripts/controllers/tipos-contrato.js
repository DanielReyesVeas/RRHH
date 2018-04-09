'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TiposDeContratosCtrl
 * @description
 * # TiposDeContratosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TiposContratoCtrl', function ($scope, $uibModal, $filter, $anchorScroll, tipoContrato, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-tipo-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTiposContratoCtrl',
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
    };

    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = tipoContrato.datos().delete({ sid: objeto.sid });
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
    };

    function cargarDatos(){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = tipoContrato.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormTiposContratoCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, tipoContrato) {

    if(objeto){
      $scope.contrato = angular.copy(objeto);
      $scope.titulo = 'Modificación Tipos de Contrato';
      $scope.encabezado = $scope.contrato.nombre;
    }else{
      $scope.contrato = { financiamientoEmpleador : true, financiamientoTrabajador : true };
      $scope.titulo = 'Ingreso Tipos de Contrato';
      $scope.encabezado = 'Nuevo Tipo de Contrato';
    }

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.contrato.sid ){
        response = tipoContrato.datos().update({sid:$scope.contrato.sid}, $scope.contrato);
      }else{
        response = tipoContrato.datos().create({}, $scope.contrato);
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
