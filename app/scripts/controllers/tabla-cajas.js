'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TablaCajasCtrl
 * @description
 * # TablaCajasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TablaCajasCtrl', function ($rootScope, $anchorScroll, $scope, tablaCaja, moneda, Notification) {

    $anchorScroll();
    $scope.advertencia = "Recuerde que cualquier modificación en estos valores afecta directamente el pago de las cotizaciones previsionales del sistema. ¿Ud. se encuentra seguro y responsable de efectuar modificaciones?";
    $scope.confirmacion = "Los valores han sido modifcados. ¿Ud. se encuentra seguro y responsable cambiar los valores modificados?";  
    $scope.isEdit = false;
    $scope.cargado = false;
    $scope.fonasa = 7;
    $scope.accidenteTrabajo = 0.95;

    $scope.input = [];

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado=true;
      var datos = tablaCaja.datos().get();
      datos.$promise.then(function(response){        
        $scope.tabla = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.cargado=true;
        crearModels();
        $scope.isEdit = false;
      })
    };

    cargarDatos();

    function crearModels(){
      for(var i=0, len=$scope.tabla.length; i<len; i++){
        $scope.input[i] = $scope.tabla[i].tasa;
      }
    }    

    $scope.editar = function(){
      $scope.isEdit = true;      
    }

    $scope.cancelar = function(){
      $scope.isEdit = false;   
      crearModels();   
    }

    $scope.guardar = function(){
      /*if(!$scope.isFila()){
        $scope.tabla.pop();
      }*/
      var tabla = [];
      for(var i=0, len=$scope.tabla.length; i<len; i++){
        tabla.push({ id : $scope.tabla[i].id, tasa : $scope.input[i] });
      }
      
      $rootScope.cargando=true;
      var response;      
      response = tablaCaja.modificar().post({}, tabla);

      response.$promise.then(
        function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
            cargarDatos();
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
        }
      )      
    }

  });
