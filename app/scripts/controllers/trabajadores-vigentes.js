'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TrabajadoresVigentesCtrl
 * @description
 * # TrabajadoresVigentesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TrabajadoresVigentesCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification) {
    $anchorScroll();
    $scope.datos = [];

    $scope.tabActivos = true;
    $scope.tabInactivos = false;
    $scope.cargado = false;

    $scope.openTab = function(tab){
      switch (tab) {
        case 'activos':
          $scope.tabActivos = true;
          $scope.tabInactivos = false;
          break;
        case 'inactivos':
          $scope.tabActivos = false;
          $scope.tabInactivos = true;
          break;
      }
    }

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = trabajador.vigentes().get();
      datos.$promise.then(function(response){
        $scope.activos = response.activos;
        $scope.inactivos = response.inactivos;
        $rootScope.cargando = false;      
        $scope.cargado = true;  
      });
    };

    cargarDatos();

    $scope.detalle = function(tra){
      $rootScope.cargando=true;
      var datos = trabajador.datos().get({sid:tra.sid});
      datos.$promise.then(function(response){
        $scope.openDetalleTrabajador( response.trabajador );
        $rootScope.cargando=false;
      });
    };

    $scope.openDetalleTrabajador = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetallesTrabajadorCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function (selectedItem) {
         $scope.selected = selectedItem;            
      }, function () {
        javascript:void(0)
      });
    };

  })
  .controller('FormDetallesTrabajadorCtrl', function ($scope, $uibModalInstance, objeto) {
    $scope.trabajador = angular.copy(objeto);
    $scope.isCargas = false;

    function isCargas(){
      for(var i=0, len=$scope.trabajador.cargas.length; i<len; i++){
        if($scope.trabajador.cargas[i].esCarga){
          $scope.isCargas = true;
        }
      }
    }

    isCargas();

  });
