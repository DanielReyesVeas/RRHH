'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:SemanaCorridaCtrl
 * @description
 * # SemanaCorridaCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('SemanaCorridaCtrl', function ($scope, anio, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification) {
    
    $anchorScroll();
    $scope.objeto = [];
    $scope.isSelect = false;
    $scope.cargado = false;
    $scope.empresa = $rootScope.globals.currentUser.empresa;

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = trabajador.trabajadoresSemanaCorrida().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $scope.semanas = response.semanas;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    $scope.detalle = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-semana-corrida.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormSemanaCorridaCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          accesos: function () {
            return $scope.accesos;          
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();         
        }, function () {
      });
    };

    $scope.calendario = function(){
      $rootScope.cargando = true;
      var datos = anio.calendario().get();
      datos.$promise.then(function(response){
        $scope.anios = response.anios;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
        open($scope.anios, $scope.accesos)
      });
    }

    function open(anios, accesos){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-calendario-semana-corrida.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCalendarioSemanaCorridaCtrl',
        resolve: {
          accesos: function () {
            return accesos;          
          },
          anios: function () {
            return anios;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();         
      }, function () {
      });
    };

    cargarDatos();

  })
  .controller('FormCalendarioSemanaCorridaCtrl', function ($rootScope, anio, fecha, anios, accesos, $uibModal, $filter, Notification, $scope, $uibModalInstance) { 
    
    var anioActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo.idAnio;
    $scope.anios = angular.copy(anios);
    $scope.calendario = { anio : $filter('filter')( $scope.anios, {id : anioActual }, true )[0] };
    $scope.accesos = angular.copy(accesos);

    function cargarDatos(anioActual){
      $rootScope.cargando = true;
      var datos = anio.calendario().get();
      datos.$promise.then(function(response){
        $scope.anios = response.anios;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
      });
      anioActual = anioActual;
      $scope.selectAnio();
    }

    $scope.selectAnio = function(){
      $scope.calendario = { anio : $filter('filter')( $scope.anios, {id : anioActual }, true )[0] };
      $scope.meses = $scope.calendario.anio.meses;
    }

    $scope.detalle = function(obj){
      if(obj.feriados.length>0){
        for(var i=0,len=obj.feriados.length; i<len; i++){
          obj.feriados[i] = fecha.convertirFecha(obj.feriados[i]).setHours(0, 0, 0, 0);         
        }
      }
      openMes(obj);
    }

    function openMes(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-mes-festivos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMesFestivosCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          anioActual: function () {
            return $scope.calendario.anio;          
          }
        }
      });
      miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(obj.anio);
      }, function () {
      });
    };

    $scope.selectAnio();
    
  })
  .controller('FormMesFestivosCtrl', function ($rootScope, anio, anioActual, fecha, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, trabajador) { 

    $scope.titulo = "Semana Corrida";
    $scope.mes = angular.copy(objeto);
    $scope.selectedDates = angular.copy($scope.mes.feriados);
    $scope.anioActual = angular.copy(anioActual);
    $scope.activeDate = fecha.convertirFecha($scope.mes.mes).setHours(0, 0, 0, 0);

    $scope.options = {
      startingDay:1,
      minDate: fecha.convertirFecha($scope.mes.mes),
      maxDate: fecha.convertirFecha($scope.mes.fechaRemuneracion),
      customClass: function(data) {
        if($scope.selectedDates.indexOf(data.date.setHours(0, 0, 0, 0)) > -1) {
          return 'selected';
        }
        return '';
      }
    }
        
    $scope.removeFromSelected = function(dt) {
      $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
      $scope.activeDate = dt;
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      var response;
      var feriados = [];
      for(var i=0,len=$scope.selectedDates.length; i<len; i++){
        feriados.push(fecha.convertirFechaFormato($scope.selectedDates[i]));
      }
      var obj = { feriados : feriados, anio : $scope.anioActual, mes : $scope.mes };
      response = anio.feriados().post({}, obj);
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, anio : response.anio});
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
  .controller('FormSemanaCorridaCtrl', function ($rootScope, accesos, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, licencia, trabajador) { 

    $scope.trabajador = angular.copy(objeto);
    $scope.accesos = angular.copy(accesos);
    $scope.isEdit = [];
    $scope.edit = false;
    crearModels();

    function crearModels(){
      $scope.input = [];
      for(var i=0, len=$scope.trabajador.semanaCorrida.semanas.length; i<len; i++){
        $scope.input.push($scope.trabajador.semanaCorrida.semanas[i].comision);            
        $scope.isEdit.push(false);            
      }
    }

    $scope.editar = function(index, bool){
      if(bool){
        for(var i=0, len=$scope.trabajador.semanaCorrida.semanas.length; i<len; i++){
          if(i===index){
            if($scope.isEdit[index]){
              $scope.trabajador.semanaCorrida.semanas[index].comision = angular.copy($scope.input[index]);            
            }
            $scope.isEdit[index] = !$scope.isEdit[index];
          }else{
            $scope.isEdit[i] = false;          
          }
        }
      }else{
        $scope.isEdit[index] = !$scope.isEdit[index];
      }
      $scope.edit = !$scope.edit;
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      var response;

      response = trabajador.semanaCorrida().post({}, $scope.trabajador.semanaCorrida);

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

  });
