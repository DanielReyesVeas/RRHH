'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ReajusteGlobalCtrl
 * @description
 * # ReajusteGlobalCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ReajusteGlobalCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification) {
    $anchorScroll();
    $scope.objeto = [];
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = trabajador.reajuste().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $scope.rmi = response.rmi;
        $rootScope.cargando = false;
        $scope.isSelect = false;
        crearModels();
        $scope.cargado = true;
      });
    };

    cargarDatos();

    function crearModels(){
      $scope.objeto.trabajador = [];
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.objeto.trabajador.push({ check : false });
      }         
    }
    
    $scope.select = function(index){
      if(!$scope.objeto.trabajador[index].check){
        if($scope.objeto.todos){
          $scope.objeto.todos = false; 
        }
        countSelected();
        $scope.isSelect = isThereSelected(); 
      }else{
        $scope.isSelect = true;
        countSelected();
      }
    }

    function isThereSelected(){
      var bool = false;
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.objeto.trabajador[i].check){
          bool = true;
          return bool;
        }
      }
      return bool;
    }

    function countSelected(){
      var count = 0;
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.objeto.trabajador[i].check){
          count++;
          $scope.mensaje = 'Se reajustarán los Sueldos de los ' + count + ' trabajadores seleccionados a ';
        }
      }
      if(count===1){
        count = $scope.datos[0].nombreCompleto;
        $scope.mensaje = 'Se reajustará el Sueldo de ' + count + ' a ';
      }
      return count;
    }

    $scope.selectAll = function(){
      if($scope.objeto.todos){
        var total = 0;
        for(var i=0, len=$scope.datos.length; i<len; i++){
          $scope.objeto.trabajador[i].check = true
          $scope.isSelect = true;
          total++;  
        }
        countSelected();
      }else{
        for(var i=0, len=$scope.datos.length; i<len; i++){
          $scope.objeto.trabajador[i].check = false
          $scope.isSelect = false;
        }
      }
    }    

    $scope.reajustar = function(trab){
      $rootScope.cargando=true;
      if(!trab){
        var trabajadoresReajuste = { trabajadores : [] };
        for(var i=0,len=$scope.objeto.trabajador.length; i<len; i++){
          if($scope.objeto.trabajador[i].check){
            trabajadoresReajuste.trabajadores.push({ id : $scope.datos[i].id });        
          }
        }
      }else{
        var trabajadoresReajuste = { trabajadores : [{ id : trab }] };
      }
      var datos = trabajador.reajustar().post({}, trabajadoresReajuste);
      datos.$promise.then(function(response){
        if(response.success){
          cargarDatos();
          Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
          cargarDatos()
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando = false;
      });
    }

  });
