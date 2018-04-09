'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:F1887Ctrl
 * @description
 * # F1887Ctrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('F1887Ctrl', function ($scope, constantes, $uibModal, declaracionTrabajador, $filter, $anchorScroll, trabajador, $rootScope, Notification, liquidacion) {
    
    $anchorScroll();

    $scope.objeto = {};
    $scope.isSelect = [ false, false ];
    $scope.cargado = false;
    $scope.constantes = constantes;
    $scope.mensaje = [ "", ""];
    
    function cargarDatos(sid){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = trabajador.trabajadoresF1887().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.isDeclaracion = response.isDeclaracion;
        $scope.trabajadores = [ response.sinDeclaracion, response.conDeclaracion ];
        $scope.anios = response.anios;
        $rootScope.cargando = false;
        $scope.cargado = true;
        crearModels();
        limpiarChecks();
        actualizarOptions(response.anio.anio);
      });
    }

    function actualizarOptions(anio){
      $scope.objeto.anio = $filter('filter')( $scope.anios, anio, true )[0];
    }

    $scope.selectAnio = function(){
      cargarDatos($scope.objeto.anio.sid);
    }

    cargarDatos(0);

    function generarCertificados(trabajadores){
      $rootScope.cargando = true;
      var datos = trabajador.f1887Trabajadores().post({}, trabajadores);
      datos.$promise.then(function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
          cargarDatos($scope.objeto.anio.sid);
          $rootScope.cargando = false;
        }else{
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          $rootScope.cargando = false;
        }
      });
    }

    function crearModels(){
      for(var i=0, len=$scope.trabajadores[0].length; i<len; i++){
        $scope.trabajadores[0][i].check = false;
      }         
      for(var i=0, len=$scope.trabajadores[1].length; i<len; i++){
        $scope.trabajadores[1][i].check = false;
      }  
      $scope.cargado = true;
    }

    $scope.select = function(index, ind){
      if(!$scope.trabajadores[ind][index].check){
        if($scope.objeto.todos[ind]){
          $scope.objeto.todos[ind] = false; 
        }
        countSelected(ind);
        $scope.isSelect[ind] = isThereSelected(ind);       
      }else{
        $scope.isSelect[ind] = true;
        countSelected(ind);
      }
    }

    function isThereSelected(index){
      var bool = false;
      for(var i=0, len=$scope.trabajadores[index].length; i<len; i++){
        if($scope.trabajadores[index][i].check){
          bool = true;
          return bool;
        }
      }
      return bool;
    }

    function countSelected(index){
      var count = 0;
      var nom;
      for(var i=0, len=$scope.trabajadores[index].length; i<len; i++){
        if($scope.trabajadores[index][i].check){
          nom = $scope.trabajadores[index][i].nombreCompleto;
          count++;
          $scope.mensaje[0] = 'Se generarán las Declaraciones F1887 de los <b>' + count + '</b> trabajadores seleccionados.';
          $scope.mensaje[1] = 'Se sobreescribirán las Declaraciones F1887 de los <b>' + count + '</b> trabajadores seleccionados.';
          $scope.mensaje[2] = 'Se eliminarán las Declaraciones F1887 de los <b>' + count + '</b> trabajadores seleccionados.';
        }
      }
      if(count===1){
        count = nom;
        $scope.mensaje[0] = 'Se generará una nueva Declaración F1887 de <b>' + count + '</b>, sobreescribiendo la anterior.';
        $scope.mensaje[1] = 'Se eliminará la Declaración F1887 de <b>' + count + '</b>.';
      }

      return count;
    }

    $scope.selectAll = function(index, check){
      if(check){
        var total = 0;
        for(var i=0, len=$scope.trabajadores[index].length; i<len; i++){
          $scope.trabajadores[index][i].check = true
          $scope.isSelect[index] = true;
          total++;  
        }
        countSelected(index);
      }else{
        for(var i=0, len=$scope.trabajadores[index].length; i<len; i++){
          $scope.trabajadores[index][i].check = false
          $scope.isSelect[index] = false;
        }
      }
    }

    $scope.generarArchivo = function(){
      var isActividad = true;
      if($scope.trabajadores[0].length>0){
        var lista = '';        
        for(var i=0,len=$scope.trabajadores[0].length; i<len; i++){
          if($scope.trabajadores[0][i].isActividad){
            isActividad = false;
            lista = lista + '-' + $scope.trabajadores[0][i].nombreCompleto + '<br />';
          }
        }
      }
      if(!isActividad){
        advertencia(lista, null, $scope.objeto.anio.nombre);      
      }else{
        $rootScope.cargando = true;
        var datos = trabajador.f1887().get({ anio : $scope.objeto.anio.sid });
        datos.$promise.then(function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
            openDeclaracion(response);
            $rootScope.cargando = false;
          }else{
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
            $rootScope.cargando = false;
          }
        });
      }
    }

    $scope.verDeclaracion = function(){
      $rootScope.cargando = true;
      var datos = trabajador.verF1887().get({ anio : $scope.objeto.anio.nombre });
      datos.$promise.then(function(response){
        $rootScope.cargando = false;
        openDeclaracion(response);        
      });
    }

    $scope.generar = function(index, trabajador, multi, update){
      var certificados = { trabajadores : [], comprobar : update, anio : $scope.objeto.anio.nombre };
      var isActividad = true;
      var isActividad2 = false;
      var lista = '';
      if(multi){
        for(var i=0,len=$scope.trabajadores[index].length; i<len; i++){
          if($scope.trabajadores[index][i].check){
            if(!$scope.trabajadores[index][i].isActividad){
              isActividad = false;
              lista = lista + '-' + $scope.trabajadores[index][i].nombreCompleto + '<br />';
            }else{
              isActividad2 = true;
              certificados.trabajadores.push({ sid : $scope.trabajadores[index][i].sidTrabajador});              
            }
          }
        }
      }else{
        if(!trabajador.isActividad){          
          isActividad = false;
          lista = lista + '-' + trabajador.nombreCompleto + '<br />';
        }else{
          console.log(trabajador)
          certificados.trabajadores.push({ sid : trabajador.sidTrabajador });        
        }
      }

      if(isActividad){
        generarCertificados(certificados);
      }else{        
        advertencia(lista, certificados, $scope.objeto.anio.nombre, isActividad2);
      }
    }

    function limpiarChecks(){
      for(var i=0, len=$scope.trabajadores[0].length; i<len; i++){
        $scope.trabajadores[0][i].check = false
      }
      for(var i=0, len=$scope.trabajadores[1].length; i<len; i++){
        $scope.trabajadores[1][i].check = false
      }
      $scope.isSelect[0] = false;
      $scope.isSelect[1] = false;
      $scope.objeto.todos = [ false, false ];
    }

    $scope.eliminar = function(dec, multi){
      $rootScope.cargando=true;
      if(multi){
        var declaraciones = { trabajadores : [] };
        for(var i=0,len=$scope.trabajadores[1].length; i<len; i++){
          if($scope.trabajadores[1][i].check){
            declaraciones.trabajadores.push({ sid : $scope.trabajadores[1][i].declaracion.sid });
          }
        }
        $scope.result = declaracionTrabajador.eliminarMasivo().post({}, declaraciones );  
      }else{     
        $scope.result = declaracionTrabajador.datos().delete({ sid : dec.sid });  
      }      
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos($scope.objeto.anio.sid);
        }
      });
    }

    function advertencia(lista, isActividad, anio, conActividad){      
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaF1887Ctrl',
        resolve: {
          objeto: function () {
            return lista;          
          },
          isActividad: function () {
            return isActividad;          
          },
          anio: function () {
            return anio;          
          },
          conActividad: function () {
            return conActividad;          
          }
        }
      });
     miModal.result.then(function (certificados) {
        generarCertificados(certificados);
      }, function () {
        javascript:void(0);
      });
    }

    function openDeclaracion(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-declaracion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDeclaracionCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function () {        
        cargarDatos($scope.objeto.anio.sid)
      }, function () {
        cargarDatos($scope.objeto.anio.sid)
      });
    }
  
  })
  .controller('FormAdvertenciaF1887Ctrl', function ($scope, $http, anio, isActividad, conActividad, $rootScope, $uibModalInstance, objeto, $uibModal, $filter) {

    if(isActividad){
      $scope.titulo = 'Trabajadores sin Actividad';
      $scope.mensaje = 'Los siguientes trabajadores no poseen actividad durante el periodo ' + anio + ', por lo que no se emitirán sus declaraciones:';
      if(conActividad){
        $scope.isOK = true;
        $scope.ok = 'Generar de todos modos';
      }
    }else{
      $scope.titulo = 'Declaraciones Pendientes';
      $scope.mensaje = 'Por favor genere las siguientes declaraciones para poder emitir el archivo F1887:';
    }    

    $scope.mensaje2 = objeto;
    $scope.isCerrar = true;
    $scope.isExclamation = true;
    $scope.cancel = 'Cerrar';

    $scope.cerrar = function(){
      $uibModalInstance.dismiss();
    }

    $scope.aceptar = function(){
      $uibModalInstance.close(isActividad);
    }
  
  }) 
  .controller('FormDeclaracionCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, constantes) {

    $scope.constantes = constantes;
    $scope.nombreExcel = angular.copy(objeto.nombreExcel);
    $scope.nombreCSV = angular.copy(objeto.nombreCSV);
    $scope.declaraciones = angular.copy(objeto.datos.declaraciones);
    $scope.totales = angular.copy(objeto.datos.totales);
    $scope.anio = angular.copy(objeto.anio);
  
  
  });
