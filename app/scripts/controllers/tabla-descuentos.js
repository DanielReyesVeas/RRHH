'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:DescuentosCtrl
 * @description
 * # DescuentosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TablaDescuentosCtrl', function ($rootScope, $scope, mesDeTrabajo, $uibModal, $filter, tipoDescuento, $anchorScroll, constantes, Notification) {
    $anchorScroll();
    
    $scope.datos = [];
    $scope.constantes = constantes;    
    $scope.cargado = false;
    var tipos = [];

    $scope.tabMisDescuentos = true;
    $scope.tabLegales = false;
    $scope.tabCaja = false;
    $scope.tabAfp = false;

    $scope.openTab = function(tab){
      switch (tab) {
        case 'misDescuentos':
          $scope.tabMisDescuentos = true;
          $scope.tabLegales = false;
          $scope.tabCaja = false;
          $scope.tabAfp = false;
          break;
        case 'legales':
          $scope.tabMisDescuentos = false;
          $scope.tabLegales = true;
          $scope.tabCaja = false;
          $scope.tabAfp = false;
          break;
        case 'caja':
          $scope.tabMisDescuentos = false;
          $scope.tabLegales = false;
          $scope.tabCaja = true;
          $scope.tabAfp = false;
          break;
        case 'afp':
          $scope.tabMisDescuentos = false;
          $scope.tabLegales = false;
          $scope.tabCaja = false;
          $scope.tabAfp = true;
          break;
      }
    }

    $scope.open = function(){
      $rootScope.cargando = true;
      var datos = mesDeTrabajo.centralizar().get();
      datos.$promise.then(function(response){
        openForm(null, response);
        $rootScope.cargando = false;      
      });
    }

    function openForm(obj, cuentas) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-tipo-descuento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTipoDescuentoCtrl',
        resolve: {
          objeto: function () {
            return obj;
          },
          tipos: function () {
            return tipos;
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
      $scope.result = tipoDescuento.datos().delete({ sid: objeto.sid });
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
    }

    $scope.editar = function(des){
      $rootScope.cargando=true;
      var datos = tipoDescuento.datos().get({sid:des.sid});
      datos.$promise.then(function(response){
        openForm( response.datos, response.cuentas);
        $rootScope.cargando=false;
      });
    };
    
    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = tipoDescuento.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.legales = response.legales;
        $scope.caja = response.caja;
        $scope.afp = response.afp;
        $scope.accesos = response.accesos;
        tipos = response.tipos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormTipoDescuentoCtrl', function ($scope, tipos, $filter, $uibModal, $uibModalInstance, objeto, Notification, $rootScope, tipoDescuento, mesDeTrabajo) {
    $scope.tipos = angular.copy(tipos);

    if(objeto){
      $scope.tipoDescuento = angular.copy(objeto);
      console.log($scope.tipoDescuento)
      $scope.tipoDescuento.tipo = $filter('filter')( $scope.tipos, {id :  $scope.tipoDescuento.tipo.id }, true )[0];
      $scope.titulo = 'Modificación Descuentos';
      $scope.encabezado = $scope.tipoDescuento.nombre;
      console.log($scope.tipoDescuento)
    }else{
      $scope.tipoDescuento = { tipo : $scope.tipos[0] };
      $scope.titulo = 'Ingreso Descuentos';
      $scope.encabezado = 'Nuevo Descuento';
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      var response;
      if( $scope.tipoDescuento.sid ){
        response = tipoDescuento.datos().update({sid:$scope.tipoDescuento.sid}, $scope.tipoDescuento);
      }else{
        response = tipoDescuento.datos().create({}, $scope.tipoDescuento);
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