'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TiendasCtrl
 * @description
 * # TiendasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TiendasCtrl', function ($scope, $uibModal, $filter, $anchorScroll, tienda, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-tienda.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTiendasCtrl',
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
      $scope.result = tienda.datos().delete({ sid: objeto.sid });
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
      var datos = tienda.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

})
  .controller('FormTiendasCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, tienda) {

    if(objeto){
      $scope.tienda = angular.copy(objeto);
      $scope.tituloFormulario = 'Modificación Tiendas';
      $scope.encabezado = $scope.tienda.nombre;
    }else{
      $scope.tienda = {};
      $scope.tituloFormulario = 'Ingreso Tiendas';
      $scope.encabezado = 'Nueva Tienda';
    }
    
    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.tienda.sid ){
          response = tienda.datos().update({sid:$scope.tienda.sid}, $scope.tienda);
      }else{
          response = tienda.datos().create({}, $scope.tienda);
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
