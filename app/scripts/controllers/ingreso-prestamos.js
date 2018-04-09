'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:IngresoPrestamosCtrl
 * @description
 * # IngresoPrestamosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('IngresoPrestamosCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification) {
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = trabajador.totalPrestamos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

    $scope.openPrestamo = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-prestamo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPrestamosCtrl',
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
    };

    $scope.openDetallePrestamos = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-prestamos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetallePrestamosCtrl',
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

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.prestamos().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.openDetallePrestamos( response );
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormDetallePrestamosCtrl', function ($rootScope, $uibModal, $filter, $scope, $uibModalInstance, objeto, prestamo, trabajador, Notification) { 
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);

    function cargarDatos(tra){
      $rootScope.cargando=true;
      var datos = trabajador.prestamos().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
      });
    };

    $scope.detalleCuotas = function(pres){
      $rootScope.cargando=true;
      var datos = prestamo.datos().get({sid: pres.sid});
      datos.$promise.then(function(response){
        openDetalleCuotas( response );
        $rootScope.cargando=false;
      });
    }

    $scope.editar = function(pres, tra){
      $rootScope.cargando=true;
      var datos = prestamo.datos().get({sid: pres.sid});
      datos.$promise.then(function(response){
        openPrestamo( response );
        $rootScope.cargando=false;
      });
    };

    function openDetalleCuotas(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-cuotas.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCuotasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (object) {
      }, function () {
        javascript:void(0)
      });
    };

    function openPrestamo(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-prestamo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPrestamosCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(object.sidTrabajador);              
      }, function () {
        javascript:void(0)
      });
    };

    $scope.eliminar = function(pres, tra){
      $rootScope.cargando=true;
      $scope.result = prestamo.datos().delete({ sid: pres.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(tra);
        }
      });
    }    

  })
  .controller('FormDetalleCuotasCtrl', function ($rootScope, Notification, $scope, $uibModalInstance, objeto, fecha) {

    $scope.prestamo = objeto;
    if($scope.prestamo.id){
      for(var i=0; i<$scope.prestamo.detalleCuotas.length; i++){
        $scope.prestamo.detalleCuotas[i].mes = fecha.convertirFecha($scope.prestamo.detalleCuotas[i].mes);
      }
    }

    $scope.obtenerMesTexto = function(date){
      return fecha.obtenerMesTexto(date.getMonth()) + " " + date.getFullYear();
    }

  })
  .controller('FormPrestamosCtrl', function ($rootScope, Notification, $scope, $uibModalInstance, objeto, prestamo, fecha, $uibModal, $filter, moneda) {

    $scope.monedaActual = 'pesos';   
    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    $scope.uf = $rootScope.globals.indicadores.uf.valor;
    $scope.utm = $rootScope.globals.indicadores.utm.valor;
    
    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }

    if(objeto.trabajador){
      $scope.trabajador = angular.copy(objeto.trabajador);
      $scope.prestamo = angular.copy(objeto);
      $scope.prestamo.primeraCuota = fecha.convertirFecha($scope.prestamo.primeraCuota);      
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Préstamo';
      switch($scope.prestamo.moneda){
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
    }else{
      $scope.prestamo = { moneda : $scope.monedas[0].nombre };      
      $scope.trabajador = angular.copy(objeto);
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Préstamo';
    }

    $scope.cambiarMoneda = function(){
      $scope.prestamo.monto = null;  
      switch($scope.prestamo.moneda){
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

    $scope.guardar = function(prest, trabajador){

      $rootScope.cargando=true;
      var response;
      var cuotas = calcularCuotas();
      var Prestamo = { idTrabajador : trabajador.id, glosa : prest.glosa, nombreLiquidacion : prest.nombreLiquidacion, moneda : prest.moneda, monto : prest.monto, cuotas : prest.cuotas, primeraCuota : prest.primeraCuota, ultimaCuota : cuotas.ultimaCuota, detalleCuotas : cuotas.detalleCuotas, prestamoCaja : prest.prestamoCaja, leassingCaja : prest.leassingCaja };
      if( $scope.prestamo.sid ){
        response = prestamo.datos().update({sid:$scope.prestamo.sid}, Prestamo);
      }else{
        response = prestamo.datos().create({}, Prestamo);
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, sidTrabajador : trabajador.sid });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    }

    function calcularCuotas(){
      var monto = parseInt($scope.prestamo.monto);
      var cuotas = parseInt($scope.prestamo.cuotas);      
      var exacto = 0;
      var prestamo = { glosa : $scope.prestamo.glosa, monto : $scope.prestamo.monto, moneda : $scope.prestamo.moneda, detalleCuotas : [] };

      if(monto % cuotas === 0){        
        for(var i=0; i<cuotas; i++){
          var valor = (monto / cuotas);
          var primeraCuota = new Date($scope.prestamo.primeraCuota);
          var fecha = new Date(primeraCuota.setMonth(primeraCuota.getMonth()+i));
          var cuot = { mes : fecha, numero : (i+1), monto : valor };
          prestamo.detalleCuotas.push(cuot);
        }
      }else{
        for(var i=1; i<=cuotas; i++){
          exacto = monto + i;
          if(exacto % cuotas === 0){
            break;
          }
        }              
        for(var i=0; i<cuotas; i++){
          if((i+1)===cuotas){
            var cantidad = ( monto - exacto);
            var primeraCuota = new Date($scope.prestamo.primeraCuota);
            var valor = ((exacto / cuotas) + cantidad);
            var fecha = new Date(primeraCuota.setMonth(primeraCuota.getMonth()+i));
            var cuot = { mes : fecha, numero : (i+1), monto : valor };
          }else{
            var valor = (exacto / cuotas);
            var primeraCuota = new Date($scope.prestamo.primeraCuota);
            var fecha = new Date(primeraCuota.setMonth(primeraCuota.getMonth()+i));
            var cuot = { mes : fecha, numero : (i+1), monto : valor };
          }  
          prestamo.detalleCuotas.push(cuot);
        }
      }
      prestamo.ultimaCuota = prestamo.detalleCuotas[(prestamo.detalleCuotas.length - 1)].mes;

      return prestamo;
    }

    $scope.detalleCuotas = function(){
      var datos = calcularCuotas();
      openDetalleCuotas(datos);
    }

    $scope.openPrestamo = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-prestamo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPrestamosCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (object) {
        Notification.success({message: object.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(object.sidTrabajador);                 
      }, function () {
        javascript:void(0)
      });
    };

    function openDetalleCuotas(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-cuotas.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCuotasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (object) {
      }, function () {
        javascript:void(0)
      });
    };


    // Fecha 

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };  

    $scope.openFecha = function() {
      $scope.popupFecha.opened = true;
    };

    $scope.openFechaMes = function() {
      $scope.popupFechaMes.opened = true;
    };

    $scope.dateOptionsMes = {
      showWeeks: false,
      viewMode: "months", 
      minMode: 'month',
      format: "mm/yyyy"
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFecha = {
      opened: false
    };

    $scope.popupFechaMes = {
      opened: false
    };

  });