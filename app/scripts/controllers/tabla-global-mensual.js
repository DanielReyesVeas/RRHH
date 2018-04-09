'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TablaGlobalMensualCtrl
 * @description
 * # TablaGlobalMensualCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TablaGlobalMensualCtrl', function ($rootScope, $scope, $http, $uibModal, $filter, $anchorScroll, tablaGlobalMensual, moneda, fecha, Notification, mesDeTrabajo, $location, $timeout, $route) {

    $anchorScroll();
    $scope.advertencia = "Recuerde que cualquier modificación en los indicadores previsionales afecta directamente el pago de las cotizaciones previsionales del sistema. ¿Ud. se encuentra seguro y responsable de efectuar modificaciones?";
    $scope.confirmacion = "Los valores han sido modificados. ¿Ud. se encuentra seguro y responsable cambiar los valores de los indicadores?";    
    $scope.nuevo = false;
    if($rootScope.globals.currentUser.empresa){
      $scope.mesDeTrabajo = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
    }
    $scope.isEdit = false;
    $rootScope.cargando= false;
    $scope.indicadores = $rootScope.globals.isIndicadores;
    $scope.cargado = false;

    $scope.inputRTI = [];
    $scope.inputRMI = [];
    $scope.inputAPV = [];
    $scope.inputDC = [];
    $scope.inputSCEmpleador = [];
    $scope.inputSCTrabajador = [];
    $scope.inputTasaAfp = [];
    $scope.inputSIS = [];
    $scope.inputAFMonto = [];
    $scope.inputAFMenor = [];
    $scope.inputAFMayor = [];
    $scope.inputCTPEmpleador = [];
    $scope.inputCTPTrabajador = [];

    function crearModels(){
      for(var i=0, len=$scope.tablas.rentasTopeImponibles.length; i<len; i++){
        $scope.inputRTI[i] = $scope.tablas.rentasTopeImponibles[i].valor;
      }
      for(var i=0, len=$scope.tablas.rentasMinimasImponibles.length; i<len; i++){
        $scope.inputRMI[i] = $scope.tablas.rentasMinimasImponibles[i].valor;
      }
      for(var i=0, len=$scope.tablas.ahorroPrevisionalVoluntario.length; i<len; i++){
        $scope.inputAPV[i] = $scope.tablas.ahorroPrevisionalVoluntario[i].valor;
      }
      for(var i=0, len=$scope.tablas.depositoConvenido.length; i<len; i++){
        $scope.inputDC[i] = $scope.tablas.depositoConvenido[i].valor;
      }
      for(var i=0, len=$scope.tablas.seguroDeCesantia.length; i<len; i++){
        $scope.inputSCEmpleador[i] = $scope.tablas.seguroDeCesantia[i].financiamientoEmpleador;
        $scope.inputSCTrabajador[i] = $scope.tablas.seguroDeCesantia[i].financiamientoTrabajador;
      }
      for(var i=0, len=$scope.tablas.tasaCotizacionObligatorioAfp.length; i<len; i++){
        $scope.inputTasaAfp[i] = $scope.tablas.tasaCotizacionObligatorioAfp[i].tasaAfp;
        $scope.inputSIS[i] = $scope.tablas.tasaCotizacionObligatorioAfp[i].sis;
      }
      for(var i=0, len=$scope.tablas.asignacionFamiliar.length; i<len; i++){
        $scope.inputAFMonto[i] = $scope.tablas.asignacionFamiliar[i].monto;
        $scope.inputAFMenor[i] = $scope.tablas.asignacionFamiliar[i].rentaMenor;
        $scope.inputAFMayor[i] = $scope.tablas.asignacionFamiliar[i].rentaMayor;
      }
      for(var i=0, len=$scope.tablas.cotizacionTrabajosPesados.length; i<len; i++){
        $scope.inputCTPEmpleador[i] = $scope.tablas.cotizacionTrabajosPesados[i].financiamientoEmpleador;
        $scope.inputCTPTrabajador[i] = $scope.tablas.cotizacionTrabajosPesados[i].financiamientoTrabajador;
      }
    }  

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado = false;
      var datos = tablaGlobalMensual.tablas().get();
      datos.$promise.then(function(response){        
        $scope.tablas = response.datos;
        $scope.accesos = response.accesos;
        $scope.ufAnterior = response.ufAnterior;
        $rootScope.cargando=false;
        $scope.cargado = true;
        if($rootScope.globals.currentUser.empresa){
          obtenerDatosMes();
          crearModels();
        }
      })
    }    

    if($rootScope.globals.currentUser.empresa){
      if(!$rootScope.globals.isIndicadores){
        openAdvertencia(false);
      }else{
        cargarDatos();         
      }
    }else{
      cargarDatos(); 
    }

    function openAdvertencia(mes) {
      var miModal = $uibModal.open({
        animation: true,
        backdrop: 'static',
        templateUrl: 'views/forms/form-advertencia.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormAdvertenciaCtrl',
        resolve: {
          objeto: function () {
            return mes;
          }
        }
      });
      miModal.result.then(function (obj) {
        $scope.isEdit = false;
        if(obj.isEdit){          
          cargarDatos();
        }else{
          Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
          $timeout(function(){
            $('#main-menu').smartmenus('refresh');
          }, 500); 
          $route.reload();  
          $location.path('/inicio');
        }
      }, function () {
        $scope.cancelar = true;
      });
    };    

    $scope.convertirUF = function(valor){
      return moneda.convertirUF(valor);
    }

    $scope.convertirUFAnterior = function(valor){
      console.log($scope.ufAnterior)
      return ($scope.ufAnterior.valor * valor);
    }

    function obtenerDatosMes(){
      $scope.uf = $rootScope.globals.indicadores.uf.valor;
      $scope.utm = $rootScope.globals.indicadores.utm.valor;
      $scope.uta = $rootScope.globals.indicadores.uta.valor;      

      var mesActual = fecha.convertirFecha($scope.mesDeTrabajo.mes);

      $scope.anioActual = mesActual.getFullYear();
      $scope.mesActual = fecha.obtenerMesTexto(mesActual.getMonth());

      if($scope.mesActual==='Diciembre'){
        $scope.mesAPagar = fecha.obtenerMesTexto((mesActual.getMonth() -11));
        $scope.anioAPagar = ($scope.anioActual + 1);
      }else{
        $scope.mesAPagar = fecha.obtenerMesTexto((mesActual.getMonth() + 1));
        $scope.anioAPagar = $scope.anioActual;
      }

      $scope.ultimoDia = new Date(mesActual.getFullYear(), (mesActual.getMonth() + 1), 0);
    }

    $scope.editar = function(){
      $scope.isEdit = true;
    }

    $scope.cancelar = function(){
      $scope.isEdit = false;   
      crearModels();   
    }

    $scope.editarUFUTM = function(){
      openAdvertencia(true)
    }

    $scope.guardar = function(){
      $rootScope.cargando=true;
      $scope.cargado=false;
      var tablas = { rentasTopeImponibles : [], rentasMinimasImponibles : [], ahorroPrevisionalVoluntario : [], depositoConvenido : [], seguroDeCesantia : [], tasaCotizacionObligatorioAfp : [], asignacionFamiliar : [], cotizacionTrabajosPesados : [] };

      for(var i=0, len=$scope.tablas.rentasTopeImponibles.length; i<len; i++){
        tablas.rentasTopeImponibles.push({ id : $scope.tablas.rentasTopeImponibles[i].id, valor : $scope.inputRTI[i] });
      }
      for(var i=0, len=$scope.tablas.rentasMinimasImponibles.length; i<len; i++){
        tablas.rentasMinimasImponibles.push({ id : $scope.tablas.rentasMinimasImponibles[i].id, valor : $scope.inputRMI[i] });
      }
      for(var i=0, len=$scope.tablas.ahorroPrevisionalVoluntario.length; i<len; i++){
        tablas.ahorroPrevisionalVoluntario.push({ id : $scope.tablas.ahorroPrevisionalVoluntario[i].id, valor : $scope.inputAPV[i] });
      }
      for(var i=0, len=$scope.tablas.depositoConvenido.length; i<len; i++){
        tablas.depositoConvenido.push({ id : $scope.tablas.depositoConvenido[i].id, valor : $scope.inputDC[i] });
      }
      for(var i=0, len=$scope.tablas.seguroDeCesantia.length; i<len; i++){
        tablas.seguroDeCesantia.push({ id : $scope.tablas.seguroDeCesantia[i].id, financiamientoEmpleador : $scope.inputSCEmpleador[i], financiamientoTrabajador : $scope.inputSCTrabajador[i] });
      }
      for(var i=0, len=$scope.tablas.tasaCotizacionObligatorioAfp.length; i<len; i++){
        tablas.tasaCotizacionObligatorioAfp.push({ id : $scope.tablas.tasaCotizacionObligatorioAfp[i].id, tasaAfp : $scope.inputTasaAfp[i], sis : $scope.inputSIS[i] });
      }
      for(var i=0, len=$scope.tablas.asignacionFamiliar.length; i<len; i++){
        tablas.asignacionFamiliar.push({ id : $scope.tablas.asignacionFamiliar[i].id, monto : $scope.inputAFMonto[i], rentaMenor : $scope.inputAFMenor[i], rentaMayor : $scope.inputAFMayor[i] });
      }
      for(var i=0, len=$scope.tablas.cotizacionTrabajosPesados.length; i<len; i++){
        tablas.cotizacionTrabajosPesados.push({ id : $scope.tablas.cotizacionTrabajosPesados[i].id, financiamientoEmpleador : $scope.inputCTPEmpleador[i], financiamientoTrabajador : $scope.inputCTPTrabajador[i] });
      }
     
      var response;      
      response = tablaGlobalMensual.modificar().post({}, tablas);
      $scope.isEdit = false;  
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

    /*
    function openDatosMes(obj, nuevo){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-datos-mes.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDatosMesCtrl',
        resolve: {
          objeto: function () {
            return obj;
          },
          nuevo: function () {
            return nuevo;
          }
        }
      });
      miModal.result.then(function (obj) {   
        $scope.selectMes = true;
        $scope.openTerminos(obj);
      }, function () {
        $scope.cancelar = true;
      });
    };

    $scope.open = function (obj) {
      $scope.cancelar = false;
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-mes.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormMesCtrl',
        size: 'sm',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (obj) {       
        if(obj.accion){
          Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
          openDatosMes(obj.mes, true);
        }else{
          $scope.openTerminos(obj.mes);
        }
      }, function () {
        $scope.cancelar = true;
      });
    };*/

    $scope.openTerminos = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-terminos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTerminosCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (obj) {
        $scope.selectMes = true;
        $scope.tablas = obj.datos.datos;
        obtenerDatosMes(obj);
      }, function () {
        $scope.cancelar = true;
      });
    };

  })
  .controller('FormAdvertenciaCtrl', function ($scope, $http, $rootScope, $uibModalInstance, objeto, $uibModal, $filter, $localStorage, fecha, valorIndicador) {

    $scope.isEdit = angular.copy(objeto);
    $scope.mesActivo = $rootScope.globals.currentUser.empresa.mesDeTrabajo.mesActivo;

    if($scope.isEdit){
      $scope.indicadores = $rootScope.globals.indicadores;
    }

    $scope.guardar = function(indicadores){
      $rootScope.cargando=true;
      var response;
      var valoresIndicadores = [];

      $scope.mesDeTrabajo = $rootScope.globals.currentUser.empresa.mesDeTrabajo;
      var mesActual = fecha.convertirFecha($scope.mesDeTrabajo.mes)
      $scope.ultimoDiaRemuneraciones = new Date(mesActual.getFullYear(), (mesActual.getMonth()+1), 0);

      valoresIndicadores.push({ indicador_id : 1, valor : indicadores.uf.valor, fecha : $scope.ultimoDiaRemuneraciones });
      valoresIndicadores.push({ indicador_id : 2, valor : indicadores.utm.valor, fecha : $scope.ultimoDiaRemuneraciones });
      valoresIndicadores.push({ indicador_id : 3, valor : (indicadores.utm.valor * 12), fecha : $scope.ultimoDiaRemuneraciones });

      response = valorIndicador.masivo().post({}, valoresIndicadores);

      response.$promise.then(
        function(response){
          if(response.success){
            $rootScope.globals.indicadores = response.indicadores;
            $localStorage.globals.indicadores = $rootScope.globals.indicadores;
            $rootScope.globals.isIndicadores = true;
            $uibModalInstance.close({ mensaje : response.mensaje, isEdit : false });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      )
      
    }

    $scope.modificar = function(indicadores){
      $rootScope.cargando=true;
      var indicadores = angular.copy($scope.indicadores);
      indicadores.uta.valor = (indicadores.utm.valor * 12);
      var response;
      response = valorIndicador.modificar().post({}, indicadores);

      response.$promise.then(
        function(response){
          if(response.success){
            $rootScope.globals.indicadores = response.indicadores;
            $localStorage.globals.indicadores = $rootScope.globals.indicadores;
            $uibModalInstance.close({ mensaje : response.mensaje, isEdit : true });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      )
    }

  })
  .controller('FormMesCtrl', function ($scope, $http, $rootScope, $uibModalInstance, objeto, fecha, mesDeTrabajo, $uibModal, $filter ) {

  $scope.mesesDeTrabajo = objeto;
  $scope.noIngresado = "El mes seleccionado no ha sido ingresado correctamente. ¿Desea ingresar los valores necesarios?";

  $scope.isMesIngresado = function(mes){
    if(mes.isIngresado){
      $scope.isIngresado = true;
    }else{
      $scope.isIngresado = false;
    }
  }

  $scope.guardar = function(mes){
    $rootScope.cargando=true;    
    $uibModalInstance.close({ mes : mes, accion : false });
    $rootScope.cargando=false;    
  }

  $scope.cancelar = function(){
    $uibModalInstance.dismiss('cancel');
  }

  $scope.nuevoMes = function(){
    if($scope.nuevo){
      $scope.nuevo = false;
    }else{
      $scope.nuevo = true;
    }      
  }

  // Fecha 

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();
    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      //dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };  

    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.openFechaMes = function() {
      $scope.popupFechaMes.opened = true;
    };

    $scope.dateOptionsMes = {
      showWeeks: false,
      viewMode: "months", 
      minMode: 'month',
      format: "mm/yyyy"
    };

    $scope.setDate = function(year, month) {
      $scope.fecha = new Date(year, month);
    };

    $scope.format = ['MMMM-yyyy'];

    $scope.popupFechaMes = {
      opened: false
    };

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);
        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }

    $scope.agregar = function(mes){
      var remuneracion = new Date(mes.mes.getFullYear(), (mes.mes.getMonth()), 0);
      
      $rootScope.cargando=true;
      var response;
      var nuevoMes = { mes : mes.mes, nombre : fecha.obtenerMesTexto(mes.mes.getMonth()), fechaRemuneracion : remuneracion, ano : mes.mes.getFullYear() };

      if( $scope.mes.id ){
        response = mesDeTrabajo.datos().update({sid: $scope.mes.sid}, nuevoMes);
      }else{
        response = mesDeTrabajo.datos().create({}, nuevoMes);
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

    $scope.openDatosMes = function(obj, nuevo){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-datos-mes.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDatosMesCtrl',
        resolve: {
          objeto: function () {
            return obj;
          },
          nuevo: function () {
            return nuevo;
          }
        }
      });
      miModal.result.then(function (obj) {   
        $scope.selectMes = true;        
        obj.accion = false;        
        $uibModalInstance.close(obj);
      }, function () {
        $scope.cancelar = true;
      });
    };
})
.controller('FormDatosMesCtrl', function ($scope, $http, $rootScope, $uibModalInstance, valorIndicador, objeto, fecha, nuevo, Notification) {
  $scope.mes = objeto;
  $scope.advertencia = "Recuerde que cualquier eliminación o cambio de códigos afecta directamente el pago de las cotizaciones previsionales del sistema.";
  $scope.noMantener = "Ha seleccionado ingresar los indicadores previsionales en forma manual. ¿Desea continuar?";

  if(nuevo){
    var mesActual =  $scope.mes.mes;    
  }else{
    var mesActual =  fecha.convertirFecha($scope.mes.mes);        
  }

  $scope.ultimoDiaRemuneraciones = new Date(mesActual.getFullYear(), (mesActual.getMonth()), 0);

  if($scope.mesDeTrabajo==='Enero'){
    $scope.mesRemuneraciones = fecha.obtenerMesTexto((mesActual.getMonth() + 11));
  }else{
    $scope.mesRemuneraciones = fecha.obtenerMesTexto((mesActual.getMonth() - 1));
  }

  $scope.guardar = function(obj, ultDia){
    if(obj.mantener){
      $rootScope.cargando=true;
      var response;
      var valoresIndicadores = {};

      valoresIndicadores.uf = { indicador_id : 1, valor : obj.uf, fecha : ultDia };
      valoresIndicadores.utm = { indicador_id : 2, valor : obj.utm, fecha : ultDia };
      valoresIndicadores.uta = { indicador_id : 3, valor : (obj.utm * 12), fecha : ultDia };

      var indicadores = { valorIndicadores : valoresIndicadores };

      if( obj.id ){
        response = valorIndicador.masivo().post({}, valoresIndicadores);
      }else{
        response = valorIndicador.masivo().post({}, valoresIndicadores);
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mes : mesActual, datos : indicadores, fechaRemuneracion : ultDia, mensaje : response.mensaje, accion : true });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      )
    }else{
      console.log('noMantener')
    }
  }
})
.controller('FormTerminosCtrl', function ($scope, $http, $rootScope, $uibModalInstance, objeto, tablaGlobalMensual, fecha) {
  
  if(objeto.id){
    var mes = objeto.mes;
    var fechaRemuneracion = objeto.fechaRemuneracion;
  }else{
    var mes = fecha.convertirFechaFormato(objeto.mes);
    var fechaRemuneracion = fecha.convertirFechaFormato(objeto.fechaRemuneracion);
  }

  $scope.aceptar = function(){
    $rootScope.cargando=true;
    var datos = tablaGlobalMensual.tablas().get({fecha: fechaRemuneracion});
    datos.$promise.then(function(response){        
      
      $rootScope.cargando=false;
      $uibModalInstance.close({ datos : response, mes : mes });
    })
  }
});
