'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:GratificacionCtrl
 * @description
 * # GratificacionCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('GratificacionCtrl', function ($scope, $timeout, $http, $uibModal, $filter, $anchorScroll, anio, constantes, $rootScope, Notification, $location) {
    
    $anchorScroll();
    $scope.cargado = false;    

    function cargarDatos(){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = anio.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;      
        $scope.cargado = true;  
      });
    };

    cargarDatos();

    $scope.pagar = function(anio){
      openConfirmacion(anio);
    }

    $scope.editar = function(anio){
      openGratificacion(anio);
    }

    function openConfirmacion(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormConfirmacionGratificacionCtrl',
        size: 'sm',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      }, function (anio) {
        anio.pagar = !anio.pagar;
      });
    };    

    function openGratificacion(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-gratificacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormGratificacionCtrl',
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
        javascript:void(0);
      });
    };

  })
  .controller('FormConfirmacionGratificacionCtrl', function ($scope, anio, objeto, $uibModal, $uibModalInstance, $http, $filter, $rootScope) {

    var anioActual = objeto;

    if(anioActual.pagar){
      $scope.mensaje = "La Gratificación <b>será incluida</b> en las Liquidaciones de Sueldo del año " + anioActual.nombre + ". ¿Desea continuar?";
    }else{
      $scope.mensaje = "La Gratificación <b>no será incluida</b> en las Liquidaciones de Sueldo del año " + anioActual.nombre + ". ¿Desea continuar?";
    }

    $scope.titulo = 'PAGAR GRATIFICACIÓN';
    $scope.ok = 'Continuar';
    $scope.isOK = true;
    $scope.isQuestion = true;
    $scope.cancel = 'Cancelar';

    $scope.aceptar = function(){
      if(anioActual.pagar){
        openGratificacion(anioActual);
      }else{
        var response;
        response = anio.datos().update({sid:anioActual.sid}, anioActual);

        response.$promise.then(
          function(response){
            if(response.success){
              $uibModalInstance.close(response.mensaje);
            }else{
              // error
              $scope.erroresDatos = response.errores;
              Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
            }          
          }
        );  
      }
    }

    $scope.cerrar = function(){
      $uibModalInstance.dismiss(anioActual);
    }

    function openGratificacion(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-gratificacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormGratificacionCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (mensaje) {
        $uibModalInstance.close(mensaje);
      }, function () {
        $uibModalInstance.dismiss(anioActual);
      });
    };

  })
  .controller('FormGratificacionCtrl', function ($scope, anio, fecha, objeto, $uibModal, $uibModalInstance, $http, $filter, $rootScope) {

    $scope.anio = angular.copy(objeto);
    $scope.anio.fecha = fecha.convertirFecha($scope.anio.fecha);

    $scope.titulo = "Gratificación " + $scope.anio.nombre;
    $scope.encabezado = "Gratificación " + $scope.anio.nombre;

    
    $scope.guardar = function(){
      $rootScope.cargando=true;
      var response;
      response = anio.datos().update({sid:$scope.anio.sid}, $scope.anio);

      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close(response.mensaje);
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }          
        }
      );
    } 

    $scope.cerrar = function(){
      $uibModalInstance.dismiss();
    }

    // Fecha 

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();
    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      //dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };  

    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.openFecha = function() {
      $scope.popupFecha.opened = true;
    };

    $scope.dateOptionsMes = {
      showWeeks: false,
      viewMode: "months", 
      minMode: 'month',
      format: "mm/yyyy"
    };

    $scope.setDate = function(year, month) {
      $scope.anio.fecha = new Date(year, month);
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFecha = {
      opened: false
    };

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }

  });
