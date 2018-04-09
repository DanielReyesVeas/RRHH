'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TiposDeJornadasCtrl
 * @description
 * # TiposDeJornadasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('JornadasCtrl', function ($scope, $uibModal, $filter, $anchorScroll, jornada, constantes, $rootScope, Notification, tramoHoraExtra) {
    $anchorScroll();
    
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function open(obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-jornada.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormJornadaCtrl',
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
      $scope.result = jornada.datos().delete({ sid: objeto.sid });
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

    $scope.gestionar = function(){
      $rootScope.cargando = true;
      var datos = tramoHoraExtra.datos().get();
      datos.$promise.then(function(response){
        openTramosHorasExtra(response.datos);
        $rootScope.cargando = false;        
      });
    }

    function openTramosHorasExtra(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-tramos-horas-extra.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTramosHorasExtraCtrl',
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

    $scope.openForm = function(){
      $rootScope.cargando = true;
      var datos = tramoHoraExtra.datos().get();
      datos.$promise.then(function(response){
        open({ tramosHorasExtra : response.datos });
        $rootScope.cargando = false;        
      });
    };

    $scope.editar = function(jor){
      $rootScope.cargando=true;
      $scope.result = jornada.datos().get({ sid: jor.sid });
      $scope.result.$promise.then( function(response){
        open(response);
        $rootScope.cargando=false;
      });
    };

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = jornada.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormTramosHorasExtraCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, tramoHoraExtra, objeto, Notification) {

    $scope.datos = objeto;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = tramoHoraExtra.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;        
      });
    };

    $scope.open = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-tramo-hora-extra.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormNuevoTramoHoraExtraCtrl',
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

    $scope.eliminar = function(tram){
      $rootScope.cargando=true;
      $scope.result = tramoHoraExtra.datos().delete({ sid: tram });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }
      });
    };

    $scope.editar = function(tram){
      $rootScope.cargando=true;
      $scope.result = tramoHoraExtra.datos().get({ sid: tram });
      $scope.result.$promise.then( function(response){
        $scope.open(response.datos);
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormNuevoTramoHoraExtraCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, tramoHoraExtra, objeto, Notification) {

    if(objeto){
      $scope.tramoHoraExtra = objeto;
      $scope.titulo = "Modificación Tramos de Horas Extra";
      $scope.encabezado = $scope.tramoHoraExtra.jornada;
      $scope.isEdit = true;
    }else{
      $scope.titulo = "Ingreso Tramos de Horas Extra";
      $scope.encabezado = "Nuevo Tramo de Horas Extra";
      $scope.isEdit = false;
    }

    $scope.guardar = function(tram){
      $rootScope.cargando=true;
      var response;
      if( tram.sid ){
        response = tramoHoraExtra.datos().update({sid:tram.sid}, $scope.tramoHoraExtra);
      }else{
        response = tramoHoraExtra.datos().create({}, $scope.tramoHoraExtra);
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
    }

  })
  .controller('FormJornadaCtrl', function ($scope, $uibModalInstance, $filter, objeto, Notification, $rootScope, jornada, tramoHoraExtra) {
    
    $scope.tramosHorasExtra = objeto.tramosHorasExtra;

    if(objeto.datos){
      $scope.jornada = angular.copy(objeto.datos);
      $scope.jornada.tramoHoraExtra = $filter('filter')( $scope.tramosHorasExtra, {id :  $scope.jornada.tramoHoraExtra.id }, true )[0];
      $scope.titulo = 'Modificación Jornadas';
      $scope.encabezado = $scope.jornada.nombre;
      $scope.isEdit = true;
    }else{
      $scope.jornada = {};
      $scope.titulo = 'Ingreso Jornadas';
      $scope.encabezado = 'Nueva Jornada';
      $scope.isEdit = false;
    }    

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      var jor = { nombre : $scope.jornada.nombre, numeroHoras : $scope.jornada.numeroHoras, idTramoHoraExtra : $scope.jornada.tramoHoraExtra.id };
      if( $scope.jornada.sid ){
          response = jornada.datos().update({sid:$scope.jornada.sid}, jor);
      }else{
          response = jornada.datos().create({}, jor);
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
