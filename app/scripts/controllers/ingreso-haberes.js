'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:IngresoHaberesCtrl
 * @description
 * # IngresoHaberesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('IngresoHaberesCtrl', function ($rootScope, $uibModal, $filter, $scope, $anchorScroll, tipoHaber, constantes, Notification, trabajador) {
    
    $anchorScroll();

    $scope.constantes = constantes;

    $scope.tabImponibles = true;
    $scope.tabNoImponibles = false;
    $scope.cargado = false;

    $scope.openTab = function(tab){
      switch (tab) {
        case 'imponibles':
          $scope.tabImponibles = true;
          $scope.tabNoImponibles = false;
          break;
        case 'noImponibles':
          $scope.tabImponibles = false;
          $scope.tabNoImponibles = true;
          break;
      }
    }

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = tipoHaber.ingresoHaberes().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.imponibles = response.imponibles;
        $scope.noImponibles = response.noImponibles;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

    $scope.openIngresoHaber = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-ingreso-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      }, function () {
        javascript:void(0)
      });
    }

    $scope.importarPlanillaMasivo = function () {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-importar-planilla-haber-masivo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormImportarPlanillaHaberMasivoCtrl',
        size: 'lg'
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      }, function () {
        javascript:void(0)
      });
    }

    $scope.importarPlanilla = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-importar-planilla-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormImportarPlanillaHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
      }, function () {
        javascript:void(0)
      });
    }

    $scope.reporteTrabajadores = function(){
      $rootScope.cargando = true;
      var datos = trabajador.input().get();
      datos.$promise.then(function(response){
        openReporteTrabajadores(response);
        $rootScope.cargando = false;
      });
    }

    function openReporteTrabajadores(obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-reporte-trabajadores-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormReporteTrabajadoresHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      }, function () {
        javascript:void(0)
      });
    }

    $scope.ingresoSeccion = function(hab){
      $scope.cargado = false;
      $rootScope.cargando = true;
      var datos = trabajador.secciones().get();
      datos.$promise.then(function(response){
        openIngresoSeccionHaber(hab, response);
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    function openIngresoSeccionHaber(obj, trab) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-ingreso-seccion-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoSeccionHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          },
          trabajadores: function () {
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
    }

    $scope.openIngresoTotalHaber = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-ingreso-total-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoTotalHaberCtrl',
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

    $scope.openReporteHaber = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-reporte-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormReporteHaberCtrl',
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

    $scope.reporte = function(hab){
      $rootScope.cargando=true;
      var datos = tipoHaber.datos().get({sid: hab.sid});
      datos.$promise.then(function(response){
        $scope.openReporteHaber( response );
        $rootScope.cargando=false;
      });
    };    

  })
  .controller('FormImportarPlanillaHaberMasivoCtrl', function ($scope, fecha, $uibModal, $uibModalInstance, $http, $filter, constantes, $rootScope, Notification, Upload, haber) {
    
    $scope.error = {};
    $scope.datos=[];
    $scope.listaErrores=[];
    $scope.constantes = constantes;

    $scope.convertirFechaFormato = function(date){
      return fecha.convertirFechaFormato(date);
    }

    $scope.$watch('files', function() {
      $scope.upload($scope.files);
    });

    $scope.upload = function(files) {   
      if(files) {              
        $scope.error = {};
        $scope.datos=[];
        $scope.listaErrores=[];
        var file = files;
        Upload.upload({
          url: constantes.URL + 'haberes/planilla/importar-masivo',
          data: { file : file}
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.dynamic = progressPercentage;
        }).success(function (data){
          $scope.dynamic=0;
          if( data.success ){
              $scope.datos = data.datos.datos;
              $scope.encabezado = data.datos.encabezado;
          }else{
            if( data.errores ){
              $scope.listaErrores = data.errores;
              Notification.error({message: 'Errores en los datos del archivo', title: 'Mensaje del Sistema'});
            }else{
              Notification.error({message: data.mensaje, title: 'Mensaje del Sistema'});                            
            }
          }
        });                
      }
    };

    $scope.confirmarDatos = function(){
      $rootScope.cargando=true;
      var obj = { datos : $scope.datos, haberes : $scope.encabezado };
      var datos = haber.importarMasivo().post({}, obj);
      datos.$promise.then(function(response){
        if(response.success){
          $uibModalInstance.close(response.mensaje);
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando = false;
      });
    }

  })
  .controller('FormImportarPlanillaHaberCtrl', function ($scope, $uibModal, $uibModalInstance, $http, $filter, constantes, $rootScope, Notification, Upload, objeto, haber) {

    var hab = angular.copy(objeto);
    $scope.haber = {};
    $scope.error = {};
    $scope.datos=[];
    $scope.listaErrores=[];
    $scope.constantes = constantes;
    $scope.mesActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo.mesActivo;

    $scope.$watch('files', function() {
      $scope.upload($scope.files);
    });

    $scope.upload = function(files) {      
      if(files) {              
        $scope.error = {};
        $scope.datos=[];
        $scope.listaErrores=[];
        var file = files;
        Upload.upload({
          url: constantes.URL + 'haberes/planilla/importar',
          data: { file : file, haber : hab }
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.dynamic = progressPercentage;
        }).success(function (data){
          $scope.dynamic=0;
          if( data.success ){
              $scope.datos = data.datos;
              $scope.haber = data.haber;
          }else{
            if( data.errores ){
              $scope.listaErrores = data.errores;
              Notification.error({message: 'Errores en los datos del archivo', title: 'Mensaje del Sistema'});
            }else{
              Notification.error({message: data.mensaje, title: 'Mensaje del Sistema'});                            
            }
          }
        });                
      }
    };

    $scope.confirmarDatos = function(){
      $rootScope.cargando=true;
      var obj = { trabajadores : $scope.datos, haber : $scope.haber };
      var datos = haber.importar().post({}, obj);
      datos.$promise.then(function(response){
        if(response.success){
          $uibModalInstance.close(response.mensaje);
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando = false;
      });
    }

  })
  .controller('FormReporteHaberCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, Notification, trabajador, tipoHaber, haber) {
   
    $scope.haber = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);
    
    $scope.reporteTrabajador = function(trab){
      $rootScope.cargando=true;
      var datos = trabajador.haberes().get({sid: trab.sid});
      datos.$promise.then(function(response){
        $scope.openReporteTrabajadorHaberes( response );
        $rootScope.cargando=false;
      });
    }

    $scope.confirmacion = function(hab, tipo){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaHaberCtrl',
        resolve: {
          hab: function () {
            return hab;          
          },
          objeto: function () {
            return tipo;          
          },
          tipo: function () {
            return tipo;          
          }
        }
      });
     miModal.result.then(function (object) {
        $scope.eliminar(object.haber, object.objeto, object.todosMeses);
      }, function () {
        javascript:void(0);
      });
    }

    $scope.cargarDatos = function(hab){
      $rootScope.cargando=true;
      var datos = tipoHaber.datos().get({sid: hab});
      datos.$promise.then(function(response){
        $scope.haber = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
      });
    }; 

    $scope.openReporteTrabajadorHaberes = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-reporte-trabajador-haberes.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormReporteTrabajadorHaberesCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});        
        $scope.reporteTrabajador();
      }, function () {
        javascript:void(0)
      });
    }

    $scope.editar = function(hab){
      $rootScope.cargando=true;
      var datos = haber.datos().get({sid: hab.sid});
      datos.$promise.then(function(response){
        $scope.openEditarHaber( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(hab, tipo, todosMeses){
      $rootScope.cargando=true;
      if(todosMeses){
        $scope.result = haber.datos().delete({ sid: hab.sid });
      }else{
        $scope.result = haber.eliminarPermanente().post({}, hab);        
      }
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          $scope.cargarDatos(tipo.sid);
        }
      });
    };

    $scope.openEditarHaber = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-ingreso-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        $scope.cargarDatos(object.sidHaber);
      }, function () {
        javascript:void(0)
      });
    }

  })
  .controller('FormReporteTrabajadorHaberesCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, Notification, trabajador, haber) {
    
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);

    $scope.cargarDatos = function(trab){
      $rootScope.cargando=true;
      var datos = trabajador.haberes().get({sid: trab});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
      });
    }; 

    $scope.confirmacion = function(hab, trab){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaHaberCtrl',
        resolve: {
          hab: function () {
            return hab;          
          },
          objeto: function () {
            return trab;          
          },
          tipo: function () {
            return hab.tipo;          
          }
        }
      });
      miModal.result.then(function (object) {
        $scope.eliminar(object.haber, object.objeto, object.todosMeses);
      }, function () {
        javascript:void(0);
      });
    }

    $scope.editar = function(hab){  
      $rootScope.cargando=true;
      var datos = haber.datos().get({sid: hab.sid});
      datos.$promise.then(function(response){
        $scope.openEditarHaber( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(hab, trab, todosMeses){
      $rootScope.cargando=true;
      if(todosMeses){
        $scope.result = haber.datos().delete({ sid: hab.sid });
      }else{
        $scope.result = haber.eliminarPermanente().post({}, hab);        
      }
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          $scope.cargarDatos(trab);
        }
      });
    };

    $scope.openEditarHaber = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-ingreso-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        $scope.cargarDatos(object.sidTrabajador);
      }, function () {
        javascript:void(0)
      });
    }

  })
  .controller('FormIngresoSeccionHaberCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, Notification, trabajador, trabajadores, moneda) {

    $scope.haber = angular.copy(objeto);
    $scope.datos = angular.copy(trabajadores); 
    $scope.monedaActual = 'pesos'; 
    $scope.monedaActualGlobal = 'pesos'; 
    $scope.cargado = true;  

    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }

    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    $scope.uf = $rootScope.globals.indicadores.uf.valor;
    $scope.utm = $rootScope.globals.indicadores.utm.valor;

    $scope.monto = { moneda : $scope.monedas[0].nombre, montoGlobal : false };    

    $scope.cambiarMoneda = function(){
      $scope.monto.global = null;
      switch($scope.monto.moneda){
        case '$':
          $scope.monedaActualGlobal = 'pesos'; 
          break;
        case 'UF':
          $scope.monedaActualGlobal = 'UF'; 
          break;
        case 'UTM':
          $scope.monedaActualGlobal = 'UTM'; 
          break;
      }    
    }

    $scope.openMeses = function (obj, hab, mon) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-haber-meses.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoHaberMesesCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          },
          hab: function () {
            return hab;
          },
          monto: function () {
            return mon;
          }
        }
      });
      miModal.result.then(function (object) {
        $uibModalInstance.close(object);
      }, function () {
        javascript:void(0)
      });
    }

    $scope.cambiarMonedaIndividual = function(index){
      $scope.datos.haber[index].monto = null;
      $scope.datos.haber[index].montoPesos = null;
      switch($scope.datos.haber[index].moneda){
        case '$':
          $scope.datos.haber[index].monedaActual = 'pesos'; 
          break;
        case 'UF':
          $scope.datos.haber[index].monedaActual = 'UF'; 
          break;
        case 'UTM':
          $scope.datos.haber[index].monedaActual = 'UTM'; 
          break;
      }
    }

    function getTrabajadoresSeccion(sid){
      $scope.cargado = false;
      $rootScope.cargando = true;

      var array = [];
      for(var i=0,len=$scope.datos.trabajadores.length; i<len; i++){
        if($scope.datos.trabajadores[i].seccion.sid===sid){
          array.push($scope.datos.trabajadores[i]);
        }
      }
      $scope.datos.trabajadores = array;
      $rootScope.cargando = false;
      $scope.cargado = true;
      crearModels();
    }

    $scope.cambiarSeccion = function(){
      $scope.datos.todos = false;
      if(!$scope.objeto.haber.seccion){
        $scope.datos = angular.copy(trabajadores); 
        crearModels();
      }
    }

    $scope.seleccionarSeccion = function(seccion){      
      getTrabajadoresSeccion(seccion.sid);
      $scope.datos.todos = false;
    }

    function crearModels(){
      $scope.datos.haber = [];
      for(var i=0, len=$scope.datos.trabajadores.length; i<len; i++){
        $scope.datos.haber.push({ check : false, monto : null, tipo_haber_id : $scope.haber.id, trabajador_id : $scope.datos.trabajadores[i].id, moneda : $scope.monedas[0].nombre, monedaActual : 'pesos' });
      }         
    }

    crearModels();

    $scope.cambiarMontoGlobal = function(){
      if($scope.monto.montoGlobal){
        $scope.monto.montoGlobal = false;
      }else{
        $scope.monto.moneda = $scope.monedas[0].nombre;
        $scope.monto.global = null;
        $scope.cambiarMoneda();
        $scope.monto.montoGlobal = true;
      }
    }


    $scope.select = function(index){
      if(!$scope.datos.haber[index].check){
        $scope.datos.haber[index].monto = null;
        $scope.datos.haber[index].moneda = $scope.monedas[0].nombre;
        $scope.cambiarMonedaIndividual(index);
        if($scope.datos.todos){
          $scope.datos.todos = false;          
        }
      }
    }

    $scope.selectAll = function(){
      if($scope.datos.todos){
        for(var i=0, len=$scope.datos.trabajadores.length; i<len; i++){
          $scope.datos.haber[i].check = true
        }
      }else{
        for(var i=0, len=$scope.datos.trabajadores.length; i<len; i++){
          $scope.datos.haber[i].check = false
        }
      }
    }    

  })
  .controller('FormIngresoHaberMesesCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, trabajador, Notification, haber, hab, monto, fecha) {
    
    $scope.haber = hab;
    $scope.monto = monto;
    $scope.datos = { trabajadores : objeto };
    $scope.mesActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
    $scope.objeto = { haber : { mensual : true, rangoMeses : false, permanente : false, anual : false, mes : fecha.convertirFecha($scope.mesActual.mes), desde : fecha.convertirFecha($scope.mesActual.mes) } };

    $scope.cambiarMes = function(mes){
      if(mes==='mensual'){
        if($scope.objeto.haber.mensual){
          $scope.objeto.haber.rangoMeses = false;
          $scope.objeto.haber.permanente = false;
        }else{
          $scope.objeto.haber.rangoMeses = true;
        }
      }
      if(mes==='rangoMeses'){
        if($scope.objeto.haber.rangoMeses){
          $scope.objeto.haber.mensual = false;
          $scope.objeto.haber.permanente = false;
        }else{
          $scope.objeto.haber.mensual = true;
        }
      }
      if(mes==='permanente'){
        if($scope.objeto.haber.permanente){
          $scope.objeto.haber.mensual = false;
          $scope.objeto.haber.rangoMeses = false;
        }else{
          $scope.objeto.haber.mensual = true;
        }
      }
      $scope.objeto.haber.anual = false;
    }

    $scope.confirmacion = function(hab, haber){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaIngresoHaberCtrl',
        resolve: {
          hab: function () {
            return hab;          
          },
          objeto: function () {
            return haber;          
          }
        }
      });
      miModal.result.then(function (object) {
        $scope.ingresoMasivoHaber(object.todosMeses);
      }, function () {
        javascript:void(0);
      });
    }

    $scope.ingresoMasivoHaber = function(todosMeses){

      var ingresoMasivo = { haberes : [] };
      var mes = null;
      if($scope.objeto.haber.permanente && !todosMeses){
        mes = $scope.mesActual.mes;
      }
      $rootScope.cargando=true;

      for(var i=0, len=$scope.datos.trabajadores.length; i<len; i++){
        if($scope.datos.trabajadores[i].check){
          if($scope.monto.montoGlobal){
            $scope.datos.trabajadores[i].monto = $scope.monto.global;
            $scope.datos.trabajadores[i].moneda = $scope.monto.moneda;
          }
          $scope.datos.trabajadores[i].por_mes = $scope.objeto.haber.mensual;
          $scope.datos.trabajadores[i].rango_meses = $scope.objeto.haber.rangoMeses;
          $scope.datos.trabajadores[i].permanente = $scope.objeto.haber.permanente;
          $scope.datos.trabajadores[i].todos_anios = $scope.objeto.haber.anual;

          if($scope.datos.trabajadores[i].por_mes){
            $scope.datos.trabajadores[i].mes_id = $scope.mesActual.id;
            $scope.datos.trabajadores[i].mes = $scope.mesActual.mes;
            $scope.datos.trabajadores[i].desde = null;
            $scope.datos.trabajadores[i].hasta = null;
          }else if($scope.datos.trabajadores[i].rango_meses){
            $scope.datos.trabajadores[i].mes_id = null;
            $scope.datos.trabajadores[i].mes = null;
            $scope.datos.trabajadores[i].desde = $scope.objeto.haber.mes;
            $scope.datos.trabajadores[i].hasta = $scope.objeto.haber.hasta;
          }else{
            $scope.datos.trabajadores[i].mes_id = null;
            $scope.datos.trabajadores[i].mes = null;
            $scope.datos.trabajadores[i].desde = mes;
            $scope.datos.trabajadores[i].hasta = null;
          }

          ingresoMasivo.haberes.push($scope.datos.trabajadores[i]);
        }
      }
      
      var datos = haber.masivo().post({}, ingresoMasivo);
      datos.$promise.then(function(response){
        if(response.success){
          $uibModalInstance.close(response.mensaje);
        }else{
          // error
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando = false;
      });
    }

    // Fecha 

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };  

    $scope.openFechaHasta = function() {
      $scope.popupFechaHasta.opened = true;
    };

    $scope.dateOptionsMes = {
      showWeeks: false,
      viewMode: "months", 
      minMode: 'month',
      format: "mm/yyyy"
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFechaHasta = {
      opened: false
    };

  })
  .controller('FormReporteTrabajadoresHaberCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, trabajador, Notification, haber) {

    $scope.mostrar = false;
    $scope.datos = angular.copy(objeto.datos);    
    $scope.accesos = angular.copy(objeto.accesos);

    function cargarDatosTrabajador(sid){
      $rootScope.cargando=true;
      $scope.mostrar = false;
      var datos = trabajador.haberes().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.mostrar = true;
      });
    }

    $scope.confirmacion = function(hab, trab){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaHaberCtrl',
        resolve: {
          hab: function () {
            return hab;          
          },
          objeto: function () {
            return trab;          
          },
          tipo: function () {
            return hab.tipo;          
          }
        }
      });
      miModal.result.then(function (object) {
        $scope.eliminar(object.haber, object.objeto, object.todosMeses);
      }, function () {
        javascript:void(0);
      });
    }

    $scope.seleccionarTrabajador = function(sid){      
      cargarDatosTrabajador(sid);
    }

    $scope.editar = function(hab){      
      $rootScope.cargando=true;
      var datos = haber.datos().get({sid: hab.sid});
      datos.$promise.then(function(response){
        $scope.openEditarHaber( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(hab, trab, todosMeses){
      $rootScope.cargando=true;
      if(todosMeses){
        $scope.result = haber.datos().delete({ sid: hab.sid });
      }else{
        $scope.result = haber.eliminarPermanente().post({}, hab);        
      }
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatosTrabajador(trab);
        }
      });
    };

    $scope.openEditarHaber = function (obj) {      
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-ingreso-haber.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoHaberCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatosTrabajador(object.sidTrabajador);
      }, function () {
        javascript:void(0)
      });
    }

  })
  .controller('FormAdvertenciaHaberCtrl', function ($scope, $http, hab, tipo, $rootScope, $uibModalInstance, objeto, $uibModal, $filter) {

    $scope.titulo = 'Eliminar Haber';
    $scope.mensaje = 'El Haber ' + tipo.nombre + ' es de tipo Permanente.';
    $scope.mensaje2 = '¿Desea eliminarlo sólo para los <b>meses posteriores</b> o para <b>todos los meses del sistema</b> (incluidos los meses anteriores)?';
    $scope.isOK = true;
    $scope.isCerrar = true;
    $scope.isExclamation = true;
    $scope.ok = 'Sólo meses posteriores';
    $scope.cancel = 'Todos los meses';

    $scope.aceptar = function(){
      $uibModalInstance.close({ todosMeses : false, haber : hab, objeto : objeto });
    }

    $scope.cerrar = function(){
      $uibModalInstance.close({ todosMeses : true, haber : hab, objeto : objeto });
    }

  })
  .controller('FormAdvertenciaIngresoHaberCtrl', function ($scope, $http, hab, $rootScope, $uibModalInstance, objeto, $uibModal, $filter) {

    $scope.titulo = 'Ingreso Haber';
    $scope.mensaje = 'El Haber ' + objeto.nombre + ' será ingresado de forma Permanente.';
    $scope.mensaje2 = '¿Desea que este sea asignado <b>a partir de este mes</b> en adelante o para <b>todos los meses del sistema</b> (incluidos los meses anteriores)?';
    $scope.isOK = true;
    $scope.isCerrar = true;
    $scope.isExclamation = true;
    $scope.ok = 'A partir de este mes';
    $scope.cancel = 'Todos los meses';

    $scope.aceptar = function(){
      $uibModalInstance.close({ todosMeses : false, haber : hab, objeto : objeto });
    }

    $scope.cerrar = function(){
      $uibModalInstance.close({ todosMeses : true, haber : hab, objeto : objeto });
    }

  })
  .controller('FormIngresoHaberCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, haber, trabajador, Notification, fecha, moneda) {    
    
    $scope.monedaActual = 'pesos'; 

    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }

    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    $scope.uf = $rootScope.globals.indicadores.uf;
    $scope.utm = $rootScope.globals.indicadores.utm;
    $scope.mesActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo;

    $scope.confirmacion = function(hab, haber){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaIngresoHaberCtrl',
        resolve: {
          hab: function () {
            return hab;          
          },
          objeto: function () {
            return haber;          
          }
        }
      });
      miModal.result.then(function (object) {
        $scope.ingresoIndividualHaber(object.haber, object.objeto, object.todosMeses);
      }, function () {
        javascript:void(0);
      });
    }

    $scope.cambiarMes = function(mes){
      if(mes==='mensual'){
        if($scope.objeto.haber.mensual){
          $scope.objeto.haber.rangoMeses = false;
          $scope.objeto.haber.permanente = false;
        }else{
          $scope.objeto.haber.rangoMeses = true;
        }
      }
      if(mes==='rangoMeses'){
        if($scope.objeto.haber.rangoMeses){
          $scope.objeto.haber.mensual = false;
          $scope.objeto.haber.permanente = false;
        }else{
          $scope.objeto.haber.mensual = true;
        }
      }
      if(mes==='permanente'){
        if($scope.objeto.haber.permanente){
          $scope.objeto.haber.mensual = false;
          $scope.objeto.haber.rangoMeses = false;
        }else{
          $scope.objeto.haber.mensual = true;
        }
      }
      $scope.objeto.haber.anual = false;
    }

    $scope.fechaActual = fecha.convertirFecha($scope.mesActual.mes);

    if(objeto.trabajador){
      $scope.objeto = {};
      $scope.objeto.haber = { trabajador : { nombreCompleto : objeto.trabajador.nombreCompleto, id : objeto.trabajador.id, sid : objeto.trabajador.sid} , monto : objeto.monto, sid : objeto.sid,  moneda : objeto.moneda, mensual : objeto.porMes, rangoMeses : objeto.rangoMeses, permanente : objeto.permanente, anual : objeto.todosAnios };
      $scope.trabajador = objeto.trabajador;
      $scope.haber = objeto.tipo;    
      $scope.objeto.haber.mes = fecha.convertirFecha(objeto.mes.mes);                 

      if($scope.objeto.haber.rangoMeses){
        $scope.objeto.haber.rangoHasta = fecha.convertirFecha(objeto.hasta);
        $scope.fechaDesde = fecha.convertirFecha(objeto.desde);
      }else if($scope.objeto.haber.permanente){
        $scope.fechaDesde = fecha.convertirFecha($scope.mesActual.mes);
        $scope.objeto.haber.desde = fecha.convertirFecha(objeto.desde);
        $scope.objeto.haber.hasta = fecha.convertirFecha(objeto.hasta);
      }else{
        $scope.fechaDesde = fecha.convertirFecha($scope.mesActual.mes);
        $scope.objeto.haber.desde = fecha.convertirFecha(objeto.desde);
        $scope.objeto.haber.hasta = fecha.convertirFecha(objeto.hasta);
        $scope.fechaActual = $scope.objeto.haber.mes;
        $scope.objeto.haber.idMes = objeto.mes.id;
      }

      switch($scope.objeto.haber.moneda){
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
      $scope.mostrar = true;
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Haber';
    }else{
      $scope.haber = objeto;
      $scope.objeto = {};
      $scope.objeto.haber = { moneda : $scope.monedas[0].nombre, mensual : true, rangoMeses : false, permanente : false, anual : false, mes : fecha.convertirFecha($scope.mesActual.mes), desde : null };
      $scope.fechaDesde = fecha.convertirFecha($scope.mesActual.mes);
      $scope.mostrar = false;
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Individual Haber';
    }    

    $scope.cambiarMoneda = function(){
      $scope.objeto.haber.monto = null;
      $scope.montoPesos = null;
      switch($scope.objeto.haber.moneda){
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
    
    $scope.cargarDatos = function(){
      $rootScope.cargando = true;
      var datos = trabajador.input().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;
      });
    };

    $scope.cargarDatos();

    $scope.seleccionarTrabajador = function(trabajador){
      $scope.trabajador = trabajador.trabajador;
      $scope.mostrar = true;
    }

    $scope.ingresoIndividualHaber = function(obj, hab, todosMeses){
      $rootScope.cargando=true;
      var response;
      var Haber = { idTrabajador : obj.trabajador.id, porMes : obj.mensual, idMes : null, mes : null, desde : null, hasta : null, rangoMeses : obj.rangoMeses, permanente : obj.permanente, todosAnios : obj.anual, idTipoHaber : hab.id, moneda : obj.moneda, monto : obj.monto, todosMeses : false };
      
      if(obj.sid){
        if(Haber.porMes){
          Haber.idMes = obj.idMes;
          Haber.mes = obj.mes;
        }else if(Haber.rangoMeses){
          Haber.desde = $scope.fechaDesde;
          Haber.hasta = obj.rangoHasta;
        }else{
          Haber.desde = obj.desde;
          Haber.hasta = obj.hasta;
        }
      }else{
        if(Haber.porMes){
          Haber.idMes = $scope.mesActual.id;
          Haber.mes = $scope.mesActual.mes;
        }else if(Haber.rangoMeses){
          Haber.desde = obj.mes;
          Haber.hasta = obj.rangoHasta;
        }else{
          if(!todosMeses){
            Haber.desde = $scope.mesActual.mes;
          }
        }
        Haber.todosMeses = todosMeses;
      }
      
      if( obj.sid ){
        response = haber.datos().update({sid:$scope.objeto.haber.sid}, Haber);
      }else{
        response = haber.datos().create({}, Haber);
      }
      
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, sidHaber : hab.sid, sidTrabajador : obj.trabajador.sid});
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    }

    // Fecha 

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };  

    $scope.openFechaHasta = function() {
      $scope.popupFechaHasta.opened = true;
    };

    $scope.openFechaRangoHasta = function() {
      $scope.popupFechaRangoHasta.opened = true;
    };

    $scope.openFechaDesde = function() {
      $scope.popupFechaDesde.opened = true;
    };

    $scope.dateOptionsMes = {
      showWeeks: false,
      viewMode: "months", 
      minMode: 'month',
      format: "mm/yyyy"
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFechaHasta = {
      opened: false
    };

    $scope.popupFechaDesde = {
      opened: false
    };

    $scope.popupFechaRangoHasta = {
      opened: false
    };

  });
