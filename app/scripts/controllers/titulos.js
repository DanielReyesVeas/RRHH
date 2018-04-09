'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TitulosCtrl
 * @description
 * # TitulosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TitulosCtrl', function ($scope, $uibModal, $filter, $anchorScroll, titulo, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-titulo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTitulosCtrl',
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
      $scope.result = titulo.datos().delete({ sid: objeto.sid });
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
      var datos = titulo.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

})
  .controller('FormTitulosCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, titulo) {

    if(objeto){
      $scope.titulo = angular.copy(objeto);
      $scope.tituloFormulario = 'Modificación Títulos';
      $scope.encabezado = $scope.titulo.nombre;
    }else{
      $scope.titulo = {};
      $scope.tituloFormulario = 'Ingreso Títulos';
      $scope.encabezado = 'Nuevo Título';
    }

    

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.titulo.sid ){
          response = titulo.datos().update({sid:$scope.titulo.sid}, $scope.titulo);
      }else{
          response = titulo.datos().create({}, $scope.titulo);
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
