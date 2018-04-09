'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CausalesNotificacionCtrl
 * @description
 * # CausalesNotificacionCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CausalesNotificacionCtrl', function ($scope, $uibModal, $filter, $anchorScroll, causalNotificacion, constantes, $rootScope, Notification) {
    
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-causal-notificacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCausalesNotificacionCtrl',
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
      $scope.result = causalNotificacion.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
            cargarDatos();
          }
      });
    };

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = causalNotificacion.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormCausalesNotificacionCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, causalNotificacion) {

    if(objeto){
      $scope.causalNotificacion = angular.copy(objeto);
      $scope.titulo = 'Modificación Causales de Notificación';
      $scope.encabezado = $scope.causalNotificacion.nombre;
    }else{
      $scope.causalNotificacion = {};
      $scope.titulo = 'Ingreso Causal de Notificación';
      $scope.encabezado = 'Nueva Causal de Notificación';
    }

    

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.causalNotificacion.sid ){
          response = causalNotificacion.datos().update({sid:$scope.causalNotificacion.sid}, $scope.causalNotificacion);
      }else{
          response = causalNotificacion.datos().create({}, $scope.causalNotificacion);
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
