'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:FactoresActualizacionCtrl
 * @description
 * # FactoresActualizacionCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('FactoresActualizacionCtrl', function ($rootScope, $anchorScroll, $scope, factorActualizacion, Notification) {

    $anchorScroll();
    $scope.advertencia = "Recuerde que cualquier modificación en estos valores afecta directamente el pago de las cotizaciones previsionales del sistema. <br />¿Ud. se encuentra seguro y responsable de efectuar modificaciones?";
    $scope.confirmacion = "Los valores han sido modifcados. <br />¿Ud. se encuentra seguro y responsable cambiar los valores modificados?";  
    $scope.isEdit = false;
    $scope.cargado = false;

    $scope.input = [];

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado=true;
      var datos = factorActualizacion.datos().get();
      datos.$promise.then(function(response){        
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.cargado=true;
        crearModels();
        $scope.isEdit = false;
      })
    };

    cargarDatos();


    function crearModels(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.input[i] = $scope.datos[i].porcentaje;
      }
    }    

    $scope.editar = function(){
      $scope.isEdit = true;      
    }

    $scope.cancelar = function(){
      $scope.isEdit = false;   
      crearModels();   
    }

    function calcularFactor(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].porcentaje!=$scope.input[i]){
          $scope.datos[i].factor = (($scope.input[i] / 100) + 1);
        }
      }
    }

    $scope.guardar = function(){

      var datos = [];
      calcularFactor();

      for(var i=0, len=$scope.datos.length; i<len; i++){
        datos.push({ id : $scope.datos[i].id, factor : $scope.datos[i].factor, porcentaje : $scope.input[i] });
      }
      
      $rootScope.cargando=true;
      var response;      
      response = factorActualizacion.modificar().post({}, datos);

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
