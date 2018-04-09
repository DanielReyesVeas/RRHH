'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CartasDeNotificacionCtrl
 * @description
 * # CartasDeNotificacionCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CartasDeNotificacionCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification, plantillaCartaNotificacion) {
    
    $anchorScroll();
    $scope.objeto = [];
    $scope.isSelect = false;
    $scope.cargado = false;    

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = trabajador.trabajadoresCartasNotificacion().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    cargarDatos();

    $scope.ingresar = function(trab){
      $rootScope.cargando=true;
      var datos = plantillaCartaNotificacion.datos().get();
      datos.$promise.then(function(response){
        open(response.datos, trab);
        $rootScope.cargando=false;
      });
    }

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.cartasNotificacion().get({sid: sid});
      datos.$promise.then(function(response){
        openDetalle(response);
        $rootScope.cargando=false;
      });
    }

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-cartas-notificacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCartasNotificacionCtrl',
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

    function open(obj, trab){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-carta-notificacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCartaNotificacionCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          trab: function () {
            return trab;          
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

    $scope.gestionar = function(){
      $rootScope.cargando=true;
      var datos = plantillaCartaNotificacion.datos().get();
      datos.$promise.then(function(response){
        openGestionar(response.datos);
        $rootScope.cargando=false;
      });
    }

    function openGestionar(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-plantillas-carta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillasCartaCtrl',
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
    };

  })
  .controller('FormDetalleCartasNotificacionCtrl', function ($rootScope, $uibModal, $filter, $scope, $uibModalInstance, objeto, trabajador, cartaNotificacion, Notification, constantes) {
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);
    $scope.constantes = angular.copy(constantes);

    function cargarDatos(tra){
      $rootScope.cargando = true;
      var datos = trabajador.cartasNotificacion().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
      });
    }

    $scope.eliminar = function(carta, tra){
      $rootScope.cargando=true;
      $scope.result = cartaNotificacion.datos().delete({ sid: carta.sid });
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

    function carta(obj, bool){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-carta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCartaCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          },
          isDetail: function () {
            return bool;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        $uibModalInstance.close(mensaje); 
      }, function () {
        javascript:void(0)
      });
    }

  })
  .controller('FormCartaNotificacionCtrl', function ($rootScope, $uibModal, $filter, $scope, $uibModalInstance, objeto, trab, trabajador, plantillaCartaNotificacion) {

    $scope.trabajador = angular.copy(trab);
    $scope.plantillas = angular.copy(objeto);
    $scope.cargado = false;
    $scope.isSelected = false;
    $scope.isSelect = false;

    function crearModels(){
      $scope.objeto = [];
      for(var i=0, len=$scope.trabajador.inasistencias.length; i<len; i++){
        $scope.objeto.push({ check : false });
      }         
    }
    
    $scope.select = function(index){
      if(!$scope.objeto[index].check){
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
      for(var i=0, len=$scope.trabajador.inasistencias.length; i<len; i++){
        if($scope.objeto[i].check){
          bool = true;
          return bool;
        }
      }
      return bool;
    }

    function countSelected(){
      var count = 0;
      for(var i=0, len=$scope.trabajador.inasistencias.length; i<len; i++){
        if($scope.objeto[i].check){
          count++;
          $scope.mensaje = 'Se ingresará la Carta de Notificación al trabajador ' + $scope.trabajador.nombreCompleto + '.';
        }
      }
      if(count===1){
        count = $scope.trabajador.nombreCompleto;
        $scope.mensaje = 'Se ingresará la Carta de Notificación al trabajador ' + $scope.trabajador.nombreCompleto + '.';
      }
      return count;
    }

    $scope.selectAll = function(){
      if($scope.objeto.todos){
        var total = 0;
        for(var i=0, len=$scope.trabajador.inasistencias.length; i<len; i++){
          $scope.objeto[i].check = true
          $scope.isSelect = true;
          total++;  
        }
        countSelected();
      }else{
        for(var i=0, len=$scope.trabajador.inasistencias.length; i<len; i++){
          $scope.objeto[i].check = false
          $scope.isSelect = false;
        }
      }
    }    

    $scope.selectPlantilla = function(){
      $scope.cargado = false;
      $rootScope.cargando=true;
      var datos = trabajador.inasistencias().get({sid: $scope.trabajador.sid});
      datos.$promise.then(function(response){
        $scope.trabajador.inasistencias = response.datos.inasistencias;
        $rootScope.cargando=false;
        $scope.cargado = true;
        crearModels();
        limpiarChecks();
      });
    }

    function limpiarChecks(){
      for(var i=0, len=$scope.trabajador.inasistencias.length; i<len; i++){
        $scope.objeto[i].check = false
      }
      $scope.isSelect = false;
      $scope.objeto.todos = false;
    }

    $scope.generar = function(){
      var inasistencias = [];
      for(var i=0,len=$scope.trabajador.inasistencias.length; i<len; i++){
        if($scope.objeto[i].check){
          inasistencias.push($scope.trabajador.inasistencias[i]);
        }
      }
      var obj = { sidTrabajador : $scope.trabajador.sid, sidPlantilla : $scope.carta.plantilla, inasistencias : inasistencias };
      $rootScope.cargando=true;
      var datos = trabajador.carta().post({}, obj);
      datos.$promise.then(function(response){
        $rootScope.cargando=false;
        carta(response, false);
      });      
    }

    function carta(obj, bool){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-carta.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCartaCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          },
          isDetail: function () {
            return bool;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        $uibModalInstance.close(mensaje); 
      }, function () {
        javascript:void(0)
      });
    }

  })
  .controller('FormPlantillasCartaCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, objeto, Notification, plantillaCartaNotificacion) {

    $scope.datos = objeto;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = plantillaCartaNotificacion.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;
      });
    }

    $scope.editar = function(sid){
      $rootScope.cargando=true;
      $scope.result = plantillaCartaNotificacion.datos().get({ sid: sid });
      $scope.result.$promise.then( function(response){
        $rootScope.cargando=false;
        $scope.open(response);
      })
    }

    $scope.open = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-plantilla-carta-notificacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillaCartaNotificacionCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title:'Notificación del Sistema'});
        cargarDatos();    
      }, function () {
        javascript:void(0)
      });
    }

    $scope.eliminar = function(car){
      $rootScope.cargando=true;
      $scope.result = plantillaCartaNotificacion.datos().delete({ sid: car });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
        }
        $rootScope.cargando=false;
        cargarDatos();
      });
    }
    
  })
  .controller('FormPlantillaCartaNotificacionCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, objeto, Notification, plantillaCartaNotificacion) {
    
    if(objeto){
      $scope.carta = angular.copy(objeto.datos);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Motivo de Notificación';
      $scope.encabezado = $scope.carta.nombre;
    }else{
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Motivo de Notificación';
      $scope.encabezado = 'Nuevo Motivo de Notificación';
    }

    $scope.empresa = $rootScope.globals.currentUser.empresa;

    $scope.tinymceOptions = {
        resize: false,
        width: 800,  // I *think* its a number and not '400' string
        height: 500,
        plugins: 'textcolor',
        entity_encoding : "raw",
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

    $scope.guardar = function(carta){
      $rootScope.cargando=true;
      var response;
      if( carta.sid ){
        response = plantillaCartaNotificacion.datos().update({sid:carta.sid}, $scope.carta);
      }else{
        response = plantillaCartaNotificacion.datos().create({}, $scope.carta);
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
    }    

  })
  .controller('FormCartaCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, objeto, trabajador, Notification, fecha, cartaNotificacion, isDetail) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.trabajador = angular.copy(objeto.trabajador);
    $scope.carta = angular.copy(objeto.datos);
    $scope.isDetail = isDetail;

    $scope.ingresar = function(){
      var inasistencias = $scope.trabajador.inasistencias;
      var carta = { idPlantillaCarta : $scope.carta.id, idTrabajador : $scope.trabajador.id, idEncargado : $scope.trabajador.id, idEmpresa : $scope.empresa.id, razonSocialEmpresa : $scope.empresa.empresa, rutEmpresa : $scope.empresa.rut, direccionEmpresa : $scope.empresa.direccion, rutTrabajador : $scope.trabajador.rut, nombreCompletoTrabajador : $scope.trabajador.nombreCompleto, cargoTrabajador : $scope.trabajador.cargo.nombre, seccionTrabajador : $scope.trabajador.seccion.nombre, fechaIngresoTrabajador : $scope.trabajador.fechaIngreso, direccionTrabajador : $scope.trabajador.direccion, comunaTrabajador : $scope.trabajador.comuna.comuna, provinciaTrabajador : $scope.trabajador.comuna.provincia, fecha : new Date(), folio : 4548452, cuerpo : $scope.carta.cuerpo, inasistencias : inasistencias };
      $rootScope.cargando=true;
      var response;
      response = cartaNotificacion.datos().create({}, carta);
      
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
        plugins: 'textcolor',
        entity_encoding : "raw",
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

  });
