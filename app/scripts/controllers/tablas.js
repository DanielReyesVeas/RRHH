'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TablasCtrl
 * @description
 * # TablasCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TablasCtrl', function ($rootScope, $uibModal, $location, $anchorScroll, Notification, $scope, tabla, $filter, $timeout) {

    $anchorScroll();

    $scope.advertencia = "Recuerde que cualquier eliminación o cambio de códigos afecta directamente el pago de las cotizaciones previsionales del sistema.";

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = tabla.datos().get();
      datos.$promise.then(function(response){        
        $scope.accesos = response.accesos;
        $scope.tablas = response.datos;
        $scope.recaudadores = response.recaudadores;
        $scope.misTablas = arrayTablas();
        $rootScope.cargando=false;
        if( $scope.tablaActiva.id ){
           var obj = $filter('filter')( $scope.tablas, {id : $scope.tablaActiva.id }, true)[0];
           if( obj ){
              $timeout(function(){
                obj.isOpen=true;
                $anchorScroll($scope.tablaActiva.id);
              }, 1000);              
           }
        }
      })
    };

    $scope.tablaActiva={};


    cargarDatos();

    function arrayTablas(){
      $scope.array = [];
      for(var i=0, len=$scope.tablas.length; i<len; i++){
        var id = $scope.tablas[i].id;
        $scope.array[id] = [];
        for(var j=0, leng=$scope.tablas[i].glosas.length; j<leng; j++){          
          for(var k=0, length=$scope.tablas[i].glosas[j].codigos.length; k<length; k++){
            $scope.array[id].push($scope.tablas[i].glosas[j].codigos[k].recaudador_id);
          }
        }
      }
      return $scope.array;
    }

    $scope.fnRecaudadores = function(tabla){
      return function(item) {
        if($scope.misTablas[tabla].indexOf(item.id) >= 0){
          return true;
        }else{
          return false;
        }
      }
    }

    $scope.editarTabla = function(id, tablaOb){
      $rootScope.cargando=true;
      var datos = tabla.datos().get({id: id});
      datos.$promise.then(function(response){
        $scope.tablaActiva = tablaOb;
        $scope.openTabla(response);
        $rootScope.cargando=false;
      });
    }

    $scope.openTabla = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-edicion-tabla.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTablasCtrl',
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
    }


  })
  .controller('FormTablasCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, Notification, recaudador, tabla, codigo) {    
    
    $scope.edicionTabla = false;
    $scope.confirmacion = "La eliminación o cambio de códigos afecta directamente el pago de las cotizaciones previsionales mediante la generación de los archivos planos. ¿Ud. se encuentra seguro y responsable de efectuar las siguientes modificaciones?";
    
    if(objeto){
      $scope.tabla = angular.copy(objeto.datos);
      $scope.recaudadores = angular.copy(objeto.recaudadores);
    }
    $scope.input = []
    $scope.isEdit = [];    

    function agregarRecaudador(rec){      
      rec.codigo = "";
      rec.recaudador_id = rec.id;
      for(var i=0,len=$scope.tabla.glosas.length; i<len; i++){
        var id = 999900 + i;
        rec.glosa_id = $scope.tabla.glosas[i].id;
        rec.id = id;
        $scope.tabla.glosas[i].codigos.push(angular.copy(rec));
      }
      arrayTablas();
      $scope.edicionTabla = true;
    }

    arrayTablas();

    function crearModels(){
      for(var i=0, len=$scope.tabla.glosas.length; i<len; i++){
        for(var j=0,leng=$scope.tabla.glosas[i].codigos.length; j<leng; j++){
          var index = $scope.tabla.glosas[i].codigos[j].id;
          $scope.isEdit[index] = false;
          $scope.input[index] = $scope.tabla.glosas[i].codigos[j].codigo;
          $scope.tabla.glosas[i].codigos[j].glosa = i;
          $scope.tabla.glosas[i].codigos[j].cod = j;
        }
      }
    }

    function arrayTablas(){
      $scope.array = [];
      for(var j=0, leng=$scope.tabla.glosas.length; j<leng; j++){          
        for(var k=0, length=$scope.tabla.glosas[j].codigos.length; k<length; k++){
          $scope.array.push($scope.tabla.glosas[j].codigos[k].recaudador_id);
        }
      }
      crearModels();
      return $scope.array;
    }

    $scope.fnRecaudadores = function(){
      return function(item) {
        if($scope.array.indexOf(item.id) >= 0){
          return true;
        }else{
          return false;
        }
      }
    }

    function crearCodigos(glosa){
      var tabla = { datos : [] };
      $rootScope.cargando=true;
      for(var i=0, len=$scope.recaudadores.length; i<len; i++){
        if($scope.array.indexOf($scope.recaudadores[i].id) >= 0){
          tabla.datos.push({ glosa_id : glosa.id, recaudador_id : $scope.recaudadores[i].id, codigo : null });
        }
      }
      var datos = codigo.masivo().post({}, tabla);
      datos.$promise.then(function(response){
      if(response.success){
        $rootScope.cargando = false;
        cargarDatos(); 
      }else{
        // error
        $scope.erroresDatos = response.errores;
        Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
      }
      });
    }

    $scope.agregarCodigo = function(tabla){
      $rootScope.cargando=true;
      var datos = recaudador.datos().get();
      datos.$promise.then(function(response){
        $scope.openRecaudador(response, tabla);
        $rootScope.cargando=false;
      });
    }

    $scope.openGlosa = function (obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-glosa.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormGlosasCtrl',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        crearCodigos(obj.glosa);
        $scope.edicionTabla = true;
        cargarDatos();        
      }, function () {
        javascript:void(0)
      });
    };    

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = tabla.datos().get({id: $scope.tabla.id});
      datos.$promise.then(function(response){
        $scope.tabla = response.datos;
        $scope.recaudadores = response.recaudadores;
        $rootScope.cargando=false;
        arrayTablas();
      });
    }

    $scope.openRecaudador = function (obj, tab) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-codigo.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCodigosCtrl',
        resolve: {
          objeto: function () {
            return obj;
          },
          tabla: function () {
            return tab;
          }
        }
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();        
        $scope.edicionTabla = true;
      }, function () {
        javascript:void(0)
      });
    };

    $scope.editar = function(index, glo, cod){
      if($scope.isEdit[index]){
        $scope.tabla.glosas[glo].codigos[cod].codigo = $scope.input[index];
        $scope.isEdit[index] = false;
        $scope.edicionTabla = true;
      }else{
        crearModels();
        $scope.isEdit[index] = true;
      }
    }

    $scope.eliminar = function(id){
      console.log(id)
    }

    $scope.guardarEdicion = function(){
      var tabla = { datos : [] };
      $rootScope.cargando=true;

      for(var i=0,len=$scope.tabla.glosas.length; i<len; i++){
        for(var j=0,leng=$scope.tabla.glosas[i].codigos.length; j<leng; j++){
          var cod = $scope.tabla.glosas[i].codigos[j];
          tabla.datos.push({ id : cod.id, glosa_id : cod.glosa_id, recaudador_id : cod.recaudador_id, codigo : cod.codigo });
        }
      }

      var datos = codigo.updateMasivo().post({}, tabla);
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
  .controller('FormGlosasCtrl', function ($rootScope, Notification, $scope, $uibModal, $uibModalInstance, objeto, tabla, glosa) {   

    $scope.confirmacion = "La eliminación o cambio de códigos afecta directamente el pago de las cotizaciones previsionales mediante la generación de los archivos planos. ¿Ud. se encuentra seguro y responsable de efectuar las siguientes modificaciones?";
    $scope.tabla = objeto;

    $scope.guardar = function (glo) {
      $rootScope.cargando=true;
      var response;
      var glos = { tipo_estructura_id : $scope.tabla.id , glosa : glo.glosa };
      response = glosa.datos().create({}, glos);
      response.$promise.then(
        function(response){
          if(response.success){
            glos.id = response.id;
            $uibModalInstance.close({ mensaje : response.mensaje, glosa : glos });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    }; 

  })
  .controller('FormCodigosCtrl', function ($rootScope, $location, Notification, $scope, $injector, $uibModal, $uibModalInstance, objeto, tabla, codigo) {   

    $scope.confirmacion = "La eliminación o cambio de códigos afecta directamente el pago de las cotizaciones previsionales mediante la generación de los archivos planos. ¿Ud. se encuentra seguro y responsable de efectuar las siguientes modificaciones?"; 
    $scope.tabla = angular.copy(tabla);
    $scope.recaudadores = angular.copy(objeto.datos);

    $scope.isRecaudadores = false;

    arrayTablas();

    function arrayTablas(){
      $scope.array = [];
      for(var j=0, leng=$scope.tabla.glosas.length; j<leng; j++){          
        for(var k=0, length=$scope.tabla.glosas[j].codigos.length; k<length; k++){
          $scope.array.push($scope.tabla.glosas[j].codigos[k].recaudador_id);
        }
      }
      return $scope.array;
    }

    $scope.fnRecaudadores = function(){
      return function(item) {
        if($scope.array.indexOf(item.id) >= 0){
          return false;
        }else{
          $scope.isRecaudadores = true;
          return true;
        }
      }
    }

    $scope.redirigir = function(){
      var $uibModalStack = $injector.get('$uibModalStack');
      $uibModalStack.dismissAll();
      $location.path("recaudadores");
    }

    $scope.guardar = function (cod) {
      $rootScope.cargando=true;
      var tabla = { datos : [] };
      var response;

      for(var i=0,len=$scope.tabla.glosas.length; i<len; i++){
        tabla.datos.push({ glosa_id : $scope.tabla.glosas[i].id, recaudador_id : cod.recaudador.id, codigo : null });
      }

      response = codigo.masivo().post({}, tabla);
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
    }; 

  });
