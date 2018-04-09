'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CausalesFiniquitoCtrl
 * @description
 * # CausalesFiniquitoCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CausalesFiniquitoCtrl', function ($scope, $uibModal, $filter, $anchorScroll, causalFiniquito, constantes, $rootScope, Notification) {
    
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-causal-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCausalesFiniquitoCtrl',
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
      $scope.result = causalFiniquito.datos().delete({ sid: objeto.sid });
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
      var datos = causalFiniquito.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

})
  .controller('FormCausalesFiniquitoCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, causalFiniquito) {

    if(objeto){
      $scope.causalFiniquito = angular.copy(objeto);
      $scope.titulo = 'Modificación Causales de Finiquito';
      $scope.encabezado = $scope.causalFiniquito.nombre;
    }else{
      $scope.causalFiniquito = {};
      $scope.titulo = 'Ingreso Causal de Finiquito';
      $scope.encabezado = 'Nueva Causal de Finiquito';
    }

    

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.causalFiniquito.sid ){
          response = causalFiniquito.datos().update({sid:$scope.causalFiniquito.sid}, $scope.causalFiniquito);
      }else{
          response = causalFiniquito.datos().create({}, $scope.causalFiniquito);
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
