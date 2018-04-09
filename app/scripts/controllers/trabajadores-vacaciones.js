'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:VacacionesCtrl
 * @description
 * # VacacionesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TrabajadoresVacacionesCtrl', function ($scope, anio, $uibModal, $filter, fecha, $anchorScroll, trabajador, constantes, $rootScope, Notification, vacaciones) {
    
    $anchorScroll();
    $scope.objeto = [];
    $scope.isSelect = false;
    $scope.cargado = false;
    $scope.empresa = $rootScope.globals.currentUser.empresa;

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = trabajador.trabajadoresVacaciones().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    $scope.calendario = function(){
      $rootScope.cargando = true;
      var datos = anio.calendario().get();
      datos.$promise.then(function(response){
        $scope.anios = response.anios;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
        open($scope.anios, $scope.accesos)
      });
    }

    function open(anios, accesos){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-calendario-semana-corrida.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCalendarioFeriadosCtrl',
        resolve: {
          accesos: function () {
            return accesos;          
          },
          anios: function () {
            return anios;          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();         
      }, function () {
      });
    };

    $scope.detalle = function(obj){
      $rootScope.cargando=true;
      var datos = trabajador.vacaciones().get({sid: obj.sid});
      datos.$promise.then(function(response){
        var tomadas = crearModels(response.datos);
        openDetalleVacaciones( response, tomadas );
        $rootScope.cargando=false;
      });
    }

    function crearModels(datos){
      var tomadas = [];
      for(var i=0,len=datos.vacaciones.length; i<len; i++){
        for(var j=0,leng=datos.vacaciones[i].tomaVacaciones.length; j<leng; j++){
          var desde = fecha.convertirFecha(datos.vacaciones[i].tomaVacaciones[j].desde);
          var hasta = fecha.convertirFecha(datos.vacaciones[i].tomaVacaciones[j].hasta);
          var nuevaFecha, tiempo;
          var k=0;
          do{     
            nuevaFecha = angular.copy(desde);
            tiempo = (k * 86400);
            nuevaFecha.setSeconds(tiempo);
            tomadas.push(nuevaFecha.setHours(0, 0, 0, 0));
            k++;
          }while(nuevaFecha.setHours(0, 0, 0, 0)!=hasta.setHours(0, 0, 0, 0))
        }
      }
      return tomadas;
    }

    function openDetalleVacaciones(obj, tomadas){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-vacaciones.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleVacacionesCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          tomadas: function () {
            return tomadas;          
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

    cargarDatos();

  })
  .controller('FormCalendarioFeriadosCtrl', function ($rootScope, anio, fecha, anios, accesos, $uibModal, $filter, Notification, $scope, $uibModalInstance) { 
    
    var anioActual = $rootScope.globals.currentUser.empresa.mesDeTrabajo.idAnio;
    $scope.anios = angular.copy(anios);
    $scope.calendario = { anio : $filter('filter')( $scope.anios, {id : anioActual }, true )[0] };
    $scope.accesos = angular.copy(accesos);

    function cargarDatos(anioActual){
      $rootScope.cargando = true;
      var datos = anio.calendarioVacaciones().get();
      datos.$promise.then(function(response){
        $scope.anios = response.anios;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
      });
      anioActual = anioActual;
      $scope.selectAnio();
    }

    $scope.selectAnio = function(){
      $scope.calendario = { anio : $filter('filter')( $scope.anios, {id : anioActual }, true )[0] };
      $scope.meses = $scope.calendario.anio.meses;
    }

    $scope.detalle = function(obj){
      if(obj.feriados.length>0){
        for(var i=0,len=obj.feriados.length; i<len; i++){
          obj.feriados[i] = fecha.convertirFecha(obj.feriados[i]).setHours(0, 0, 0, 0);         
        }
      }
      openMes(obj);
    }

    function openMes(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-mes-festivos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMesFestivosVacacionesCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          anioActual: function () {
            return $scope.calendario.anio;          
          }
        }
      });
      miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(obj.anio);
      }, function () {
      });
    };

    $scope.selectAnio();

  })
  .controller('FormMesFestivosVacacionesCtrl', function ($rootScope, anio, anioActual, fecha, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, trabajador) { 

    $scope.titulo = "Vacaciones";
    $scope.mes = angular.copy(objeto);
    $scope.selectedDates = angular.copy($scope.mes.feriados);
    $scope.anioActual = angular.copy(anioActual);
    $scope.activeDate = fecha.convertirFecha($scope.mes.mes).setHours(0, 0, 0, 0);

    $scope.options = {
      startingDay:1,
      minDate: fecha.convertirFecha($scope.mes.mes),
      maxDate: fecha.convertirFecha($scope.mes.fechaRemuneracion),
      customClass: function(data) {
        if($scope.selectedDates.indexOf(data.date.setHours(0, 0, 0, 0)) > -1) {
          return 'selected';
        }
        return '';
      }
    }
        
    $scope.removeFromSelected = function(dt) {
      $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
      $scope.activeDate = dt;
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      var response;
      var feriados = [];
      for(var i=0,len=$scope.selectedDates.length; i<len; i++){
        feriados.push(fecha.convertirFechaFormato($scope.selectedDates[i]));
      }
      var obj = { feriados : feriados, anio : $scope.anioActual, mes : $scope.mes };
      response = anio.feriadosVacaciones().post({}, obj);
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, anio : response.anio});
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
  .controller('FormDetalleTomaVacacionesCtrl', function ($rootScope, vacaciones, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, trabajador) { 

    $scope.trabajador = angular.copy(trabajador);
    $scope.vacaciones = angular.copy(objeto.datos);

    function cargarDatos(vac){
      $rootScope.cargando = true;
      var datos = vacaciones.datos().get({ sid : vac.sid});
      datos.$promise.then(function(response){
        $scope.vacaciones = response.datos;
        $rootScope.cargando = false;
        if($scope.vacaciones.tomaVacaciones.length==0){
          $uibModalInstance.close($scope.trabajador);
        }
      });
    }

    $scope.eliminar = function(dato){
      $rootScope.cargando = true;
      var vac = { sid : dato.sid };
      var datos = vacaciones.eliminarTomaVacaciones().post({}, vac);
      datos.$promise.then(function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(response.vacaciones);
        }
      })
    }

  })
  .controller('FormDetalleVacacionesCtrl', function ($rootScope, vacaciones, fecha, tomadas, $uibModal, $filter, Notification, $scope, $uibModalInstance, objeto, trabajador) { 
    
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);
    $scope.mes = angular.copy(objeto.datos.vacacionesMesActual);
    $scope.vacaciones = { dias : null };
    $scope.tomadas = angular.copy(tomadas);

    function cargarDatos(tra){
      $rootScope.cargando=true;
      var datos = trabajador.vacaciones().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.mes = response.datos.vacacionesMesActual;
        $scope.accesos = response.accesos;
        $scope.tomadas = crearModels(response.datos);
        $rootScope.cargando=false;
      });
    };

    function crearModels(datos){
      var tomadas = [];
      for(var i=0,len=datos.vacaciones.length; i<len; i++){
        for(var j=0,leng=datos.vacaciones[i].tomaVacaciones.length; j<leng; j++){
          var desde = fecha.convertirFecha(datos.vacaciones[i].tomaVacaciones[j].desde);
          var hasta = fecha.convertirFecha(datos.vacaciones[i].tomaVacaciones[j].hasta);
          var nuevaFecha, tiempo;
          var k=0;
          do{     
            nuevaFecha = angular.copy(desde);
            tiempo = (k * 86400);
            nuevaFecha.setSeconds(tiempo);
            tomadas.push(nuevaFecha.setHours(0, 0, 0, 0));
            k++;
          }while(nuevaFecha.setHours(0, 0, 0, 0)!=hasta.setHours(0, 0, 0, 0))
        }
      }
      return tomadas;
    }

    $scope.recalculoVacaciones = function(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-recalculo-vacaciones.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormRecalculoVacacionesCtrl',
        resolve: {
          objeto: function () {
            return $scope.trabajador;          
          }
        }
      });
     miModal.result.then(function (dias) {
        recalcular(dias);         
      }, function () {
        javascript:void(0);
      });
    }

    function recalcular(dias){
      $rootScope.cargando=true;
      var objeto = { sid : $scope.trabajador.sid, dias : dias };
      var datos = vacaciones.recalcular().post({}, objeto);
      datos.$promise.then(function(response){
        $rootScope.cargando=false;
        cargarDatos($scope.trabajador.sid);
      }); 
    }

    $scope.ingresarVacaciones = function(){
      openIngresarVacaciones();
    }

    function openIngresarVacaciones(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-ingreso-vacaciones.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresoVacacionesCtrl',
        resolve: {
          objeto: function () {
            return $scope.trabajador;          
          },
          tomadas: function () {
            return $scope.tomadas;          
          }
        }
      });
     miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(obj.sidTrabajador);         
      }, function () {
        javascript:void(0);
      });
    }

    $scope.detalle = function(vac){
      $rootScope.cargando = true;
      var datos = vacaciones.datos().get({ sid : vac.sid});
      datos.$promise.then(function(response){
        openDetalle(response);
        $rootScope.cargando = false;
      });
    }

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-toma-vacaciones.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleTomaVacacionesCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          trabajador: function () {
            return $scope.trabajador;          
          },
        }
      });
     miModal.result.then(function (obj) {
        if(obj.mensaje){
          Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        }
        cargarDatos($scope.trabajador.sid);         
      }, function () {
        cargarDatos($scope.trabajador.sid);   
      });
    }

  })
  .controller('FormRecalculoVacacionesCtrl', function ($rootScope, $uibModal, objeto, $filter, $scope, $uibModalInstance) { 
    
    $scope.trabajador = angular.copy(objeto);
    $scope.vacaciones = { dias : $scope.trabajador.vacacionesIniciales };

    $scope.recalcular = function(){
      $uibModalInstance.close($scope.vacaciones.dias);
    }

  })
  .controller('FormIngresoVacacionesCtrl', function ($rootScope, tomadas, fecha, $uibModal, vacaciones, $filter, Notification, $scope, $uibModalInstance, objeto) { 

    $scope.trabajador = angular.copy(objeto);
    $scope.selectedDates = [];
    var disabledDates = angular.copy(tomadas);
    console.log(disabledDates)
    $scope.totalDias = 0;
    $scope.activeDate = fecha.fechaActiva();
    var ultimoMes = $rootScope.globals.currentUser.empresa.ultimoMes.fechaRemuneracion;
    var primerMes = $rootScope.globals.currentUser.empresa.primerMes.mes;
    
    $scope.isSelect = false;

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
        if(new Date($scope.selectedDates[i]).getDay()!=0 && new Date($scope.selectedDates[i]).getDay()!=6){
          cont++;
        }
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
        if(nuevaFecha.getDay()!=0 && nuevaFecha.getDay()!=6){
          cont++;
        }
        i++;
      }while(nuevaFecha.setHours(0, 0, 0, 0)!=hasta.setHours(0, 0, 0, 0))

      return cont;
    }

    function crearObjeto(){   
      var mes, desde, hasta;
      var arr = []; 

      if($scope.selectedDates.length==1){
        var desde = fecha.convertirFechaFormato($scope.selectedDates[0]);
        var obj = { mes : fecha.convertirFechaFormato((fecha.obtenerMes(desde))), desde : desde, hasta : desde, dias : 1 };
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
      var response;
      var obj = crearObjeto();
      var datos = { sid : $scope.trabajador.sid, tomaVacaciones : obj };
      response = vacaciones.tomaVacaciones().post({}, datos);
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, sidTrabajador : response.sidTrabajador });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;       
        }
      );
    }

  });
