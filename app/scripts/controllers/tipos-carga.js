'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TiposCargaCtrl
 * @description
 * # TiposCargaCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TiposCargaCtrl', function ($scope, $uibModal, $filter, $anchorScroll, tipoCarga, constantes, $rootScope, Notification) {
    $anchorScroll();
    
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    $scope.open = function(obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-tipo-carga.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTipoCargaCtrl',
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
      $scope.result = tipoCarga.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          $scope.cargarDatos();
        }else{
          Notification.error({message: response.errores, title: 'Campo con Dependencias', delay: 10000});
          $rootScope.cargando = false;
        }
      });
    };

    $scope.editar = function(car){
      $rootScope.cargando=true;
      $scope.result = tipoCarga.datos().get({ sid: car.sid });
      $scope.result.$promise.then( function(response){
        $scope.open(response);
        $rootScope.cargando=false;
      });
    };

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = tipoCarga.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormTipoCargaCtrl', function ($scope, $uibModalInstance, $filter, objeto, Notification, $rootScope, tipoCarga) {

    console.log(objeto)
    if(objeto){
      $scope.tipoCarga = angular.copy(objeto.datos);
      $scope.titulo = 'Modificación Tipo de Carga';
      $scope.encabezado = $scope.tipoCarga.nombre;
      $scope.isEdit = true;
    }else{
      $scope.tipoCarga = {};
      $scope.titulo = 'Ingreso Tipos de Carga';
      $scope.encabezado = 'Nuevo Tipo de Carga';
      $scope.isEdit = false;
    }    

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      var car = { nombre : $scope.tipoCarga.nombre };
      if( $scope.tipoCarga.sid ){
          response = tipoCarga.datos().update({sid:$scope.tipoCarga.sid}, car);
      }else{
          response = tipoCarga.datos().create({}, car);
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
