'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:IngresoLicenciasCtrl
 * @description
 * # IngresoLicenciasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('IngresoLicenciasCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, licencia, constantes, $rootScope, Notification) {
    $anchorScroll();
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = trabajador.totalLicencias().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

    $scope.open = function(){
      $rootScope.cargando=true;
      var datos = licencia.datos().get({sid: 0});
      datos.$promise.then(function(response){        
        $rootScope.cargando=false;
        openLicencia(response);
      })
    }

    function openLicencia(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-licencia.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormLicenciasCtrl',
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

    $scope.openDetalleLicencias = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-licencias.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleLicenciasCtrl',
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
      var datos = trabajador.licencias().get({sid: sid});
      datos.$promise.then(function(response){
        $scope.openDetalleLicencias( response );
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormDetalleLicenciasCtrl', function ($rootScope, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, licencia, trabajador) { 
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);    

    function cargarDatos(tra){
      $rootScope.cargando=true;
      var datos = trabajador.licencias().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
      });
    };

    $scope.editar = function(lic, tra){
      $rootScope.cargando=true;
      var datos = licencia.datos().get({sid: lic.sid});
      datos.$promise.then(function(response){
        $scope.openLicencia( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(lic, tra){
      $rootScope.cargando=true;
      $scope.result = licencia.datos().delete({ sid: lic.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(tra);
        }
      });
    }

    $scope.openLicencia = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-licencia.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormLicenciasCtrl',
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

  })
  .controller('FormLicenciasCtrl', function ($rootScope, Notification, trabajador, $scope, $uibModalInstance, objeto, licencia, fecha) {
    var mesActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo;

/*
    if(objeto.trabajador){
      $scope.trabajador = angular.copy(objeto.trabajador);
      $scope.licencia = angular.copy(objeto);
      $scope.licencia.desde = fecha.convertirFecha($scope.licencia.desde);
      $scope.licencia.hasta = fecha.convertirFecha($scope.licencia.hasta);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Licencia Médica';
    }else{
      $scope.trabajador = angular.copy(objeto);
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Licencia Médica';
      $scope.licencia = { desde : fecha.fechaActiva(), hasta : fecha.fechaActiva() };
    }*/

    $scope.selectedDates = [];
    var disabledDates = [];
    $scope.totalDias = 0;
    $scope.activeDate = fecha.fechaActiva();
    var ultimoMes = $rootScope.globals.currentUser.empresa.ultimoMes.fechaRemuneracion;
    var primerMes = $rootScope.globals.currentUser.empresa.primerMes.mes;
    $scope.isTrabajador = false;

    if(objeto.datos){
      $scope.titulo = 'Licencias Médicas';
      $scope.encabezado = 'Modificación Licencia Médica';
      $scope.licencia = angular.copy(objeto.datos)
      $scope.isEdit = true;
    }else{
      $scope.isEdit = false;
      $scope.licencia = { observacion : null };
      $scope.trabajadores = angular.copy(objeto.trabajadores);
      $scope.titulo = 'Licencias Médicas';
      $scope.encabezado = 'Nueva Licencia Médica';
    }

    $scope.options = {
      startingDay:1,      
      dateDisabled: disabled,
      maxDate: fecha.convertirFecha(ultimoMes),
      minDate: fecha.convertirFecha(primerMes),
      customClass: function(data) {
        if($scope.selectedDates.indexOf(data.date.setHours(0, 0, 0, 0)) > -1) {
          return 'selected';
        }
        return '';
      }
    }    

    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return disabledDates.indexOf(data.date.setHours(0, 0, 0, 0)) > -1;
    }

    $scope.removeFromSelected = function(dt) {
      var otherDate;
      if($scope.selectedDates.length>1){
        if($scope.selectedDates.indexOf(dt)==1){
          otherDate = $scope.selectedDates[0];
        }else{
          otherDate = $scope.selectedDates[1];
        }
        $scope.selectedDates = [otherDate];
        $scope.activeDate = otherDate;
      }else{
        $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
        $scope.activeDate = null;
      }
    }

    $scope.select = function(){
      $scope.totalDias = contarDias();
      $scope.isSelect = ($scope.selectedDates.length > 0);
    }

    function contarDias(){
      var cont = 0;
      for(var i=0,len=$scope.selectedDates.length; i<len; i++){
        cont++;
      }
      return cont;
    }

    function contarDiasMes(desde, hasta){
      desde = fecha.convertirFecha(desde);
      hasta = fecha.convertirFecha(hasta);
      var nuevaFecha, tiempo;
      var i=0, cont=0;
      do{     
        nuevaFecha = angular.copy(desde);
        tiempo = (i * 86400);
        nuevaFecha.setSeconds(tiempo);
        cont++;
        i++;
      }while(nuevaFecha.setHours(0, 0, 0, 0)!=hasta.setHours(0, 0, 0, 0))

      return cont;
    }

    function crearModels(datos){
      var licencias = [];
      for(var i=0,len=datos.licencias.length; i<len; i++){
        var desde = fecha.convertirFecha(datos.licencias[i].desde);
        var hasta = fecha.convertirFecha(datos.licencias[i].hasta);
        var nuevaFecha, tiempo;
        var k=0;
        do{     
          nuevaFecha = angular.copy(desde);
          tiempo = (k * 86400);
          nuevaFecha.setSeconds(tiempo);
          licencias.push(nuevaFecha.setHours(0, 0, 0, 0));
          k++;
        }while(nuevaFecha.setHours(0, 0, 0, 0)!=hasta.setHours(0, 0, 0, 0))
      }
      console.log(licencias)
      return licencias;
    }

    $scope.selectTrabajador = function(){
      $rootScope.cargando=true;
      var datos = trabajador.licencias().get({sid: $scope.licencia.trabajador.sid});
      datos.$promise.then(function(response){
        disabledDates = crearModels(response.datos);
        $scope.isTrabajador = true;
        $scope.trabajador = response.datos;
        $rootScope.cargando=false;
      });
    }

    function crearObjeto(){   
      var mes, desde, hasta;
      var arr = []; 

      if($scope.selectedDates.length==1){
        var desde = fecha.convertirFechaFormato($scope.selectedDates[0]);
        var obj = { idTrabajador : $scope.trabajador.id, observacion : $scope.licencia.observacion, codigo : $scope.licencia.codigo, mes : fecha.convertirFechaFormato((fecha.obtenerMes(desde))), desde : desde, hasta : desde, dias : 1 };
        arr.push(obj);
      }else{        
        var mesGuardado;
        var mesAnterior = null;
        $scope.selectedDates.sort();
        for(var i=0,len=$scope.selectedDates.length; i<len; i++){
          mes = new Date($scope.selectedDates[i]).getMonth();

          if(i==0){
            desde = fecha.convertirFechaFormato($scope.selectedDates[0]);
          }else{
            if(mes==mesAnterior){       
              if((i + 1)==len){
                if(mesGuardado!=mes){   
                  var obj = {};
                  obj.mes = fecha.convertirFechaFormato((fecha.obtenerMes(desde)));
                  obj.desde = desde;
                  obj.idTrabajador = $scope.trabajador.id;
                  obj.observacion = $scope.licencia.observacion;
                  obj.codigo = $scope.licencia.codigo;
                  obj.hasta = fecha.convertirFechaFormato($scope.selectedDates[i]);
                  obj.dias = contarDiasMes(obj.desde, obj.hasta);
                  desde = fecha.convertirFechaFormato($scope.selectedDates[i]);
                  mesGuardado = obj.mes;
                  arr.push(obj);
                }
              }
            }else{
              if(mes!=mesGuardado){
                var obj = {};
                obj.mes = fecha.convertirFechaFormato((fecha.obtenerMes(desde)));
                obj.desde = desde;
                obj.idTrabajador = $scope.trabajador.id;
                obj.observacion = $scope.licencia.observacion;
                obj.codigo = $scope.licencia.codigo;
                obj.hasta = fecha.convertirFechaFormato($scope.selectedDates[i-1]);
                obj.dias = contarDiasMes(obj.desde, obj.hasta);
                mesGuardado = obj.mes;
                arr.push(obj);
                desde = fecha.convertirFechaFormato($scope.selectedDates[i]);
              }
            }
          }
          mesAnterior = mes;
        }
      }
      return arr;
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      var licen = crearObjeto();    
      var response;

      console.log(licen)

      if( $scope.licencia.sid ){
        response = licencia.datos().update({sid:$scope.licencia.sid}, licen);
      }else{
        response = licencia.datos().create({}, licen);
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

    $scope.calcularDias = function(){
      if($scope.licencia.desde && $scope.licencia.hasta){
        if($scope.licencia.desde == $scope.licencia.hasta){
          $scope.licencia.dias = 1;
        }else{
          $scope.licencia.dias = (($scope.licencia.hasta - $scope.licencia.desde) / 86400000 + 1);
        }
      }
    }

    // Fecha
    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: fecha.convertirFecha(mesActual.fechaRemuneracion),
      minDate: fecha.convertirFecha(mesActual.mes),
      startingDay: 1
    };  

    $scope.openFechaHasta = function() {
      $scope.popupFechaHasta.opened = true;
    };

    $scope.openFechaDesde = function() {
      $scope.popupFechaDesde.opened = true;
    };

    $scope.format = ['dd-MMMM-yyyy'];

    $scope.popupFechaHasta = {
      opened: false
    };
    $scope.popupFechaDesde = {
      opened: false
    };

  });

