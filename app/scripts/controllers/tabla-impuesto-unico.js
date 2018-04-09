'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TablaImpuestoUnicoCtrlhttp://localhost:9000/#/inicio
 * @description
 * # TablaImpuestoUnicoCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TablaImpuestoUnicoCtrl', function ($rootScope, $anchorScroll, $scope, tablaImpuestoUnico, moneda, Notification) {

    $anchorScroll();
    $scope.advertencia = "Recuerde que cualquier modificación en estos valores afecta directamente el pago de las cotizaciones previsionales del sistema. ¿Ud. se encuentra seguro y responsable de efectuar modificaciones?";
    $scope.confirmacion = "Los valores han sido modifcados. ¿Ud. se encuentra seguro y responsable cambiar los valores modificados?";  
    $scope.isEdit = false;
    $scope.isPesos = false;
    $scope.cargado = false;

    $scope.hide = function(s){
      console.log(s.keyCode)
    }

    $scope.inputDesde = [];
    $scope.inputHasta = [];
    $scope.inputFactor = [];
    $scope.inputCantidad = [];

    $scope.convertirUTM = function(valor){
      return moneda.convertirUTM(valor, true);
    }

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado=true;
      var datos = tablaImpuestoUnico.datos().get();
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
        $scope.inputDesde[i] = $scope.tabla[i].imponibleMensualDesde;
        $scope.inputHasta[i] = $scope.tabla[i].imponibleMensualHasta;
        $scope.inputFactor[i] = $scope.tabla[i].factor;
        $scope.inputCantidad[i] = $scope.tabla[i].cantidadARebajar;
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

      var tabla = [];
      for(var i=0, len=$scope.tabla.length; i<len; i++){
        tabla.push({ id : $scope.tabla[i].id, imponibleMensualDesde : $scope.inputDesde[i], imponibleMensualHasta : $scope.inputHasta[i], factor : $scope.inputFactor[i], cantidadARebajar : $scope.inputCantidad[i] });
      }
      
      $rootScope.cargando=true;
      var response;      
      response = tablaImpuestoUnico.modificar().post({}, tabla);

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

    $scope.cambiarPesos = function(){
      if($scope.isPesos){
        $scope.isPesos = false;
      }else{
        $scope.isPesos = true;        
      }
    }

  });
