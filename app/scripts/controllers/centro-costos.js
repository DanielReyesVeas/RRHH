'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CentroCostosCtrl
 * @description
 * # CentroCostosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CentroCostosCtrl', function ($scope, $uibModal, $filter, $anchorScroll, centroCosto, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    function open(obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-centro-costo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCentrosCostoCtrl',
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

    function openAgregar(obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-agregar-centro-costo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAgregarCentroCostoCtrl',
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

    $scope.editar = function(cc, accion){
      $rootScope.cargando=true;
      var datos = centroCosto.datos().get({sid: cc});
      datos.$promise.then(function(response){
        if(accion=='agregar'){
          openAgregar( response );
        }else{
          open( response );
        }
        $rootScope.cargando=false;
      });
    };

    $scope.openCentroCosto = function(){
      $rootScope.cargando=true;
      var datos = centroCosto.datos().get();
      datos.$promise.then(function(response){
        open( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = centroCosto.datos().delete({ sid: objeto.sid });
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
      var datos = centroCosto.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.centrosCostos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormAgregarCentroCostoCtrl', function ($scope, $filter, $uibModal, $uibModalInstance, objeto, Notification, $rootScope, centroCosto) {

    $scope.centroPadre = angular.copy(objeto.datos);
    $scope.tituloFormulario = 'Agregar Centros de Costo';
    $scope.encabezado = $scope.centroPadre.nombre; 
    $scope.centrosCostos = angular.copy(objeto.centrosCostos);

    $scope.filtro = function(cc){
      return function(item) {
        console.log(item)
        console.log($scope.centroPadre)
        if(item.nivel>$scope.centroPadre.nivel){
          return true;
        }else{
          return false;
        }
      }
    }

    $scope.guardar = function(){
      console.log($scope.centroCosto)
    }

  })
  .controller('FormCentrosCostoCtrl', function ($scope, $filter, $uibModal, $uibModalInstance, objeto, Notification, $rootScope, centroCosto) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.centrosCostos = angular.copy(objeto.centrosCostos);
    if(objeto.datos){
      $scope.centroCosto = angular.copy(objeto.datos);
      $scope.tituloFormulario = 'Modificación Centros de Costo';
      $scope.encabezado = $scope.centroCosto.nombre;
      actualizarOptions(); 
    }else{
      $scope.centroCosto = {};
      $scope.tituloFormulario = 'Ingreso Centros de Costo';
      $scope.encabezado = 'Nuevo Centro de Costo';      
    }

    
    function actualizarOptions(){
      if($scope.centroCosto.dependencia.id){
        $scope.centroCosto.dependencia = $filter('filter')( $scope.centrosCostos, {id :  $scope.centroCosto.dependencia.id }, true )[0];
      }      
    }
    
    $scope.guardar = function () {
      console.log($scope.centroCosto)
      if($scope.centroCosto.dependencia && $scope.empresa.centroCosto.niveles == $scope.centroCosto.dependencia.nivel){
        advertencia();
      }else{
        $rootScope.cargando=true;
        var response;
        if( $scope.centroCosto.sid ){
            response = centroCosto.datos().update({sid:$scope.centroCosto.sid}, $scope.centroCosto);
        }else{
            response = centroCosto.datos().create({}, $scope.centroCosto);
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
    };

    function advertencia(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaNivelesCtrl'
      });
      miModal.result.then(function () {
      }, function () {
        javascript:void(0)
      });
    }
  
  })
  .controller('FormAdvertenciaNivelesCtrl', function ($scope, $uibModalInstance) {

    $scope.titulo = 'Niveles de Centros de Costos';
    $scope.mensaje = "<b>Ha llegado al límite de los niveles de Centros de Costos.</b>";
    $scope.mensaje2 = "<i>Si desea cambiar el nivel de Centros de Costo, lo puede hacer en la ficha de la Empresa.</i>";
    $scope.isExclamation = true;
    $scope.cancel = 'Volver';

    $scope.cerrar = function(){
      $uibModalInstance.close();
    }

  });
