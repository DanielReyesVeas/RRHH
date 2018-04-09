'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CuentasCtrl
 * @description
 * # CuentasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CuentasCtrl', function ($scope, $uibModal, $filter, $anchorScroll, cuenta, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-cuenta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCuentasCtrl',
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
      $scope.result = cuenta.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
            cargarDatos();
          }
      });
    };

    function cargarDatos(){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = cuenta.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

})
  .controller('FormCuentasCtrl', function ($scope, $filter, $uibModalInstance, objeto, Notification, $rootScope, cuenta) {


    $scope.comportamientos = [
      { id : 1 , nombre : "Debe" },
      { id : 2 , nombre : "Haber" }
    ];

    if(objeto){
      $scope.cuenta = angular.copy(objeto);
      $scope.tituloFormulario = 'Modificación Cuentas';
      $scope.encabezado = $scope.cuenta.nombre;
      $scope.cuenta.comportamiento = $filter('filter')( $scope.comportamientos, $scope.cuenta.comportamiento , true )[0];
    }else{
      $scope.cuenta = {};
      $scope.tituloFormulario = 'Ingreso Cuentas';
      $scope.encabezado = 'Nueva Cuenta';
    }  
    
    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.cuenta.sid ){
          response = cuenta.datos().update({sid:$scope.cuenta.sid}, $scope.cuenta);
      }else{
          response = cuenta.datos().create({}, $scope.cuenta);
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
