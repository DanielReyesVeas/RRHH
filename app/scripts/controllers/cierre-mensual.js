'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CierreMensualCtrl
 * @description
 * # CierreMensualCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CierreMensualCtrl', function ($scope, $http, $uibModal, $filter, $anchorScroll, anio, constantes, $rootScope, Notification, mesDeTrabajo, $location) {
    
    $anchorScroll();
    $scope.isCME = $rootScope.globals.currentUser.empresa.isCME;
    $scope.cargado = false;

    if($rootScope.globals.currentUser.empresa){
      $scope.mesDeTrabajo = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
      $scope.anio = $scope.mesDeTrabajo.anio;
    }
    $scope.cierre = {};

    function actualizarOptions(){
        if( $scope.datos.nombre ){
            $scope.cierre.anio = $filter('filter')( $scope.anios, { nombre : $scope.datos.nombre } , true )[0];
        }else{
            $scope.cierre.anio = $filter('filter')( $scope.anios, $scope.cierre.anio, true )[0];
        }
    }

    $scope.get = function(mes){
      $rootScope.cargando = true;
      $http.get(constantes.URL + 'trabajadores/cuentas/obtener')
      .then(function(response){
        console.log(response.data);
        $rootScope.cargando = false;      
      });
    }    

    function cargarDatos(){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = anio.datosCierre().get();
      datos.$promise.then(function(response){
        $scope.anios = response.anios;
        $scope.isNuevoAnio = response.isNuevoAnio;
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $scope.isLiquidaciones = response.isLiquidaciones;
        $scope.isCuentas = response.isCuentas;
        $rootScope.cargando = false;      
        $scope.cargado = true;  
        actualizarOptions();
      });
    };

    $scope.isFirst = function(index){
      var bool = false;

      if($scope.datos.estadoMeses[index].disponible && !$scope.datos.estadoMeses[index].iniciado){        
        bool = true;

        for(var i=0, len=$scope.datos.estadoMeses.length; i<len; i++){
          if($scope.datos.estadoMeses[i].disponible && !$scope.datos.estadoMeses[i].iniciado){
            if(i===index){
              bool = true;
              break;
            }else{
              bool = false;
              break;
            }
          }
        }
      }

      return bool;
    }

    cargarDatos();


    $scope.guardar = function(){
      $rootScope.cargando=true;
      var meses = $scope.datos.estadoMeses;
      var response;
      response = anio.cerrarMeses().post({}, meses);

      response.$promise.then(
        function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
            cargarDatos()
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }          
        }
      );
    } 

    $scope.centralizar = function(mes){
      $rootScope.cargando = true;
      var datos = mesDeTrabajo.centralizar().post({}, mes);
      datos.$promise.then(function(response){
        $rootScope.cargando = false;      
      });
    }

    function openCentralizar(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-centralizar.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCentralizar',
        size: 'lg',
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
    }

    $scope.confirmar = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-terminos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTerminos',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (mes) {
        iniciar(mes);
      }, function () {
        javascript:void(0)
      });
    }

    function iniciar(mes){
      $rootScope.cargando=true;
      console.log(mes)
      if(mes.nombre==='NuevoAnio'){
        var datosMes = { mes : '2018-01-01', nombre : 'NuevoAnio', fechaRemuneracion : '2018-01-31', idAnio : $scope.datos.id };
      }else{
        var datosMes = { mes : mes.mes, nombre : mes.nombre, fechaRemuneracion : mes.fechaRemuneracion, idAnio : $scope.datos.id };
      }
      var response;
      response = mesDeTrabajo.datos().create({}, datosMes);

      response.$promise.then(
        function(response){
          if(response.success){
            $scope.cambiarMesDeTrabajo(response.mes);
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }          
        }
      );
    }


      $scope.selectAnio = function(){
          $scope.cargado = false;
          $rootScope.cargando = true;
          var datos = anio.datosCierre().get({anio:$scope.cierre.anio.nombre});
          datos.$promise.then(function(response){
            $scope.anios = response.anios;
            $scope.isNuevoAnio = response.isNuevoAnio;
            $scope.datos = response.datos;
            $scope.accesos = response.accesos;
            $scope.isLiquidaciones = response.isLiquidaciones;
            $scope.isCuentas = response.isCuentas;
            $rootScope.cargando = false;      
            $scope.cargado = true;  
            actualizarOptions();
          });
      };

  })
  .controller('FormTerminos', function ($scope, $uibModalInstance, objeto, $rootScope) {

    $scope.aceptar = function(){
      $uibModalInstance.close(objeto);
    }

  });
