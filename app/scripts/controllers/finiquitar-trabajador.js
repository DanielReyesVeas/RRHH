'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:FiniquitarTrabajadorCtrl
 * @description
 * # FiniquitarTrabajadorCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('FiniquitarTrabajadorCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification, causalFiniquito) {
    $anchorScroll();
    $scope.activos = [];
    $scope.finiquitados = [];

    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = trabajador.trabajadoresFiniquitos().get();
      datos.$promise.then(function(response){
        $scope.activos = response.activos;
        $scope.accesos = response.accesos;
        $scope.finiquitados = response.finiquitados;
        $rootScope.cargando = false;      
        $scope.cargado = true;  
      });
    };

    cargarDatos();

    $scope.finiquitar = function(obj){
      $rootScope.cargando = true;
      var datos = causalFiniquito.datos().get();
      datos.$promise.then(function(response){
        openFiniquito(response.datos, obj);
        $rootScope.cargando = false;      
      });
    };

    function openFiniquito(datos, obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        size: 'md',
        templateUrl: 'views/forms/form-finiquitar-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormFiniquitarTrabajadorCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          causales: function () {
            return datos;          
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

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.finiquitos().get({sid: sid});
      datos.$promise.then(function(response){
        openDetalle(response);
        $rootScope.cargando=false;
      });
    }

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-finiquitos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleFiniquitosCtrl',
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
        cargarDatos(); 
      });
    };


  })
  .controller('FormDetalleFiniquitosCtrl', function ($rootScope, $uibModal, $filter, $scope, $uibModalInstance, objeto, trabajador, finiquito, Notification, causalFiniquito, constantes) {
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);    
    $scope.constantes = constantes;

    function cargarDatos(tra){
      $rootScope.cargando = true;
      var datos = trabajador.finiquitos().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.trabajador = response.datos;
        $rootScope.cargando = false;
      });
    }

    $scope.eliminar = function(finiq, tra){
      $rootScope.cargando=true;
      $scope.result = finiquito.datos().delete({ sid: finiq.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          $rootScope.cargando=false;
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(tra);
        }
      })
    }

    $scope.frame = function(obj){
      var url = $scope.constantes.URL + 'trabajadores/documento/obtener/' + obj.documento.sid;
      window.open(url);
    }

    $scope.editar = function(fin, tra){
      $rootScope.cargando = true;
      var datos = finiquito.datos().get({sid: fin.sid});
      datos.$promise.then(function(response){
        openFiniquito(response.causales, response.datos);
        $rootScope.cargando = false;      
      });
    }

    function openFiniquito(datos, obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-finiquitar-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormFiniquitarTrabajadorCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          causales: function () {
            return datos;          
          }
        }
      });
     miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});  
        cargarDatos(obj.tra);        
      }, function () {
        javascript:void(0)
      });
    };

  })
  .controller('FormDetallesFiniquitoCtrl', function ($rootScope, $scope, $uibModal, $uibModalInstance, objeto, titulo, $filter) {

    $scope.nombreCompleto = angular.copy(titulo.nombreCompleto);
    $scope.concepto = angular.copy(titulo.concepto);
    $scope.index = angular.copy(objeto.index);
    $scope.datos = angular.copy(objeto.detalle);    
    $scope.sueldoNormal = angular.copy(objeto.sueldoNormal);
    $scope.sueldoVariable = angular.copy(objeto.sueldoVariable);
    $scope.suma = angular.copy(objeto.suma);    
    
    function crearModels(){
      if($scope.concepto==='Imponibles'){       
        $scope.objeto = { todos : true };
        $scope.datos.imponibles.sueldo.edit = false;
        $scope.datos.imponibles.gratificacion.edit = false;
        if(!$scope.datos.imponibles.sueldo.check || !$scope.datos.imponibles.gratificacion.check || !$scope.datos.imponibles.haberes.check){
          $scope.objeto.todos= false;
        }
      }else{
        $scope.data = [];
        if($scope.concepto==='No Imponibles'){
          for(var i=0,len=$scope.datos.length; i<len; i++){
            $scope.data.push({ haberes : $scope.datos[i].noImponibles.haberes.haberes, mes : $scope.datos[i].mes, suma : $scope.datos[i].noImponibles.haberes.suma });
          }
        }else{
          $scope.data.push({ haberes : $scope.datos.haberes.haberes, mes : $scope.datos.mes, suma : $scope.datos.haberes.suma });
        }
        $scope.objeto = [];
        for(var i=0,len=$scope.data.length; i<len; i++){
          $scope.objeto.push({ todos : true });
          for(var j=0,leng=$scope.data[i].haberes.length; j<leng; j++){     
            $scope.data[i].haberes[j].edit = false;       
            if(!$scope.data[i].haberes[j].check){
              $scope.objeto[i].todos= false;
            }
          }
        }
      }
    }
    
    crearModels();

    function sumar(index){
      var suma = 0;
      if(index===null){   
        if($scope.datos.imponibles.sueldo.check){
          suma = (suma + $scope.datos.imponibles.sueldo.monto);   
        }
        if($scope.datos.imponibles.gratificacion.check){
          suma = (suma + $scope.datos.imponibles.gratificacion.monto);
        }
        if($scope.datos.imponibles.haberes.check){          
          suma = (suma + $scope.datos.imponibles.haberes.suma);
        }
      }else{
        for(var i=0, len=$scope.data[index].haberes.length; i<len; i++){
          if($scope.data[index].haberes[i].check){
            suma = (suma + $scope.data[index].haberes[i].monto);
          }
        } 
      }
      return suma;
    }

    function promediar(){
      var suma = 0;
      for(var i=0, len=$scope.data.length; i<len; i++){
        suma = (suma + $scope.data[i].suma);
      } 
      if($scope.sueldoVariable){
        $scope.suma = Math.round((suma / $scope.data.length));
      }else{
        $scope.suma = suma;
      }      
    }

    function haberesCheck(index){
      var bool = true;
      for(var i=0,len=$scope.data[index].haberes.length; i<len; i++){
        if(!$scope.data[index].haberes[i].check){
          bool = false;
          break;
        }
      }
      return bool;
    }

    $scope.select = function(check, index){      
      if($scope.concepto==='Imponibles'){
        if(check){
          if($scope.datos.imponibles.sueldo.check && $scope.datos.imponibles.gratificacion.check && $scope.datos.imponibles.haberes.check){
            $scope.objeto.todos = true; 
          }
        }else{
          if(!$scope.datos.imponibles.sueldo.check || !$scope.datos.imponibles.gratificacion.check || !$scope.datos.imponibles.haberes.check){
            $scope.objeto.todos = false; 
          }        
        }
        $scope.datos.imponibles.rentaImponible.monto = sumar();
      }else{
        if(!check){
          if($scope.objeto[index].todos){
            $scope.objeto[index].todos = false; 
          }
        }else{
          if(haberesCheck(index)){            
            $scope.objeto[index].todos = true;
          }
        }
        $scope.data[index].suma = sumar(index);
        promediar();
      }
    }

    $scope.selectAll = function(index){
      if($scope.concepto==='Imponibles'){
        $scope.datos.imponibles.sueldo.check = $scope.objeto.todos;
        $scope.datos.imponibles.gratificacion.check = $scope.objeto.todos;
        $scope.datos.imponibles.haberes.check = $scope.objeto.todos;
        $scope.datos.imponibles.rentaImponible.monto = sumar();
      }else{
        for(var i=0, len=$scope.data[index].haberes.length; i<len; i++){
          $scope.data[index].haberes[i].check = $scope.objeto[index].todos;
        }  
        $scope.data[index].suma = sumar(index);
        promediar();
      }
    }

    $scope.aceptar = function(){
      if($scope.concepto==='Imponibles'){
        var datos = $scope.datos;
        var suma = $scope.datos.imponibles.rentaImponible.monto;
      }else{
        var datos = $scope.data;
        var suma = $scope.suma;
      }
      $uibModalInstance.close({ datos : datos, concepto : $scope.concepto, suma : suma, index : $scope.index });
    }

    function recibirModels(obj){
      var check = false;
      $scope.datos.imponibles.haberes.suma = obj.suma;
      for(var i=0,len=obj.datos[0].haberes.length; i<len; i++){
        $scope.datos.imponibles.haberes.haberes[i].check = obj.datos[0].haberes[i].check;
        if(obj.datos[0].haberes[i].check){
          check = true;
        }
      }
      $scope.datos.imponibles.haberes.check = check;
      $scope.datos.imponibles.rentaImponible.monto = sumar();
    }

    $scope.detalles = function(){
      $scope.datos.imponibles.mes = $scope.datos.mes;
      var concepto = { detalle : $scope.datos.imponibles, suma : $scope.datos.imponibles.haberes.suma, sueldoVariable : $scope.sueldoVariable, sueldoNormal : $scope.sueldoNormal };
      var titulo = { nombreCompleto : $scope.nombreCompleto, concepto : 'Haberes Imponibles' };
      openDetalles(concepto, titulo);
    }

    function openDetalles(obj, titulo){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalles-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetallesFiniquitoCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          titulo: function () {
            return titulo;          
          }
        }
      });
      miModal.result.then(function (obj) {
        recibirModels(obj);
        $scope.suma = sumar();
      }, function () {
        javascript:void(0);
      });
    };

    function closeEdit(){
      if($scope.concepto==="Imponibles"){
        $scope.datos.imponibles.sueldo.edit = false;
        $scope.datos.imponibles.gratificacion.edit = false;
      }else{
        for(var i=0,len=$scope.data.length; i<len; i++){
          for(var j=0,leng=$scope.data[i].haberes.length; j<leng; j++){
            $scope.data[i].haberes[j].edit = false;
          }   
        }
      }
    }

    $scope.edit = function(obj, index){
      var bool = !obj.edit;
      closeEdit();
      obj.edit = bool;
      if($scope.concepto==="Imponibles"){
        $scope.datos.imponibles.rentaImponible.monto = sumar();
      }else if($scope.concepto==="No Imponibles"){
        $scope.data[index].suma = sumar(index);
        promediar();
      }else{
        $scope.data[index].suma = sumar(index);
      }
    }

  })
  .controller('FormAgregarOtroFiniquitoCtrl', function ($rootScope, $scope, $uibModal, $uibModalInstance, objeto, $filter, otro) {

    $scope.trabajador = angular.copy(objeto);
    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];
    if(otro){
      $scope.isEdit = false;
      $scope.isOtro = false;
      $scope.otro = angular.copy(otro);
      sumar();
    }else{
      $scope.monedaActual = 'pesos';
      $scope.isOtro = false;
      $scope.isOK = false;
      $scope.otro = { detalles : [] };
      $scope.suma = 0;
    }
    
    $scope.cambiarMoneda = function(){
      switch($scope.otro.moneda){
        case '$':
          $scope.monedaActual = 'pesos'; 
          break;
        case 'UF':
          $scope.monedaActual = 'UF'; 
          break;
        case 'UTM':
          $scope.monedaActual = 'UTM'; 
          break;
      }    
    }

    function sumar(){
      var suma = 0;
      for(var i=0,len=$scope.otro.detalles.length; i<len; i++){
        suma = (suma + ($scope.otro.detalles[i].monto - 0));
      }
      $scope.suma = suma;
    }

    $scope.agregarDetalle = function(){
      if($scope.isOtro){
        $scope.isOtro = false;
        $scope.isEdit = false;
      }else{
        $scope.titulo = 'Nuevo detalle';
        $scope.detalle = { nombre : null, monto : null, moneda : $scope.monedas[0].nombre };
        $scope.isOtro = true;
      }
      $scope.check();
    }

    $scope.check = function(){
      if($scope.otro.detalles.length > 0 && $scope.otro.nombre && !$scope.isOtro){
        $scope.isOK = true;
      }else{
        $scope.isOK = false;        
      }
    }

    $scope.editar = function(detalle){
      $scope.check();
      $scope.titulo = 'Modificar detalle';
      $scope.index = $scope.otro.detalles.indexOf(detalle);
      $scope.detalle = angular.copy($scope.otro.detalles[$scope.index]);
      $scope.isOtro = true;
      $scope.isEdit = true;
    }

    $scope.update = function(detalle){
      $scope.otro.detalles[$scope.index].nombre = detalle.nombre;
      $scope.otro.detalles[$scope.index].moneda = detalle.moneda;
      $scope.otro.detalles[$scope.index].monto = detalle.monto;
      $scope.isOtro = false;
      $scope.isEdit = false;
      $scope.check();      
      sumar();
    }

    $scope.guardar = function(detalle){
      $scope.otro.detalles.push(detalle);
      $scope.isOtro = false;
      $scope.check();
      sumar();
    }

    $scope.eliminar = function(detalle){
      var index = $scope.otro.detalles.indexOf(detalle);
      $scope.otro.detalles.splice(index,1);
      $scope.check();
      sumar();
    }

    $scope.agregarConcepto = function(){
      $uibModalInstance.close($scope.otro);
    }

  })
  .controller('FormFiniquitoCtrl', function ($rootScope, $scope, $uibModal, $uibModalInstance, objeto, $filter, clausulaFiniquito, trabajador) {
    
    $scope.trabajador = angular.copy(objeto.trabajador);
    $scope.plantillasFiniquitos = angular.copy(objeto.plantillasFiniquitos);
    $scope.fecha = angular.copy(objeto.fecha);
    $scope.idCausal = angular.copy(objeto.idCausal);

    $scope.imponibles = angular.copy(objeto.imponibles);
    $scope.noImponibles = angular.copy(objeto.noImponibles);
    $scope.detalle = angular.copy(objeto.detalle);
    $scope.meses = angular.copy(objeto.meses);
    $scope.rows = angular.copy(objeto.meses + 1);
    $scope.sueldoNormal = angular.copy(objeto.sueldoNormal);
    $scope.sueldoVariable = angular.copy(objeto.sueldoVariable);
    $scope.indemnizacion = angular.copy(objeto.indemnizacion);
    $scope.vacaciones = angular.copy(objeto.vacaciones);
    $scope.mesAviso = { mesAviso : angular.copy(objeto.mesAviso) };
    $scope.suma = ($scope.imponibles.suma + $scope.noImponibles.suma + $scope.indemnizacion.monto + $scope.vacaciones.monto);
    $scope.objeto = { todos : true };
    $scope.otros = [];
    
    if($scope.noImponibles.noImponibles){
      $scope.rows = ($scope.rows + 1);
      if($scope.sueldoVariable){
        $scope.rows = ($scope.rows + 1);
      }
    }else{             
      if($scope.sueldoVariable){
        $scope.rows = ($scope.rows + 1);
      }
    }
    function crearModels(){
      if($scope.mesAviso.mesAviso){
        $scope.mesAviso.check = true;
        for(var i=0,len=$scope.detalle.length; i<len; i++){
          for(var j=0,leng=$scope.detalle[i].imponibles.haberes.haberes.length; j<leng; j++){
            $scope.detalle[i].imponibles.haberes.haberes[j].check = true;
            $scope.detalle[i].imponibles.haberes.haberes[j].edit = false;
          }   
          for(var j=0, leng=$scope.detalle[i].noImponibles.haberes.haberes.length; j<leng; j++){
            $scope.detalle[i].noImponibles.haberes.haberes[j].check = true;
            $scope.detalle[i].noImponibles.haberes.haberes[j].edit = false;
          }   
          $scope.detalle[i].imponibles.rentaImponible.check = true;
          $scope.detalle[i].imponibles.haberes.check = true;
          $scope.detalle[i].imponibles.sueldo.check = true;
          $scope.detalle[i].imponibles.gratificacion.check = true;
        }
        /*if($scope.imponibles.suma>0){
          $scope.imponibles.check = true;        
        }else{
          $scope.imponibles.check = false;                
        }*/        
      }else{
        $scope.mesAviso.check = false;
      }
      if($scope.noImponibles.noImponibles){
        if($scope.noImponibles.suma>0){
          $scope.noImponibles.check = true;        
        }else{
          $scope.noImponibles.check = false;                
        }
      }else{        
        $scope.noImponibles.check = false;                
      }
      if($scope.indemnizacion.indemnizacion){
        $scope.indemnizacion.check = true;        
        $scope.indemnizacion.edit = false;        
      }else{
        $scope.indemnizacion.check = false;                
      }
      if($scope.vacaciones.vacaciones){
        $scope.vacaciones.check = true;        
        $scope.vacaciones.edit = false;        
      }else{
        $scope.vacaciones.check = false;                
      }
    }

    /*function crearModels(){
      if($scope.mesAviso){
        $scope.sueldo.check = true;
        $scope.mesAviso.check = true;
        $scope.gratificacion.check = true;
        for(var i=0,len=$scope.detalle.length; i<len; i++){
          for(var j=0,leng=$scope.detalle[i].imponibles.haberes.length; j<leng; j++){
            $scope.detalle[i].imponibles.haberes[j].check = true;
          }   
          for(var j=0, leng=$scope.detalle[i].noImponibles.haberes.length; j<leng; j++){
            $scope.detalle[i].noImponibles.haberes[j].check = true;
          }   
          $scope.detalle[i].sueldo.check = true;
          $scope.detalle[i].gratificacion.check = true;
        }
        if($scope.imponibles.suma>0){
          $scope.imponibles.check = true;        
        }else{
          $scope.imponibles.check = false;                
        }
        if($scope.noImponibles.noImponibles){
          if($scope.noImponibles.suma>0){
            $scope.noImponibles.check = true;        
          }else{
            $scope.noImponibles.check = false;                
          }
        }
      }
      if($scope.indemnizacion.indemnizacion){
        $scope.indemnizacion.check = true;        
      }else{
        $scope.indemnizacion.check = false;                
      }
      if($scope.vacaciones.vacaciones){
        $scope.vacaciones.check = true;        
      }else{
        $scope.vacaciones.check = false;                
      }
    }*/

    function checkClausulas(){
      var bool = true;
      for(var i=0,len=$scope.clausulas.length; i<len; i++){
        if(!$scope.clausulas[i].check){
          bool = false;
          break;
        }
      }
      return bool;
    }

    crearModels();  

    $scope.selectAllClausulas = function(){
      for(var i=0, len=$scope.clausulas.length; i<len; i++){
        $scope.clausulas[i].check = $scope.clausulas.todos;
      }
    }

    $scope.selectClausulas = function(check){
      if(!check){
        if($scope.clausulas.todos){
          $scope.clausulas.todos = false; 
        }     
      }else{
        if(checkClausulas()){
          $scope.clausulas.todos = true;           
        }
      }
    }

    function crearModelsClausulas(){
      for(var i=0, len=$scope.clausulas.length; i<len; i++){
        $scope.clausulas[i].check = true;
      }         
      $scope.clausulas.todos = true;
      $scope.cargado = true;
    }    

    $scope.seleccionarPlantilla = function(){
      $scope.cargado=false;
      $rootScope.cargando = true;
      var datos = clausulaFiniquito.plantilla().get({sid: $scope.finiquito.plantillaFiniquito.sid});
      datos.$promise.then(function(response){
        $scope.clausulas = response.datos;
        $scope.cargado=true;
        $rootScope.cargando = false;
        crearModelsClausulas();
      });
    }

    function sumar(){
      var suma = 0;
      suma = (suma + promediar());
      if($scope.noImponibles.check){
        suma = (suma + $scope.noImponibles.suma);
      }
      if($scope.indemnizacion.check){
        suma = (suma + $scope.indemnizacion.monto);
      }
      if($scope.vacaciones.check){
        suma = (suma + $scope.vacaciones.monto);
      }
      if($scope.otros.length>0){

        for(var i=0,len=$scope.otros.length; i<len; i++){
          for(var j=0,leng=$scope.otros[i].detalles.length; j<leng; j++){
            if($scope.otros[i].detalles[j].check){
              suma = (suma + ($scope.otros[i].detalles[j].monto - 0));          
            }
          }
        }
      }
      return suma;
    }

    function promediar(){
      var suma = 0;
      for(var i=0, len=$scope.detalle.length; i<len; i++){
        if($scope.detalle[i].imponibles.rentaImponible.check){
          suma = (suma + $scope.detalle[i].imponibles.rentaImponible.monto);
        }
      } 
      return Math.round((suma / $scope.detalle.length));
    }

    function recibirOtros(otros){      
      $scope.otros.push(angular.copy(otros));
      for(var i=0,len=$scope.otros.length; i<len; i++){
        $scope.otros[i].check = true;
        $scope.otros[i].row = ($scope.otros[i].detalles.length + 1);
        for(var j=0,leng=$scope.otros[i].detalles.length; j<leng; j++){
          $scope.otros[i].detalles[j].check = true;
        }
      }
      $scope.suma = sumar();
    } 

    $scope.selectOtro = function(index){
      var bool = $scope.otros[index].check;
      for(var i=0,len=$scope.otros[index].detalles.length; i<len; i++){
        $scope.otros[index].detalles[i].check = bool;
      }
      $scope.suma = sumar();
    }

    $scope.selectDetalle = function(index, detalle){
      var bool = false;
      if(detalle){
        if(!$scope.otros[index].check){
          $scope.otros[index].check = true;
        }
      }else{
        if($scope.otros[index].check){
          for(var i=0,len=$scope.otros[index].detalles.length; i<len; i++){
            if($scope.otros[index].detalles[i].check){
              bool = true;
              break;
            }
          }
          $scope.otros[index].check = bool;
        }
      }
      $scope.suma = sumar();
    }

    function openOtro(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-agregar-otro-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAgregarOtroFiniquitoCtrl',
        resolve: {
          objeto: function () {
            return $scope.trabajador;          
          },
          otro: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (obj) {
        recibirOtros(obj);
        $scope.suma = sumar();
      }, function () {
        javascript:void(0);
      });
    }

    $scope.agregarOtro = function(){
      openOtro();
    }

    $scope.editar = function(otro){
      openOtro(otro);
    }

    $scope.eliminar = function(otro){
      var index = $scope.otros.indexOf(otro);
      $scope.otros.splice(index,1);
      $scope.suma = sumar();
    }

    function closeEdit(){
      $scope.indemnizacion.edit = false;
      $scope.vacaciones.edit = false;
    }

    $scope.edit = function(obj){
      var bool = !obj.edit;
      closeEdit();
      obj.edit = bool;
      $scope.suma = sumar();
    }

    $scope.detalles = function(det, tipo, index){
      var suma = 0;
      if(tipo==='Imponibles'){
        suma = $scope.imponibles.suma;
      }else if(tipo==='No Imponibles'){
        suma = $scope.noImponibles.suma;
      }
      var concepto = { detalle : det, suma : suma, sueldoVariable : $scope.sueldoVariable, sueldoNormal : $scope.sueldoNormal, index : index };
      var titulo = { nombreCompleto : $scope.trabajador.nombreCompleto, concepto : tipo };
      openDetalles(concepto, titulo);
    }

    function recibirModels(obj){
      if(obj.concepto == 'Imponibles'){
        var check = false;
        var index = obj.index;
        $scope.detalle[index].imponibles.rentaImponible.monto = obj.suma;
        $scope.detalle[index].imponibles.sueldo.check = obj.datos.imponibles.sueldo.check;
        $scope.detalle[index].imponibles.gratificacion.check = obj.datos.imponibles.gratificacion.check;
        $scope.detalle[index].imponibles.haberes.check = obj.datos.imponibles.haberes.check;
        if(!$scope.detalle[index].imponibles.sueldo.check && !$scope.detalle[index].imponibles.gratificacion.check && !$scope.detalle[index].imponibles.haberes.check){
          $scope.detalle[index].imponibles.rentaImponible.check = false;
        }        
      }else if(obj.concepto == 'No Imponibles'){
        var check = false;
        $scope.noImponibles.suma = obj.suma;
        for(var i=0,len=obj.datos.length; i<len; i++){
          $scope.detalle[i].noImponibles.haberes.suma = obj.datos[i].suma;
          for(var j=0,leng=obj.datos[i].haberes.length; j<leng; j++){
            $scope.detalle[i].noImponibles.haberes.haberes[j].check = obj.datos[i].haberes[j].check;
            if(obj.datos[i].haberes[j].check){
              check = true;
            }
          }
        }    
        $scope.noImponibles.check = check;
      }
      /*if($scope.noImponibles.noImponibles){
        if($scope.imponibles.check || $scope.noImponibles.check){
          $scope.mesAviso.check = true;
        }
        if(!$scope.imponibles.check && !$scope.noImponibles.check){
          $scope.mesAviso.check = false;
        }
      }else{
        if($scope.imponibles.check){
          $scope.mesAviso.check = true;
        }
        if(!$scope.imponibles.check && !$scope.sueldo.check){
          $scope.mesAviso.check = false;
        }
      }*/
      $scope.suma = sumar();
    }

    function openDetalles(obj, titulo){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalles-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetallesFiniquitoCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          titulo: function () {
            return titulo;          
          }
        }
      });
      miModal.result.then(function (obj) {
        recibirModels(obj);
        $scope.suma = sumar();
      }, function () {
        javascript:void(0);
      });
    };    

    $scope.selectMesAviso = function(check){
      if(!check){
        if($scope.objeto.todos){
          $scope.objeto.todos = false;           
        }
        if($scope.noImponibles.noImponibles){
          $scope.noImponibles.check = false;
        }
      }else{
        if($scope.noImponibles.noImponibles){
          if($scope.noImponibles.suma>0){
            $scope.noImponibles.check = true;
          }
        }
        if(!$scope.objeto.todos && $scope.indemnizacion.check && $scope.vacaciones.check){
          $scope.objeto.todos = true; 
        }
      }
      for(var i=0,len=$scope.detalle.length; i<len; i++){
        $scope.detalle[i].imponibles.rentaImponible.check = check;
      }
      $scope.imponibles.suma = promediar();
      $scope.suma = sumar();
    }

    function rentaImponibleCheck(){
      var bool = false;
      for(var i=0,len=$scope.detalle.length; i<len; i++){
        if($scope.detalle[i].imponibles.rentaImponible.check){
          bool = true;
          break;
        }
      }
      return bool;
    }

    function rentaImponibleUnCheck(){
      var bool = true;
      for(var i=0,len=$scope.detalle.length; i<len; i++){
        if($scope.detalle[i].imponibles.rentaImponible.check){
          bool = false;
          break;
        }
      }
      return bool;      
    }

    $scope.select = function(check){
      if(check){
        if(rentaImponibleCheck()){
          $scope.mesAviso.check = true;          
        }
        if($scope.mesAviso.check && $scope.indemnizacion.check && $scope.vacaciones.check){
          $scope.objeto.todos = true; 
        }
      }else{
        if(rentaImponibleUnCheck() && !$scope.noImponibles.check){
          $scope.mesAviso.check = false;
        }
        if($scope.objeto.todos && (!$scope.mesAviso.check || !$scope.indemnizacion.check || !$scope.vacaciones.check)){
          $scope.objeto.todos = false; 
        }
      }
      if($scope.sueldoVariable){
        $scope.imponibles.suma = promediar();
      }
      $scope.suma = sumar();
    }

    $scope.selectAll = function(){
      if($scope.objeto.todos){
        $scope.indemnizacion.check = true;
        $scope.vacaciones.check = true;
        $scope.mesAviso.check = true;
        $scope.selectMesAviso(true);
      }else{
        $scope.indemnizacion.check = false;
        $scope.vacaciones.check = false;
        $scope.mesAviso.check = false;
        $scope.selectMesAviso(false);
      }
      $scope.suma = sumar();
    }    

    $scope.generar = function(){
      var clausulas = [];
      for(var i=0,len=$scope.clausulas.length; i<len; i++){
        if($scope.clausulas[i].check){
          clausulas.push($scope.clausulas[i]);
        }
      }
      var finiq = { sidTrabajador : $scope.trabajador.sid, sueldoNormal : $scope.sueldoNormal, sueldoVariable : $scope.sueldoVariable, mesAviso : { mesAviso : angular.copy($scope.mesAviso.check), meses : $scope.meses, sueldo : $scope.sueldo, gratificacion : $scope.gratificacion, imponibles : $scope.imponibles, noImponibles : $scope.noImponibles }, indemnizacion : angular.copy($scope.indemnizacion), vacaciones : angular.copy($scope.vacaciones), detalle : $scope.detalle, sidPlantilla : $scope.finiquito.plantillaFiniquito.sid, clausulas : clausulas, idCausal : $scope.idCausal, fecha : $scope.fecha, totalFiniquito : $scope.suma, noImponibles : $scope.noImponibles.noImponibles, otros : $scope.otros };
      finiq.mesAviso.mesAviso = angular.copy($scope.mesAviso.check);
      finiq.indemnizacion.indemnizacion = angular.copy($scope.indemnizacion.check);
      finiq.vacaciones.vacaciones = angular.copy($scope.vacaciones.check);
      $rootScope.cargando=true;
      var datos = trabajador.finiquito().post({}, finiq);
      datos.$promise.then(function(response){
        $rootScope.cargando=false;
        openGenerarFiniquito(response);
      });
    }

    function openGenerarFiniquito(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-generar-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormGenerarFiniquitoCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (obj) {
        $uibModalInstance.close(obj);
      }, function () {
        javascript:void(0);
      });
    }

  })
  .controller('FormGenerarFiniquitoCtrl', function ($scope, $http, $rootScope, $uibModalInstance, objeto, $uibModal, $filter, finiquito) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.trabajador = angular.copy(objeto.trabajador);
    $scope.causal = angular.copy(objeto.causal);
    $scope.finiquito = angular.copy(objeto.datos);
    $scope.fecha = angular.copy(objeto.fecha);
    $scope.plantilla = angular.copy(objeto.plantilla);
    $scope.indemnizacion = angular.copy(objeto.indemnizacion);
    $scope.vacaciones = angular.copy(objeto.vacaciones);
    $scope.mesAviso = angular.copy(objeto.mesAviso);
    $scope.sueldoNormal = angular.copy(objeto.sueldoNormal);
    $scope.sueldoVariable = angular.copy(objeto.sueldoVariable);
    $scope.totalFiniquito = angular.copy(objeto.totalFiniquito);

    $scope.ingresar = function(){

      var finiq = { plantilla_finiquito_id : $scope.plantilla.id, totalFiniquito : $scope.totalFiniquito, noImponibles : $scope.mesAviso.noImponibles.suma, mesAviso : $scope.mesAviso.imponibles.suma, vacaciones : $scope.vacaciones, indemnizacion : $scope.indemnizacion, sueldoNormal : $scope.sueldoNormal, sueldoVariable : $scope.sueldoVariable, causal : $scope.causal, trabajador : $scope.trabajador, encargado_id : $scope.trabajador.id, empresa : $scope.empresa, fecha : $scope.fecha, folio : 4548452, cuerpo : $scope.finiquito.cuerpo };
      $rootScope.cargando=true;
      var response;
      response = finiquito.datos().create({}, finiq);
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
      )
    }

    $scope.tinymceOptions = {
        resize: false,
        width: 800,  // I *think* its a number and not '400' string
        height: 500,
        plugins: ["noneditable","save","textcolor","preventdelete"],
        entity_encoding : "raw",
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

  })
  .controller('FormAdvertenciaFiniquitoCtrl', function ($scope, $http, $rootScope, $uibModalInstance, objeto, $uibModal, $filter) {

    $scope.titulo = 'Cálculo Finiquito';
    $scope.mensaje = angular.copy(objeto.mensaje);
    $scope.mensaje2 = angular.copy(objeto.mensaje2);
    $scope.errores = angular.copy(objeto.errores);
    $scope.isOK = false;
    $scope.isExclamation = true;
    $scope.cancel = 'Cerrar';

    $scope.cerrar = function(){
      $uibModalInstance.dismiss('cerrar');
    }

  })
  .controller('FormFiniquitarTrabajadorCtrl', function ($rootScope, $uibModal, $scope, $uibModalInstance, objeto, causalFiniquito, finiquito, Notification, causales, $filter, fecha) {

    $scope.causales = angular.copy(causales); 
    var mesActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
      
    $scope.meses = [ 
            { id : 2, nombre : '2 meses' },
            { id : 3, nombre : '3 meses' },
            { id : 4, nombre : '4 meses' },
            { id : 5, nombre : '5 meses' },
            { id : 6, nombre : '6 meses' },
            { id : 7, nombre : '7 meses' },
            { id : 8, nombre : '8 meses' },
            { id : 9, nombre : '9 meses' },
            { id : 10, nombre : '10 meses' },
            { id : 11, nombre : '11 meses' },
            { id : 12, nombre : '12 meses' }
    ]; 
    $scope.anios = [ 
            { id : 11, nombre : '11 años' },
            { id : 12, nombre : '12 años' },
            { id : 13, nombre : '13 años' },
            { id : 14, nombre : '14 años' },
            { id : 15, nombre : '15 años' },
            { id : 16, nombre : '16 años' },
            { id : 17, nombre : '17 años' },
            { id : 18, nombre : '18 años' },
            { id : 19, nombre : '19 años' },
            { id : 20, nombre : '20 años' },
            { id : 21, nombre : 'Sin Tope' }
    ];     

    if(objeto.trabajador){
      $scope.trabajador = angular.copy(objeto.trabajador);  
      $scope.finiquito = angular.copy(objeto.finiquito);  
      $scope.finiquito.causal = $filter('filter')( $scope.causales, {id :  $scope.finiquito.causal.id }, true )[0];
      $scope.finiquito.fecha = fecha.convertirFecha($scope.finiquito.fecha);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Finiquito';
    }else{
      $scope.trabajador = angular.copy(objeto);
      $scope.monedaActual = 'pesos';
      $scope.finiquito = { fecha : fecha.fechaActiva(), sueldoNormal : true, sueldoVariable : false, vacaciones : false, vacacionesManual : false, mesAviso : false, gratificacionMesAviso : false, noImponibles : false, indemnizacion : false, gratificacionIndemnizacion : false, meses : $scope.meses[1], tope : $scope.anios[0] };

      $scope.isEdit = false;
      $scope.titulo = 'Finiquitar Trabajador';
    }    
    
    $scope.fnAntiguedad = function(){
      return function(item) {
        if(item.id < $scope.trabajador.mesesAntiguedad){
          return true;
        }else{
          return false;
        }
      }
    }

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = causalFiniquito.datos().get();
      datos.$promise.then(function(response){
        $scope.causales = response.datos;
        $rootScope.cargando = false;      
      });
    };        

    $scope.cambiarSueldo = function(sueldo){
      if(sueldo === 'normal'){
        if($scope.finiquito.sueldoNormal){
          $scope.finiquito.sueldoVariable = false;
        }else{
          $scope.finiquito.sueldoVariable = true;
        }
      }
      if(sueldo === 'variable'){
        if($scope.finiquito.sueldoVariable){
          $scope.finiquito.sueldoNormal = false;
        }else{
          $scope.finiquito.sueldoNormal = true;
        }
      }
    }    

    $scope.finiquitar = function(finiq, trab){
      if(finiq.fecha==fecha.fechaActiva()){
        finiq.fecha = fecha.convertirFecha(fecha.convertirFechaFormato(finiq.fecha));
      }
      var datosFiniquito = { idTrabajador : trab.id, fecha : finiq.fecha, idCausalFiniquito : finiq.causal.id, vacaciones : finiq.vacaciones, vacacionesManual : finiq.vacacionesManual, diasVacaciones : finiq.diasVacaciones, meses : finiq.meses, tope : finiq.tope, sueldoNormal : finiq.sueldoNormal, sueldoVariable : finiq.sueldoVariable, mesAviso : finiq.mesAviso, indemnizacion : finiq.indemnizacion };
      $rootScope.cargando=true;
      var datos;
      if( finiq.sid ){
        datos = finiquito.datos().update({sid:finiq.sid}, datosFiniquito);
      }else{
        datos = finiquito.datos().create({}, datosFiniquito);
      }
      datos.$promise.then(function(response){
        if(response.success){
          $uibModalInstance.close({mensaje : response.mensaje, tra : trab.sid });
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando = false;
      });
    }

    $scope.calcular = function(fin){
      var detalles = { idTrabajador : $scope.trabajador.id, fecha : fecha.convertirFechaFormato(fin.fecha), indemnizacion : fin.indemnizacion, gratificacionIndemnizacion : fin.gratificacionIndemnizacion, mesAviso : fin.mesAviso, gratificacionMesAviso : fin.gratificacionMesAviso, noImponibles : fin.noImponibles, sueldoNormal : fin.sueldoNormal, sueldoVariable : fin.sueldoVariable, vacaciones : fin.vacaciones, vacacionesManual : fin.vacacionesManual, diasVacaciones : fin.diasVacaciones, meses : fin.meses, tope : fin.tope, idCausal : fin.causal.id };
      $rootScope.cargando = true;
      var datos = finiquito.calcular().post(detalles);
      datos.$promise.then(function(response){
        if(response.success){
          openCalculoFiniquito(response);
        }else{
          openAdvertencia(response);
        }
        $rootScope.cargando = false;      
      });
    };    

    function openAdvertencia(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaFiniquitoCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function () {
        javascript:void(0);
      }, function () {
        javascript:void(0);
      });
    };

    function openCalculoFiniquito(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormFiniquitoCtrl',
        size : 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        $uibModalInstance.close(mensaje);
        cargarDatos(obj.tra);        
      }, function () {
        javascript:void(0)
      });
    };

    // Fecha 

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: fecha.convertirFecha(mesActual.fechaRemuneracion),
      minDate: fecha.convertirFecha(mesActual.mes),
      startingDay: 1
    };  

    $scope.openFecha = function() {
      $scope.popupFecha.opened = true;
    };

    $scope.format = ['dd-MMMM-yyyy'];

    $scope.popupFecha = {
      opened: false
    };

  });
