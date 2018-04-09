'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CargasFamiliaresCtrl
 * @description
 * # CargasFamiliaresCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CargasFamiliaresCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    var tiposCargas;

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado = false;
      var datos = trabajador.totalCargas().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        tiposCargas = response.tiposCargas;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

    $scope.openCarga = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-carga.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCargasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          detalle: function () {
            return null;          
          },
          tiposCargas: function () {
            return tiposCargas;          
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();              
      }, function () {
        javascript:void(0)
      });
    };

    $scope.openDetalleCargas = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-cargas.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCargasCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          },
          tiposCargas: function () {
            return tiposCargas;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();         
      }, function () {
        cargarDatos();      
      });
    };

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.cargas().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.openDetalleCargas( response );
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormDetalleCargasCtrl', function ($rootScope, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, tiposCargas, carga, trabajador) { 
    
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.tramos = angular.copy(objeto.tramos);
    $scope.accesos = angular.copy(objeto.accesos);
    var tiposCargas = angular.copy(tiposCargas);
    $scope.tramoChanged = false;
    actualizarOptions();

    $scope.tabGeneral = true;
    $scope.tabDetalle = false;
          
    function cargarDatos(tra){
      $rootScope.cargando=true;
      var datos = trabajador.cargas().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;        
        $scope.tramos = response.tramos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        actualizarOptions();
      });
    };

    $scope.confirmacion = function(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaTramoCtrl',
        resolve: {
          objeto: function () {
            return $scope.trabajador;          
          }
        }
      });
     miModal.result.then(function (object) {
        console.log(object.trabajador)
        console.log(object.todosMeses)
      }, function () {
        javascript:void(0);
      });
    }

    $scope.cambiarTramo = function(){
      $scope.tramoChanged = true;
    }

    $scope.guardarTramo = function(){
      $rootScope.cargando=true;
      var response;
      var Tramo = { idTrabajador : $scope.trabajador.id, tramo : $scope.trabajador.tramo };
      response = trabajador.cambiarTramo().post({}, Tramo);
      response.$promise.then(
        function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
            cargarDatos($scope.trabajador.sid);
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
      $scope.tramoChanged = false;
    }

    function actualizarOptions(){
      $scope.trabajador.tramo = $filter('filter')( $scope.tramos, { tramo :  $scope.trabajador.tramo }, true )[0];
    }

    $scope.editar = function(car, tra, detalle){
      $rootScope.cargando=true;
      var datos = carga.datos().get({sid: car.sid});
      datos.$promise.then(function(response){
        $scope.openCarga( response, detalle );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(car, tra){
      $rootScope.cargando=true;
      $scope.result = carga.datos().delete({ sid: car.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(tra);
        }
        $rootScope.cargando=false;
      });
    }

    $scope.openCarga = function(obj, detalle){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-carga.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCargasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          detalle: function () {
            return detalle;          
          },
          tiposCargas: function () {
            return tiposCargas;          
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(object.sidTrabajador);                 
      }, function () {
        javascript:void(0)
      });
    };

   $scope.openTab = function(tab){
      switch (tab) {
        case 'general':
          $scope.tabGeneral = true;
          $scope.tabDetalle = false;
          break;
        case 'detalle':
          $scope.tabGeneral = false;
          $scope.tabDetalle = true;
          break;      
      }
    }

  })
  .controller('FormAdvertenciaTramoCtrl', function ($scope, $http, $rootScope, $uibModalInstance, objeto, $uibModal, $filter) {

    $scope.titulo = 'Cambiar Tramo';
    $scope.mensaje = 'El Tramo será Modificado.';
    $scope.mensaje2 = '¿Desea actualizarlo <b>a partir de este mes en adelante</b> o para <b>todos los meses del sistema</b> (incluidos los meses anteriores)?';
    $scope.isOK = true;
    $scope.isCerrar = true;
    $scope.isExclamation = true;
    $scope.ok = 'A partir de este mes';
    $scope.cancel = 'Todos los meses';

    $scope.aceptar = function(){
      $uibModalInstance.close({ todosMeses : false, trabajador : objeto });
    }

    $scope.cerrar = function(){
      $uibModalInstance.close({ todosMeses : true, trabajador : objeto });
    }

  })
  .controller('FormCargasCtrl', function ($rootScope, Notification, detalle, $filter, $scope, tiposCargas, $uibModalInstance, objeto, carga, fecha) {

    $scope.tiposCargas = angular.copy(tiposCargas);
    $scope.parentescos = [ 'Hijo/a o Hijastro/a', 'Cónyuge', 'Nieto/a', 'Bisnieto/a', 'Madre', 'Padre', 'Madre Viuda', 'Abuelo/a', 'Bisabuelo/a', 'Otro' ];
    
    if(detalle){
      $scope.tabGeneral = false;
      $scope.tabDetalle = true;
      $scope.tab = 'detalle';
    }else if(detalle==false){
      $scope.tabGeneral = true;
      $scope.tabDetalle = false;
      $scope.tab = 'general';
    }else{
      $scope.tabGeneral = true;
      $scope.tabDetalle = false;
      $scope.tab = '';
    }   

    $scope.openTab = function(tab){
      switch (tab) {
        case 'general':
          $scope.tabGeneral = true;
          $scope.tabDetalle = false;
          break;
        case 'detalle':
          $scope.tabGeneral = false;
          $scope.tabDetalle = true;
          break;      
      }
    }

    if(objeto.trabajador){
      $scope.trabajador = angular.copy(objeto.trabajador);
      $scope.isEdit = true;
      if(detalle){
        $scope.carga = angular.copy(objeto);
        $scope.carga.fechaNacimiento = fecha.convertirFecha($scope.carga.fechaNacimiento);
        $scope.carga.fechaAutorizacion = fecha.convertirFecha($scope.carga.fechaAutorizacion);
        $scope.carga.fechaPagoDesde = fecha.convertirFecha($scope.carga.fechaPagoDesde);
        $scope.carga.fechaPagoHasta = fecha.convertirFecha($scope.carga.fechaPagoHasta);
        $scope.carga.parentesco = $filter('filter')( $scope.parentescos, $scope.carga.parentesco, true )[0];
        $scope.carga.tipo = $filter('filter')( $scope.tiposCargas, { id :  $scope.carga.tipo.id }, true )[0];
      }else{
        $scope.cargaGeneral = angular.copy(objeto);
        $scope.cargaGeneral.fechaAutorizacion = fecha.convertirFecha($scope.cargaGeneral.fechaAutorizacion);
        $scope.cargaGeneral.fechaPagoDesde = fecha.convertirFecha($scope.cargaGeneral.fechaPagoDesde);
        $scope.cargaGeneral.fechaPagoHasta = fecha.convertirFecha($scope.cargaGeneral.fechaPagoHasta);
        $scope.cargaGeneral.tipo = $filter('filter')( $scope.tiposCargas, { id :  $scope.cargaGeneral.tipo.id }, true )[0];
      }
      $scope.titulo = 'Modificación Carga Familiar';
    }else{
      $scope.trabajador = angular.copy(objeto);
      $scope.carga = { esCarga : false, rut : '', parentesco : '', nombreCompleto : '', fechaNacimiento : null, fechaAutorizacion : null, fechaPagoDesde : null, fechaPagoHasta : null, sexo : null, tipo : $scope.tiposCargas[0] };
      $scope.cargaGeneral = { esCarga : true, rut : '', parentesco : '', nombreCompleto : '', fechaNacimiento : null, fechaAutorizacion : null, fechaPagoDesde : null, fechaPagoHasta : null, sexo : null, tipo : $scope.tiposCargas[0] };
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Carga Familiar';
    }

    $scope.guardar = function(car){

      $rootScope.cargando=true;
      var response;
      var Carga = { idTrabajador : $scope.trabajador.id, esCarga : car.esCarga, rut : car.rut, parentesco : car.parentesco, nombreCompleto : car.nombreCompleto, fechaNacimiento : car.fechaNacimiento, fechaAutorizacion : car.fechaAutorizacion, fechaPagoDesde : car.fechaPagoDesde, fechaPagoHasta : car.fechaPagoHasta, sexo : car.sexo, tipo : car.tipo.id };

      if( $scope.carga.sid ){
        response = carga.datos().update({sid:$scope.carga.sid}, Carga);
      }else{
        response = carga.datos().create({}, Carga);
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, sidTrabajador : $scope.trabajador.sid });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    }

     // Fecha 

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };  

    $scope.openFechaNacimientoCarga = function() {
      $scope.popupFechaNacimientoCarga.opened = true;
    };

    $scope.openFechaAutorizacionCarga = function() {
      $scope.popupFechaAutorizacionCarga.opened = true;
    };

    $scope.openFechaPagoDesde = function() {
      $scope.popupFechaPagoDesde.opened = true;
    };

    $scope.openFechaPagoHasta = function() {
      $scope.popupFechaPagoHasta.opened = true;
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFechaNacimientoCarga = {
      opened: false
    };

    $scope.popupFechaAutorizacionCarga = {
      opened: false
    };

    $scope.popupFechaPagoDesde = {
      opened: false
    };

    $scope.popupFechaPagoHasta = {
      opened: false
    };

  });