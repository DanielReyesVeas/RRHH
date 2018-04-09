'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:LibroRemuneracionesCtrl
 * @description
 * # LibroRemuneracionesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('LibroRemuneracionesCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification, liquidacion) {    
    $anchorScroll();

    $scope.constantes = constantes;
    $scope.cargado = false;
    $scope.isLarge = false;

    $scope.data = [];

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = liquidacion.libroRemuneraciones().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.totales = response.totales;
        $rootScope.cargando = false;
        $scope.cargado = true;
        crearRows()
      });
    }

    cargarDatos(); 

    function crearRows(){
      var dato = {};
      for(var i=0,len=$scope.datos.length; i<len; i++){
        var dato = {};
        dato.rut = $scope.datos[i].rutFormatoTrabajador;
        dato.nombre = $scope.datos[i].nombreTrabajador;
        dato.datos = [];
        $scope.datos[i].index = i;
        dato.datos.push($scope.datos[i]);
        $scope.data.push(dato);
      }
    }    

    $scope.cambiarTamano = function(){
      if($scope.isLarge){
        $scope.isLarge = false;
      }else{
        $scope.isLarge = true;
      }
    }

    $scope.exportar = function(){
      $rootScope.cargando=true;
      var url = $scope.constantes.URL + 'libro-remuneraciones/excel/exportar';
      window.location.replace(url);
      $rootScope.cargando=false;
    }

    $scope.openExportar = function(tipo){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-exportar-libro-remuneraciones.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormExportarLibroRemuneracionesCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return $scope.datos;          
          },
          tipo: function () {
            return tipo;          
          }
        }
      });
     miModal.result.then(function (datos) {
        javascript:void(0)         
      }, function () {
        javascript:void(0)
      });
    }

  })
  .controller('FormExportarLibroRemuneracionesCtrl', function ($scope, tipo, $uibModalInstance, constantes, objeto, Notification, $rootScope, trabajador) {

    $scope.constantes = constantes;
    $scope.datos = angular.copy(objeto);
    $scope.objeto = { todosTrabajadores : true, todosConceptos : true };
    $scope.tipo = tipo;

    $scope.conceptos = [
      { id : 1, nombre : 'Sueldo Base', codigo : 'sueldo_base' },
      { id : 2, nombre : 'Dias Trabajados', codigo : 'dias_trabajados' },
      { id : 3, nombre : 'Inasistencias y Atrasos', codigo : 'inasistencias' },
      { id : 4, nombre : 'Horas Extra', codigo : 'horas_extra' },
      { id : 5, nombre : 'Sueldo', codigo : 'sueldo' },
      { id : 6, nombre : 'Salud', codigo : 'salud' },
      { id : 7, nombre : 'AFP', codigo : 'afp' },
      { id : 8, nombre : 'APV', codigo : 'apv' },
      { id : 9, nombre : 'Gratificación', codigo : 'gratificacion' },
      { id : 10, nombre : 'Impuesto a la Renta', codigo : 'impuesto' },
      { id : 11, nombre : 'Anticipos', codigo : 'anticipos' },
      { id : 12, nombre : 'Asignación Familiar', codigo : 'asignacion_familiar' },
      { id : 13, nombre : 'Haberes no Imponibles', codigo : 'no_imponibles' },
      { id : 14, nombre : 'Seguro de Cesantía', codigo : 'seguro_cesantia' },
      //{ id : 15, nombre : 'Otros Imponibles', codigo : 'otros_imponibles' },
      { id : 16, nombre : 'Otros Descuentos', codigo : 'otros_descuentos' },
      { id : 17, nombre : 'Total Haberes', codigo : 'total_haberes' },
      { id : 18, nombre : 'Total Imponibles', codigo : 'total_imponibles' },
      { id : 19, nombre : 'Total Descuentos', codigo : 'total_descuentos' },
      { id : 20, nombre : 'Alcance Líquido', codigo : 'sueldo_liquido' }
    ];


    function crearModels(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.datos[i].check = true;
      }         
      for(var i=0, len=$scope.conceptos.length; i<len; i++){
        $scope.conceptos[i].check = true;
      }         
    }    

    $scope.isSelected = function(){
      var boolDatos = false;
      var boolConceptos = false;

      for(var i=0,len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check){
          boolDatos = true;
          break;
        }
      }
      for(var i=0,len=$scope.conceptos.length; i<len; i++){
        if($scope.conceptos[i].check){
          boolConceptos = true;
          break;
        }
      }

      return (boolDatos && boolConceptos);
    }

    crearModels();

    $scope.selectTrabajadores = function(check){     
      if(!check){
        if($scope.objeto.todosTrabajadores){
          $scope.objeto.todosTrabajadores = false; 
        }
      }else{
        if(isSelected($scope.datos)){
          $scope.objeto.todosTrabajadores = true;
        }
      }
    }

    $scope.selectConceptos = function(check){     
      if(!check){
        if($scope.objeto.todosConceptos){
          $scope.objeto.todosConceptos = false; 
        }
      }else{
        if(isSelected($scope.conceptos)){
          $scope.objeto.todosConceptos = true;
        }
      }
    }

    function isSelected(datos){
      var bool = true;
      for(var i=0, len=datos.length; i<len; i++){
        if(!datos[i].check){
          bool = false;
          return bool;
        }
      }
      return bool;
    }

    $scope.selectAll = function(datos, all){      
      for(var i=0, len=datos.length; i<len; i++){
        datos[i].check = all;
      }
    }

    function descargar(obj){
      if(obj.excel){
        var url = $scope.constantes.URL + 'trabajadores/libro-remuneraciones/descargar-excel/' + obj.nombre;
        $uibModalInstance.close(obj.mensaje); 
        $rootScope.cargando=false;
        window.open(url, "_self");  
      }else{
        var url = $scope.constantes.URL + '/stories/' + obj.nombre;
        $uibModalInstance.close(obj.mensaje); 
        $rootScope.cargando=false;
        window.open(url, "_blank");  
      }          
    }

    $scope.generarExcel = function(excel){      
      $rootScope.cargando=true;

      var trabajadores = [];
      var conceptos = {};

      for(var i=0,len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check){
          trabajadores.push($scope.datos[i].idTrabajador);
        }
      }
      for(var i=0,len=$scope.conceptos.length; i<len; i++){
        conceptos[$scope.conceptos[i].codigo] = $scope.conceptos[i].check;
      }

      var obj = { trabajadores : trabajadores, conceptos : conceptos, tipo : tipo, excel : excel };
      var datos = trabajador.generarLibro().post({}, obj);
      datos.$promise.then(function(response){
        if(response.success){
          descargar(response);
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          $rootScope.cargando=false;
        }  
      }); 
    }

  });