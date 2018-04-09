'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CargosCtrl
 * @description
 * # CargosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CargosCtrl', function ($scope, $uibModal, $filter, $anchorScroll, cargo, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-cargo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCargosCtrl',
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
      $scope.result = cargo.datos().delete({ sid: objeto.sid });
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
      var datos = cargo.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

})
  .controller('FormCargosCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, cargo) {

    if(objeto){
      $scope.cargo = angular.copy(objeto);
      $scope.titulo = 'Modificación Cargos';
      $scope.encabezado = $scope.cargo.nombre;
    }else{
      $scope.cargo = {};
      $scope.titulo = 'Ingreso Cargos';
      $scope.encabezado = 'Nuevo Cargo';
    }

    

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.cargo.sid ){
          response = cargo.datos().update({sid:$scope.cargo.sid}, $scope.cargo);
      }else{
          response = cargo.datos().create({}, $scope.cargo);
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
