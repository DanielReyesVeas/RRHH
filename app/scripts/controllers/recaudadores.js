'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:RecaudadoresCtrl
 * @description
 * # RecaudadoresCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('RecaudadoresCtrl', function ($scope, $uibModal, $filter, $anchorScroll, recaudador, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    
    $scope.open = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-recaudador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormRecaudadoresCtrl',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        $scope.cargarDatos();
      }, function () {
        javascript:void(0)
      });
    };

    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = recaudador.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
            $scope.cargarDatos();
          }
      });
    };

    $scope.cargarDatos = function(){
      $rootScope.cargando=true;
      var datos = recaudador.datos().get();
      datos.$promise.then(function(respuesta){        
        $scope.accesos = respuesta.accesos;
        $scope.datos = respuesta.datos;
        $rootScope.cargando=false;
      })
    };

    $scope.cargarDatos();

  })
  .controller('FormRecaudadoresCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, recaudador) {

    if(objeto){
      $scope.recaudador = angular.copy(objeto);
      $scope.titulo = 'Modificación Recaudadores';
      $scope.encabezado = $scope.recaudador.nombre;
    }else{
      $scope.recaudador = {};
      $scope.titulo = 'Ingreso Recaudadores';
      $scope.encabezado = 'Nuevo Recaudador';
    }

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.recaudador.id ){
          response = recaudador.datos().update({sid:$scope.recaudador.sid}, $scope.recaudador);
      }else{
          response = recaudador.datos().create({}, $scope.recaudador);
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

