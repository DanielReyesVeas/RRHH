'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ApvsCtrl
 * @description
 * # ApvsCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ApvsCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, apv, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado = false;
      var datos = trabajador.totalApvs().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;        
        $rootScope.cargando=false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

    $scope.open = function(){
      $rootScope.cargando=true;
      var datos = apv.datos().get({sid: 0});
      datos.$promise.then(function(response){        
        $rootScope.cargando=false;
        openApv(response);
      })
    };

    function openApv(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-apv.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormApvsCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();                 
      }, function () {
        javascript:void(0);
      });
    };

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-apvs.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleApvsCtrl',
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
        cargarDatos();  
      });
    };

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.apvs().get({sid: sid});
      datos.$promise.then(function(response){
        openDetalle( response );
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormDetalleApvsCtrl', function ($rootScope, $uibModal, apv, $filter, Notification, $scope, $uibModalInstance, objeto, trabajador) { 
    
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);
    $scope.cargado = true;
          
    function cargarDatos(tra){
      $rootScope.cargando=true;
      $scope.cargado = false;
      var datos = trabajador.apvs().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;        
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;    
        $scope.cargado = true;   
      });
    };    

    $scope.editar = function(dato){
      $rootScope.cargando=true;
      var datos = apv.datos().get({sid: dato.sid});
      datos.$promise.then(function(response){
        $scope.open( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(dato){
      $rootScope.cargando=true;
      $scope.result = apv.datos().delete({ sid: dato.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos($scope.trabajador.sid);
        }
      });
    }

    $scope.open = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-apv.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormApvsCtrl',
        resolve: {
          objeto: function () {
            return obj;          
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

  })
  .controller('FormApvsCtrl', function ($rootScope, Notification, $filter, $scope, $uibModalInstance, apv, moneda, objeto, fecha) {

    $scope.afps = angular.copy(objeto.afps);
    $scope.formasPago = angular.copy(objeto.formasPago);

    $scope.regimenes = [ 'A', 'B' ];

    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    if(objeto.datos){
      $scope.titulo = 'APVs';
      $scope.encabezado = 'Modificación APV';
      $scope.apv = angular.copy(objeto.datos)
      $scope.isEdit = true;
      actualizarOptions();
    }else{
      $scope.apv = { formaPago : $scope.formasPago[0], regimen : $scope.regimenes[0], moneda : $scope.monedas[0].nombre };
      $scope.isEdit = false;
      $scope.trabajadores = angular.copy(objeto.trabajadores);
      $scope.titulo = 'APVs';
      $scope.encabezado = 'Nuevo APV';
    }

    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }    

    function actualizarOptions(){
      $scope.apv.fechaPagoDesde = fecha.convertirFecha($scope.apv.fechaPagoDesde);
      $scope.apv.fechaPagoHasta = fecha.convertirFecha($scope.apv.fechaPagoHasta);
      $scope.apv.afp = $filter('filter')( $scope.afps, { id :  $scope.apv.afp.id }, true )[0];
      $scope.apv.formaPago = $filter('filter')( $scope.formasPago, {id :  $scope.apv.formaPago }, true )[0];
    }

    $scope.guardar = function(){

      $rootScope.cargando=true;
      var response;

      if( $scope.apv.sid ){
        response = apv.datos().update({sid:$scope.apv.sid}, $scope.apv);
      }else{
        response = apv.datos().create({}, $scope.apv);
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, sidTrabajador : $scope.apv.trabajador.sid });
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

    $scope.dateOptionsMes = {
      showWeeks: false,
      viewMode: "months", 
      minMode: 'month',
      format: "mm/yyyy"
    };

    $scope.openFechaPagoDesde = function() {
      $scope.popupFechaPagoDesde.opened = true;
    };

    $scope.openFechaPagoHasta = function() {
      $scope.popupFechaPagoHasta.opened = true;
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFechaPagoDesde = {
      opened: false
    };

    $scope.popupFechaPagoHasta = {
      opened: false
    };

  });