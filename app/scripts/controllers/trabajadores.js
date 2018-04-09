'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TrabajadoresCtrl
 * @description
 * # TrabajadoresCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TrabajadoresCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, $rootScope, Notification, plantillaContrato, fecha) {
    $anchorScroll();
    $scope.datos = [];
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = trabajador.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();  

    $scope.importarPlanilla = function () {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-planilla-trabajadores.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlanillaTrabajadoresCtrl',
        size: 'lg'
      });
      miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      }, function () {
        javascript:void(0)
      });
    }  

    $scope.noOcultar = function(){
      var icon = angular.element(document.querySelector('#botonNoOcultar'));
      icon.addClass("active");
    }

    $scope.plantillasContratos = function(){
      $rootScope.cargando=true;
      var datos = plantillaContrato.datos().get();
      datos.$promise.then(function(response){
        openPlantillasContratos(response.datos);
        $rootScope.cargando=false;
      });
    }

    $scope.editar = function(plan){
      $rootScope.cargando=true;
      var datos = plantillaContrato.datos().get({sid: plan.sid});
      datos.$promise.then(function(response){
        $scope.openPlantillaContrato(response.datos);
        $rootScope.cargando=false;
      });
    }

    function openPlantillasContratos(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-tipos-plantillas-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTiposPlantillasContratoCtrl',
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

    $scope.openPlantillaContrato = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-plantilla-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillaContratoCtrl',
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

    $scope.open = function(){
      $rootScope.cargando=true;
      var datos = trabajador.datos().get({sid: 0});
      datos.$promise.then(function(respuesta){        
        $rootScope.cargando=false;
        openForm(respuesta.formulario, null);
      })
    };

    function openForm(form, trab) {
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-nuevo-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTrabajadorCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return trab;
          },
          formulario: function () {
            return form;
          }
        }
      });
      miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        if(obj.contrato){
          cargarDatos();
          openConfirmacionContrato(obj.trabajador);
        }else{
          cargarDatos();
        }
      }, function () {
        javascript:void(0)
      });
    };

    function openConfirmacionContrato(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormConfirmacionContratoCtrl',
        size: 'sm',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function (trab) {
        $scope.generarContrato(trab);            
      }, function () {
        cargarDatos();
      });
    };

    $scope.generarContrato = function(trab){
      $rootScope.cargando=true;
      var datos = plantillaContrato.datos().get();
      datos.$promise.then(function(response){
        clausulas( response.datos, trab );
        $rootScope.cargando=false;
      });
    }

    function clausulas(obj, trab){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-clausulas.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormClausulasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          trab: function () {
            return trab;          
          }
        }
      });     
      miModal.result.then(function (datos) {
        openContrato(datos);
      }, function () {
        javascript:void(0)
      });
    };

    function openContrato(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormContratoCtrl',
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
    };

    $scope.openDetalleTrabajador = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetallesTrabajadoresCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });
      miModal.result.then(function () {
      }, function () {
        javascript:void(0)
      });
    };    

    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = trabajador.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
          if(response.success){
            Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
            cargarDatos();
          }
      });
    };

    $scope.detalle = function(tra){
      $rootScope.cargando=true;
      var datos = trabajador.datos().get({sid:tra.sid});
      datos.$promise.then(function(response){
        $scope.openDetalleTrabajador( response.trabajador );
        $rootScope.cargando=false;
      });
    };

    $scope.editar = function(tra){
      $rootScope.cargando=true;
      var datos = trabajador.datos().get({sid:tra.sid});
      datos.$promise.then(function(response){
        openForm( response.formulario, response.trabajador );
        $rootScope.cargando=false;
      });
    };    

    $scope.contratos = function(tra){
      $rootScope.cargando=true;
      var datos = trabajador.contratos().get({sid:tra.sid});
      datos.$promise.then(function(response){
        openContratos( response );
        $rootScope.cargando=false;
      });
    }

    $scope.fichas = function(tra){
      $rootScope.cargando=true;
      var datos = trabajador.fichas().get({sid:tra.sid});
      datos.$promise.then(function(response){
        openFichas( response );
        $rootScope.cargando=false;
      });
    }

    function openContratos(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-trabajador-contratos.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTrabajadorContratosCtrl',
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
    };

    function openFichas(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-trabajador-fichas.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTrabajadorFichasCtrl',
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
    };

    $scope.toolTipEdicion = function( nombre ){
      return 'Editar los datos del trabajador <b>' + nombre + '</b>';
    };

    $scope.toolTipEliminar = function( nombre ){
      return 'Eliminar al trabajador <b>' + nombre + '</b>';
    };

    $scope.toolTipDetalles = function( nombre ){
      return 'Ver detalles del trabajador <b>' + nombre + '</b>';
    };

    $scope.toolTipContratos = function( nombre ){
      return 'Gestionar contratos del trabajador <b>' + nombre + '</b>';
    };

    $scope.toolTipFichas = function( nombre ){
      return 'Gestionar fichas del trabajador <b>' + nombre + '</b>';
    };

  })
  .controller('FormPlanillaTrabajadoresCtrl', function ($scope, fecha, $uibModal, $uibModalInstance, $http, $filter, constantes, $rootScope, Notification, Upload, trabajador) {
    
    $scope.trabajadores = {};
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
          url: constantes.URL + 'trabajadores/planilla/importar',
          data: { file : file}
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.dynamic = progressPercentage;
        }).success(function (data){
          $scope.dynamic=0;
          if( data.success ){
              $scope.datos = data.datos;
              $scope.trabajadores = data.trabajadores;
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
      var obj = $scope.trabajadores;
      var datos = trabajador.importar().post({}, obj);
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
  .controller('FormTrabajadorContratosCtrl', function ($scope, $uibModalInstance, documento, constantes, objeto, trabajador, Notification, $uibModal, $filter, $rootScope, plantillaContrato) {
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);
    $scope.constantes = angular.copy(constantes);

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = trabajador.contratos().get({sid:$scope.trabajador.sid});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando=false;
      });
    }

    function openAsociar(trab, tipos, doc){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDocumentosCtrl',
        resolve: {
          trabajador: function () {
            return trab;          
          },
          tiposDoc: function () {
            return tipos;          
          },
          doc: function () {
            return doc;          
          },
          menu: function () {
            return '#trabajadores';          
          },
          submenu: function () {
            return 'Contratos Trabajador';          
          }
        }
      });
     miModal.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        cargarDatos($scope.trabajador.sid);           
      }, function () {
        javascript:void(0)
      });
    };

    $scope.editar = function(doc){
      $rootScope.cargando=true;
      $scope.result = documento.datos().get({ sid: doc.sid });
      $scope.result.$promise.then( function(response){
        openAsociar($scope.trabajador, response.datos, response.documento);
        $rootScope.cargando = false; 
      });
    };

    $scope.eliminar = function(doc){
      $rootScope.cargando=true;
      var obj = { sid: doc.sid, menu : '#trabajadores', submenu : 'Contratos Trabajador' };
      $scope.result = documento.eliminarDocumento().post({}, obj);
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos($scope.trabajador.sid);
        }
      });
    };

    function clausulas(obj, trab){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-clausulas.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormClausulasCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          trab: function () {
            return trab;          
          }
        }
      });     
      miModal.result.then(function (datos) {
        openContrato(datos);
      }, function () {
        javascript:void(0)
      });
    };

    $scope.frame = function(obj){
      var url = $scope.constantes.URL + 'trabajadores/documento/obtener/' + obj.sid;
      window.open(url);
    }

    function openContrato(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormContratoCtrl',
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
    };

    $scope.generarContrato = function(trab){
      $rootScope.cargando=true;
      var datos = plantillaContrato.datos().get();
      datos.$promise.then(function(response){
        clausulas( response.datos, trab );
        $rootScope.cargando=false;
      });
    }

    $scope.importar = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-importar-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormImportarContratoCtrl',
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

  })
  .controller('FormTrabajadorFichasCtrl', function ($scope, $uibModalInstance, ficha, objeto, trabajador, Notification, $uibModal, $filter, $rootScope) {
    
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);

    $scope.isSelect = false;
    $scope.isTwoSelect = false;
    crearModels();

    function cargarDatos(tra){
      $rootScope.cargando=true;
      var datos = trabajador.fichas().get({sid:tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        crearModels();
        limpiarChecks();
        $rootScope.cargando=false;
      });
    }

    function crearModels(){
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        $scope.trabajador.fichas[i].check = false;
      }              
      $scope.trabajador.isUnificar = isUnificar($scope.trabajador.fichas);
      $scope.trabajador.todos = false;
    }

    function isUnificar(fichas){
      var cont = 0;
      for(var i=0, len=fichas.length; i<len; i++){
        if(fichas[i].estado=='Ingresado'){          
          cont++;
          if(cont===2){
            return true;
          }
        }
      }
      return false;      
    }

    function limpiarChecks(){
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        $scope.trabajador.fichas[i].check = false
      }
      $scope.isSelect = false;
      $scope.trabajador.todos = false;
      $scope.isTwoSelect = false;
    }

    $scope.select = function(check){
      if(!check){
        if($scope.trabajador.todos){
          $scope.trabajador.todos = false; 
        }
        $scope.isSelect = isThereSelected();  
        $scope.isTwoSelect = isTwoSelect();     
      }else{
        $scope.trabajador.todos = isAllSelected(); 
        $scope.isSelect = true;
        $scope.isTwoSelect = isTwoSelect();
      }
    }

    function isThereSelected(){
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        if($scope.trabajador.fichas[i].check && $scope.trabajador.fichas[i].estado=='Ingresado'){
          return true;
        }
      }
      return false;
    }

    function isTwoSelect(){
      var cont = 0;
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        if($scope.trabajador.fichas[i].check && $scope.trabajador.fichas[i].estado=='Ingresado'){          
          cont++;
          if(cont===2){
            return true;
          }
        }
      }
      return false;
    }

    function isAllSelected(){
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        if(!$scope.trabajador.fichas[i].check && $scope.trabajador.fichas[i].estado=='Ingresado'){
          return false;
        }
      }
      return true;
    }

    $scope.selectAll = function(){
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        if($scope.trabajador.fichas[i].estado=='Ingresado'){
          $scope.trabajador.fichas[i].check = $scope.trabajador.todos;
        }
        $scope.isSelect = $scope.trabajador.todos;
      }
      $scope.isTwoSelect = isTwoSelect();
    }

    $scope.detalle = function(obj, editar){
      $rootScope.cargando=true;
      $scope.result = ficha.datos().get({ id: obj.id });
      $scope.result.$promise.then( function(response){
        if(editar){
          openFicha(response);
        }else{
          openDetalle(response);
        }
        $rootScope.cargando = false; 
      });
    };

    $scope.unificar = function(){
      if(isSelected()){
        var fichas = [];
        for(var i=0,len=$scope.trabajador.fichas.length; i<len; i++){
          if($scope.trabajador.fichas[i].check && $scope.trabajador.fichas[i].estado=='Ingresado'){
            fichas.push($scope.trabajador.fichas[i]);
          }
        }
        openUnificar(fichas);
      }else{
        openError();
      }
    }

    function openError(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormErrorCtrl',
        size: 'sm'
      });
      miModal.result.then(function () {
      }, function () {
        javascript:void(0)
      });
    }

    function isSelected(){
      var first = firstSelected();
      var last = lastSelected();

      for(var i=first, len=last; i<len; i++){
        if(!$scope.trabajador.fichas[i].check){
          return false;
        }
      }
      return true;
    }

    function firstSelected(){
      for(var i=0, len=$scope.trabajador.fichas.length; i<len; i++){
        if($scope.trabajador.fichas[i].check){
          return i;
        }
      }
    }

    function lastSelected(){
      for(var i=($scope.trabajador.fichas.length - 1); i>=0; i--){
        if($scope.trabajador.fichas[i].check){
          return i;
        }
      }
    }

    function openFicha(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-ficha.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormFichaCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj.trabajador;          
          },
          formulario: function () {
            return obj.formulario;          
          }
        }
      });     
      miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(obj.trabajador.sid);
      }, function () {
        javascript:void(0)
      });
    };

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;          
          }
        }
      });     
      miModal.result.then(function () {
      }, function () {
        javascript:void(0)
      });
    };

    function openUnificar(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-unificar.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormUnificarCtrl',
        resolve: {
          objeto: function () {
            return obj;          
          },
          sid: function () {
            return $scope.trabajador.sid;          
          }
        }
      });     
      miModal.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos(obj.trabajador);
      }, function () {
        javascript:void(0)
      });
    };

  })
  .controller('FormUnificarCtrl', function ($scope, $uibModalInstance, ficha, objeto, sid, Notification, $uibModal, $filter, $rootScope) {

    $scope.sidTrabajador = angular.copy(sid);
    $scope.fichas = angular.copy(objeto);
    $scope.desde = $scope.fichas[0].desde;
    $scope.hasta = $scope.fichas[$scope.fichas.length-1].hasta;

    $scope.unificar = function(){
      $rootScope.cargando = true;
      var unificar = { fichas : $scope.fichas, unificar : $scope.objeto.ficha };
      var response = ficha.unificar().post({}, unificar);
      response.$promise.then(function(response){
        if(response.success){
          $uibModalInstance.close({ mensaje : response.mensaje, trabajador : $scope.sidTrabajador });
        }else{
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
        }
        $rootScope.cargando = false;
      });
    }

  })
  .controller('FormErrorCtrl', function ($scope, $uibModalInstance) {

    $scope.titulo = 'Unificación de Fichas';
    $scope.mensaje = "<b>Selección Inválida.</b>";
    $scope.mensaje2 = "<i>Debe seleccionar fichas continuas para poder realizar la unificación.</i>";
    $scope.isExclamation = true;
    $scope.cancel = 'Volver';

    $scope.cerrar = function(){
      $uibModalInstance.close();
    }

  })
  .controller('FormFichaCtrl', function ($scope, formulario, ficha, $uibModalInstance, $http, objeto, $uibModal, Notification, $rootScope, trabajador, constantes, $filter, haber, descuento, fecha, moneda, validations) {
    
    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.opciones = angular.copy(formulario);

    $scope.parentescos = [ 
              { id : 1, nombre : 'Hijo/a o Hijastro/a' }, 
              { id : 2, nombre : 'Cónyuge' },
              { id : 3, nombre : 'Nieto/a' },
              { id : 4, nombre : 'Bisnieto/a' },
              { id : 5, nombre : 'Madre' },
              { id : 6, nombre : 'Padre' },
              { id : 7, nombre : 'Madre Viuda' },
              { id : 8, nombre : 'Abuelo/a' },
              { id : 9, nombre : 'Bisabuelo/a' },
              { id : 10, nombre : 'Otro' }
    ];

    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    $scope.cotizaciones = [
                      { id : 1, nombre : 'UF' }, 
                      { id : 2, nombre : '$' },
                      { id : 3, nombre : '7%' },
                      { id : 4, nombre : '7% + UF' }
    ];

    $scope.regimenes = [ 'A', 'B' ];

    $scope.tabDatosPersonales = true;
    $scope.tabDomicilio = false;
    $scope.tabDestinacion = false;
    $scope.tabAntecedentesComerciales = false;
    $scope.tabRemuneracion = false;
    $scope.tabAFP = false;
    $scope.isSelectSeguro = false;
    $scope.isEditAFPSeguro = false;
    $scope.isVencimiento = true;

    if(objeto){
      $scope.trabajador = angular.copy(objeto);
      $scope.trabajador.fechaNacimiento = fecha.convertirFecha($scope.trabajador.fechaNacimiento);
      $scope.trabajador.fechaIngreso = fecha.convertirFecha($scope.trabajador.fechaIngreso);
      $scope.trabajador.fechaReconocimiento = fecha.convertirFecha($scope.trabajador.fechaReconocimiento);
      $scope.trabajador.fechaReconocimientoCesantia = fecha.convertirFecha($scope.trabajador.fechaReconocimientoCesantia);
      $scope.trabajador.fechaVencimiento = fecha.convertirFecha($scope.trabajador.fechaVencimiento);
      if($scope.trabajador.montoColacion==0){
        $scope.trabajador.montoColacion = null;
      }
      if($scope.trabajador.montoMovilizacion==0){
        $scope.trabajador.montoMovilizacion = null;
      }
      if($scope.trabajador.montoViatico==0){
        $scope.trabajador.montoViatico = null;
      }
    }else{
      $scope.trabajador = { 
        rut : '',
        fechaNacimiento : null,
        monedaSueldo : $scope.monedas[0].nombre, 
        monedaColacion : $scope.monedas[0].nombre, 
        proporcionalColacion : true,
        monedaMovilizacion : $scope.monedas[0].nombre, 
        proporcionalMovilizacion : true,
        monedaViatico : $scope.monedas[0].nombre, 
        proporcionalViatico : true,
        tipoTrabajador : 'Normal',     
        gratificacion : 'm',   
        gratificacionEspecial : false,
        monedaGratificacion : $scope.monedas[0].nombre,
        monedaSindicato : $scope.monedas[0].nombre
      };
    }
    
    actualizarOptions();

    $scope.openTab = function(tab){
      switch (tab) {
        case 'datosPersonales':
          $scope.tabDatosPersonales = true;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          break;
        case 'domicilio':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = true;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          break;
        case 'destinacion':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = true;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          break;
        case 'antecedentesComerciales':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = true;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          break;
        case 'remuneracion':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = true;
          $scope.tabAFP = false;
          break;
        case 'afp':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = true;
          break;
        case 'descuentos':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          break;
      }
    }

    function actualizarOptions(){
      if( $scope.trabajador.id ){        
        if($scope.trabajador.prevision.id===8){
          $scope.trabajador.afp = $filter('filter')( $scope.opciones.afps, {id :  $scope.trabajador.afp.id }, true )[0];
        }else if($scope.trabajador.prevision.id===9){
          $scope.trabajador.afp = $filter('filter')( $scope.opciones.exCajas, {id :  $scope.trabajador.afp.id }, true )[0];
        }
        $scope.trabajador.prevision = $filter('filter')( $scope.opciones.previsiones, {id :  $scope.trabajador.prevision.id }, true )[0];
        $scope.trabajador.afpSeguro = $filter('filter')( $scope.opciones.afpsSeguro, {id :  $scope.trabajador.afpSeguro.id }, true )[0];
        $scope.trabajador.cargo = $filter('filter')( $scope.opciones.cargos, {id :  $scope.trabajador.cargo.id }, true )[0];
        $scope.trabajador.seccion = $filter('filter')( $scope.opciones.secciones, {id :  $scope.trabajador.seccion.id }, true )[0];
        $scope.trabajador.banco = $filter('filter')( $scope.opciones.bancos, {id :  $scope.trabajador.banco.id }, true )[0];
        $scope.trabajador.tienda = $filter('filter')( $scope.opciones.tiendas, {id :  $scope.trabajador.tienda.id }, true )[0];
        $scope.trabajador.centroCosto = $filter('filter')( $scope.opciones.centros, {id :  $scope.trabajador.centroCosto.id }, true )[0];
        $scope.trabajador.tipoCuenta = $filter('filter')( $scope.opciones.tiposCuentas, {id :  $scope.trabajador.tipoCuenta.id }, true )[0];
        $scope.trabajador.titulo = $filter('filter')( $scope.opciones.titulos, {id :  $scope.trabajador.titulo.id }, true )[0];
        $scope.trabajador.nacionalidad = $filter('filter')( $scope.opciones.nacionalidades, {id :  $scope.trabajador.nacionalidad.id }, true )[0];
        $scope.trabajador.estadoCivil = $filter('filter')( $scope.opciones.estadosCiviles, {id :  $scope.trabajador.estadoCivil.id }, true )[0];
        $scope.trabajador.tipo = $filter('filter')( $scope.opciones.tipos, {id :  $scope.trabajador.tipo.id }, true )[0];
        $scope.trabajador.tipoJornada = $filter('filter')( $scope.opciones.tiposJornadas, {id :  $scope.trabajador.tipoJornada.id }, true )[0];
        $scope.trabajador.tipoContrato = $filter('filter')( $scope.opciones.tiposContratos, {id :  $scope.trabajador.tipoContrato.id }, true )[0];
        $scope.trabajador.isapre = $filter('filter')( $scope.opciones.isapres, {id :  $scope.trabajador.isapre.id }, true )[0];
        $scope.trabajador.zonaImpuestoUnico = $filter('filter')( $scope.opciones.zonas, {id :  $scope.trabajador.zonaImpuestoUnico.id }, true )[0];
      }
    }    

    $scope.obtenerJefe = function(){
      $scope.jefe = $scope.trabajador.seccion.encargado.nombreCompleto;
    }

    $scope.cambiarMonedaSueldo = function(){
      $scope.trabajador.sueldoBase = null;
      $scope.trabajador.sueldoRMI = null;
    }

    $scope.cambiarMonedaSindicato = function(){
      $scope.trabajador.montoSindicato = null;
    }

    $scope.cambiarTipoTrabajador = function(){
      if($scope.trabajador.tipoTrabajador==='Normal'){
        $scope.trabajador.excesoRetiro = false;
      }
    }

    $scope.cambiarMonedaColacion = function(){
      $scope.trabajador.colacion = null;
    }

    $scope.cambiarMonedaMovilizacion = function(){
      $scope.trabajador.movilizacion = null;
    }

    $scope.cambiarMonedaViatico = function(){
      $scope.trabajador.viatico = null;
    }

    $scope.cambiarMonedaGratificacion = function(){
      $scope.trabajador.montoGratificacion = null;
    }

    $scope.editAFPSeguro = function(){
      if($scope.isEditAFPSeguro){
        $scope.isEditAFPSeguro = false;
      }else{
        $scope.isEditAFPSeguro = true;
      }
    }

    $scope.selectSeguro = function(){
      $scope.isSelectSeguro = true;
    }

    $scope.cambiarPrevision = function(){
      if($scope.trabajador.prevision.id === 8){
        $scope.trabajador.seguroDesempleo = true;
        if(!$scope.isSelectSeguro){          
          $scope.trabajador.afpSeguro = $scope.opciones.afpsSeguro[0];
        }
      }  
    }

    $scope.cambiarAFP = function(){
      $scope.seguroAFP();
    }

    $scope.seguroAFP = function(){
      if(!$scope.isSelectSeguro){
        if($scope.trabajador.afp.nombre === 'No está en AFP'){
          $scope.isEditAFPSeguro = true;
        }else{
          $scope.trabajador.afpSeguro = $filter('filter')( $scope.opciones.afpsSeguro, {id :  $scope.trabajador.afp.id }, true )[0];                  
        }
      }
    }

    $scope.cambiarIsapre = function(){
      if($scope.trabajador.isapre.nombre==="Fonasa"){
        $scope.trabajador.cotizacionIsapre = '%';
        $scope.trabajador.montoIsapre = 7;
      }else{
        $scope.trabajador.montoIsapre = null;
        $scope.trabajador.cotizacionIsapre = $scope.cotizaciones[0].nombre;
      }
    }

    $scope.cotizacionIsapre = function(){
      $scope.trabajador.montoIsapre = null;
    }

    $scope.getComunas = function(val){
      return $http.get( constantes.URL + 'comunas/buscador/json', {
        params: {
          termino: val
        }
      }).then(function(response){
        return response.data.map(function(item){
          return item;
        });
      });
    };

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;      
      response = ficha.datos().update({id:$scope.trabajador.id}, $scope.trabajador);
      response.$promise.then(
        function(response){
          if(response.success){                        
            $uibModalInstance.close({mensaje : response.mensaje, trabajador : response.trabajador });                   
            $rootScope.cargando=false;
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );      
    };      

    $scope.errores = function(name){
      var s = $scope.formTrabajador[name];
      return s.$invalid && s.$touched;
    }

    $scope.validaFecha = function(fecha){
      var date = $scope.formTrabajador[fecha].$viewValue;
      switch(fecha){
        case 'FechaNacimiento':
          if(date){
            $scope.invalidFechaNacimiento = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaNacimiento = false;            
          }
          break;
        case 'fechaIngreso':
          if(date){
            $scope.invalidFechaIngreso = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaIngreso = false;            
          }
          break;
        case 'fechaReconocimiento':
          if(date){
            $scope.invalidFechaReconocimiento = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaReconocimiento = false;            
          }
          break; 
        case 'fechaReconocimientoCesantia':
          if(date){
            $scope.invalidFechaReconocimientoCesantia = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaReconocimientoCesantia = false;            
          }
          break; 
        case 'fechaVencimiento':
          if(date){
            $scope.invalidFechaVencimiento = !validations.validaFecha(date);
            if($scope.trabajador.fechaIngreso){
              $scope.invalidFechaVencimientoIngreso = !validations.validaFechaMin($scope.trabajador.fechaVencimiento, $scope.trabajador.fechaIngreso);
            }
            if($scope.trabajador.fechaReconocimiento){
              $scope.invalidFechaVencimientoReconocimiento = !validations.validaFechaMin($scope.trabajador.fechaVencimiento, $scope.trabajador.fechaReconocimiento);
            }
          }else{
            $scope.invalidFechaVencimiento = false;            
            $scope.invalidFechaVencimientoIngreso = false;            
            $scope.invalidFechaVencimientoReconocimiento = false;            
          }
          break;      
      }      
    }    
    
    // Fecha

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };  

    $scope.openFechaNacimiento = function() {
      $scope.popupFechaNacimiento.opened = true;
    };

    $scope.openFechaIngreso = function() {
      $scope.popupFechaIngreso.opened = true;
    };

    $scope.openFechaReconocimiento = function() {
      $scope.popupFechaReconocimiento.opened = true;
    };

    $scope.openFechaReconocimientoCesantia = function() {
      $scope.popupFechaReconocimientoCesantia.opened = true;
    };

    $scope.openFechaVencimiento = function() {
      $scope.popupFechaVencimiento.opened = true;
    };

    $scope.format = ['dd-MMMM-yyyy'];

    $scope.popupFechaNacimiento = {
      opened: false
    };
    $scope.popupFechaIngreso = {
      opened: false
    };
    $scope.popupFechaReconocimiento = {
      opened: false
    };
    $scope.popupFechaReconocimientoCesantia = {
      opened: false
    };
    $scope.popupFechaVencimiento = {
      opened: false
    };

  })
  .controller('FormDetalleCtrl', function ($scope, $uibModalInstance, $http, objeto, $uibModal, Notification, $rootScope, trabajador, constantes, $filter, haber, descuento, fecha, moneda, validations) {

    $scope.trabajador = angular.copy(objeto.trabajador);
    

  })
  .controller('FormPdfContratoCtrl', function ($scope, $uibModalInstance, objeto, $rootScope, Upload, constantes, url) {

    $scope.contrato = angular.copy(objeto);
    $scope.url = angular.copy(url);

  })
  .controller('FormImportarContratoCtrl', function ($scope, $uibModalInstance, objeto, $rootScope, Upload, constantes) {

    $scope.trabajador = angular.copy(objeto);
    $scope.constantes = angular.copy(constantes);
    $scope.contrato = {};

    $scope.$watch('contrato.file', function () {
      $scope.importar($scope.contrato.file);
    });    

    $scope.importar = function (files) {      
      if(files) {              
        $rootScope.cargando = true;
        $scope.error = {};
        $scope.listaErrores=[];
        var file = files;
        Upload.upload({
          url: constantes.URL + 'documentos/archivo/importar',
          data: { file : file }
        }).success(function (data){
          $scope.dynamic=0;
          if( data.success ){
            $scope.isOK = true;
            $scope.nombreArchivo = data.nombre;
          }else{
            /*if( data.errores ){
              $scope.listaErrores = data.errores;
              Notification.error({message: 'Errores en los datos del archivo', title: 'Mensaje del Sistema'});
            }else{
              Notification.error({message: data.mensaje, title: 'Mensaje del Sistema'});                            
            }*/
          }
          $rootScope.cargando = false;
        });                
      }
    };

    $scope.subir = function (file) {      
      if(file) {              
        $rootScope.cargando = true;
        $scope.error = {};
        $scope.listaErrores=[];
        var file = file;
        Upload.upload({
          url: constantes.URL + 'documentos/archivo/subir',
          data: { file : file, idTrabajador : $scope.trabajador.id, menu : '#trabajadores', submenu : 'Contratos Trabajador', idTipoDocumento : 1, descripcion : $scope.contrato.descripcion }
        }).success(function (data){
          $scope.dynamic=0;
          if( data.success ){
            $uibModalInstance.close(data.mensaje);
          }else{
            if( data.errores ){
              $scope.listaErrores = data.errores;
              Notification.error({message: 'Errores en los datos del archivo', title: 'Mensaje del Sistema'});
            }else{
              Notification.error({message: data.mensaje, title: 'Mensaje del Sistema'});                            
            }
          }
          $rootScope.cargando = false;
        });                
      }
    };

  })
  .controller('FormDetallesTrabajadoresCtrl', function ($scope, $uibModalInstance, objeto) {
    $scope.trabajador = angular.copy(objeto);
  })
  .controller('FormTiposPlantillasContratoCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, plantillaContrato, Notification) {
    $scope.datos = angular.copy(objeto);

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = plantillaContrato.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando=false;
      });
    }

    $scope.openPlantillaContrato = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-plantilla-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillaContratoCtrl',
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

    $scope.editar = function(plan){
      $rootScope.cargando=true;
      var datos = plantillaContrato.datos().get({sid: plan.sid});
      datos.$promise.then(function(response){
        $scope.openPlantillaContrato(response.datos);
        $rootScope.cargando=false;
      });
    }

    $scope.eliminar = function(plan){
      $rootScope.cargando=true;
      $scope.result = plantillaContrato.datos().delete({ sid: plan });
      $scope.result.$promise.then( function(response){
        if(response.success){
          $rootScope.cargando=false;
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }
      })
    }

  })
  .controller('FormPlantillaContratoCtrl', function ($scope, $uibModalInstance, objeto, $http, $filter, $rootScope, plantillaContrato, Notification) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.isAyuda = false;

    if(objeto){
      $scope.plantillaContrato = angular.copy(objeto);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Plantilla de Contrato de Trabajo';
      $scope.encabezado = $scope.plantillaContrato.nombre;
    }else{
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Plantillas de Contratos de Trabajo';
      $scope.encabezado = 'Nueva Plantilla de Contrato de Trabajo';
    }

    $scope.tinymceOptions = {
        resize: false,
        width: 800,  // I *think* its a number and not '400' string
        height: 300,
        plugins: 'textcolor',
        entity_encoding : "raw",
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

    $scope.ayuda = function(){
      $scope.isAyuda = !$scope.isAyuda;
      $scope.tinymceOptions.height = 200;
    }

    $scope.guardar = function(plan){
      $rootScope.cargando=true;
      var response;
      if( plan.sid ){
        response = plantillaContrato.datos().update({sid:plan.sid}, $scope.plantillaContrato);
      }else{
        response = plantillaContrato.datos().create({}, $scope.plantillaContrato);
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
  .controller('FormContratoCtrl', function ($scope, $uibModalInstance, objeto, $http, $filter, $rootScope, contrato, Notification) {

    $scope.trabajador = angular.copy(objeto.trabajador);
    $scope.contrato = angular.copy(objeto.datos);
    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.representante = angular.copy(objeto.representante);
    $scope.empresa.domicilio = angular.copy(objeto.empresa.domicilio);

    $scope.tinymceOptions = {
        resize: false,
        width: 800,  // I *think* its a number and not '400' string
        height: 300,
        plugins: 'textcolor',
        entity_encoding : "raw",
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

    $scope.ingresar = function(){
      $rootScope.cargando=true;
      var cont = { idTipoContrato : $scope.trabajador.tipoContrato.id, idTrabajador : $scope.trabajador.id, idEncargado : $scope.trabajador.id, idEmpresa : $scope.empresa.id, razonSocialEmpresa : $scope.empresa.empresa, rutEmpresa : $scope.empresa.rut, domicilioEmpresa : $scope.empresa.domicilio, rutTrabajador : $scope.trabajador.rut, nombreCompletoTrabajador : $scope.trabajador.nombreCompleto, cargoTrabajador : $scope.trabajador.cargo.nombre, estadoCivilTrabajador : $scope.trabajador.estadoCivil.nombre, fechaNacimientoTrabajador : $scope.trabajador.fechaNacimiento, seccionTrabajador : $scope.trabajador.seccion.nombre, fechaIngresoTrabajador : $scope.trabajador.fechaIngreso, domicilioTrabajador : $scope.trabajador.domicilio,  fechaVencimiento : $scope.trabajador.fechaVencimiento, cuerpo : $scope.contrato.cuerpo, nombreCompletoRepresentanteEmpresa : $scope.representante.nombreCompleto, domicilioRepresentanteEmpresa : $scope.representante.domicilio, rutRepresentanteEmpresa : $scope.representante.rut };
      var response;
      response = contrato.datos().create({}, cont);
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

  })
  .controller('FormClausulasCtrl', function ($scope, $uibModalInstance, objeto, $http, $filter, $rootScope, trab, trabajador, clausulaContrato) {
    
    $scope.tiposContrato = angular.copy(objeto);
    $scope.trabajador = angular.copy(trab);
    $scope.cargado = false;

    $scope.objeto = [];
    $scope.isSelect = false;

    $scope.generar = function(){
      var clausulas = [];
      for(var i=0,len=$scope.datos.length; i<len; i++){
        if($scope.objeto[i].check){
          clausulas.push($scope.datos[i]);
        }
      }
      var obj = { sidTrabajador : $scope.trabajador.sid, clausulas : clausulas, sidPlantilla : $scope.objeto.tipoContrato.sid };
      $rootScope.cargando=true;
      var datos = trabajador.contrato().post({}, obj);
      datos.$promise.then(function(response){
        $rootScope.cargando=false;
        $uibModalInstance.close(response);    
      }); 
    }

    $scope.seleccionarPlantilla = function(){
      $scope.cargado=false;
      $rootScope.cargando = true;
      var datos = clausulaContrato.plantilla().get({sid: $scope.objeto.tipoContrato.sid});
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.cargado=true;
        $rootScope.cargando = false;
        crearModels();
      });
    }

    function crearModels(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.objeto.push({ check : true });
      }         
      $scope.objeto.todos = true;
      $scope.cargado = true;
    }    

    $scope.select = function(index){
      if(!$scope.objeto[index].check){
        if($scope.objeto.todos){
          $scope.objeto.todos = false; 
        }
        countSelected(index);
        $scope.isSelect = isThereSelected();       
      }else{
        $scope.isSelect = true;
        countSelected(index);
      }
    }

    function isThereSelected(){
      var bool = false;
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.objeto[i].check){
          bool = true;
          return bool;
        }
      }
      return bool;
    }

    function countSelected(index){
      var count = 0;
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.objeto[i].check){
          count++;
          $scope.mensaje = 'Se generará el Contrato de Trabajo de <b>' + $scope.trabajador.nombre + ' con las <b>' + count + '</b> cláusulas seleccionadas. ¿Desea continuar?';
        }
      }
      if(count===1){
        $scope.mensaje = 'Se generará el Contrato de Trabajo de <b>' + $scope.trabajador.nombre + ' con la cláusula seleccionada. ¿Desea continuar?';
      }
      return count;
    }

    $scope.selectAll = function(){
      if($scope.objeto.todos){
        var total = 0;
        for(var i=0, len=$scope.datos.length; i<len; i++){
          $scope.objeto[i].check = true
          $scope.isSelect = true;
          total++;  
        }
        countSelected();
      }else{
        for(var i=0, len=$scope.datos.length; i<len; i++){
          $scope.objeto[i].check = false
          $scope.isSelect = false;
        }
      }
    }

    function limpiarChecks(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.objeto[i].check = false
      }
      $scope.isSelect = false;
      $scope.objeto.todos = false;
    }

  })
  .controller('FormConfirmacionContratoCtrl', function ($scope, $uibModalInstance, objeto, $http, $filter, $rootScope) {

    $scope.trabajador = angular.copy(objeto);

    $scope.titulo = 'Contrato de Trabajo';
    $scope.mensaje = "¿Desea generar el contrato de trabajo de " + $scope.trabajador.nombreCompleto + "?";
    $scope.ok = 'Sí';
    $scope.isOK = true;
    $scope.isQuestion = true;
    $scope.cancel = 'Posponer';

    $scope.aceptar = function(){
      $uibModalInstance.close($scope.trabajador);      
    }

    $scope.cerrar = function(){
      $uibModalInstance.dismiss('cancel');
    }
    
  })
  .controller('FormSueldoBaseCtrl', function ($scope, $uibModalInstance, $http, $filter, $rootScope, objeto, moneda) {
    
    $scope.detalle = angular.copy(objeto);

    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }
    
    $scope.asignar = function(){
      $uibModalInstance.close($scope.detalle.sueldoBase);
    }

  })
  .controller('FormCalcularSueldoBaseCtrl', function ($scope, tablaImpuestoUnico, $uibModalInstance, $uibModal, $http, $filter, $rootScope, trabajador, afps, isapres, seguroCesantia, rentasTopesImponibles, rmi, moneda) {

    $scope.uf = $rootScope.globals.indicadores.uf.valor;
    $scope.utm = $rootScope.globals.indicadores.utm.valor;
    $scope.afps = angular.copy(afps);
    $scope.seguroCesantia = angular.copy(seguroCesantia);
    $scope.isapres = angular.copy(isapres);
    var rmi = angular.copy(rmi);
    $scope.trabajador = angular.copy(trabajador);
    $scope.isAsignacion = false;
    $scope.isEditAsignacion = false;
    $scope.asignaciones = [];
    var asigIndex;
    var tabla = angular.copy(tablaImpuestoUnico);
    var contador = 0;

    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }

    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    $scope.cotizaciones = [
                      { id : 1, nombre : 'UF' }, 
                      { id : 2, nombre : '$' }
    ];

    $scope.sueldo = { liquidoMoneda : $scope.monedas[0].nombre, cotizacionIsapre : $scope.monedas[1].nombre, brutoMoneda : $scope.monedas[0].nombre, asignacionesMoneda : $scope.monedas[0].nombre, tipoContrato : 'Indefinido', seguroCesantia : true, gratificacion : true };

    $scope.nuevaAsignacion = function(){
      $scope.tituloAsignacion = 'Nueva Asignación';
      $scope.sueldo.asignacionMoneda = $scope.monedas[0].nombre;
      $scope.sueldo.asignacion = null;
      $scope.isAsignacion = !$scope.isAsignacion;
    }

    $scope.editarAsignacion = function(asig){
      $scope.tituloAsignacion = 'Modificar Asignación';
      asigIndex = $scope.asignaciones.indexOf(asig);
      $scope.isAsignacion = true;
      $scope.isEditAsignacion = true;
      $scope.sueldo.asignacionMoneda = asig.moneda;
      $scope.sueldo.asignacion = asig.monto;
    }

    $scope.updateAsignacion = function(asig){
      $scope.isAsignacion = false;
      $scope.isEditAsignacion = false;

      $scope.asignaciones[asigIndex].moneda = asig.asignacionMoneda;
      $scope.asignaciones[asigIndex].monto = asig.asignacion;

      $scope.sueldo.asignacionMoneda = $scope.monedas[0].nombre;
      $scope.sueldo.asignacion = null;
    }

    $scope.eliminarAsignacion = function(asig){
      var index = $scope.asignaciones.indexOf(asig);
      $scope.asignaciones.splice(index,1);
    }

    $scope.agregarAsignacion = function(){
      $scope.asignaciones.push({ moneda : $scope.sueldo.asignacionMoneda, monto : $scope.sueldo.asignacion });
      $scope.isAsignacion = false;
    }

    function openSueldoBase(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-sueldo-base.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormSueldoBaseCtrl',
        resolve: {
          objeto: function () {
            return obj;
          }
        }
      });
      miModal.result.then(function (sueldoBase) {
        $uibModalInstance.close(sueldoBase);
      }, function () {
        javascript:void(0)
      });
    }

    function crearModels(){
      for(var i=0,len=seguroCesantia.length; i<len; i++){
        if(seguroCesantia[i].tipoContrato==='Contrato Plazo Indefinido'){
          var tasaSeguroIndefinido = seguroCesantia[i].financiamientoTrabajador;
        }        
        if(seguroCesantia[i].tipoContrato==='Contrato Plazo Fijo'){
          var tasaSeguroFijo = seguroCesantia[i].financiamientoTrabajador;
        }          
      }
      $scope.tasaSeguroIndefinido = tasaSeguroIndefinido;
      $scope.tasaSeguroFijo = tasaSeguroFijo;
      for(var i=0,len=rentasTopesImponibles.length; i<len; i++){
        if(rentasTopesImponibles[i].nombre==='Para afiliados a una AFP'){
          var rtiAfp = moneda.convertirUF(rentasTopesImponibles[i].valor);
        }
        if(rentasTopesImponibles[i].nombre==='Para Seguro de Cesantía'){
          var rtiSeguroCesantia = moneda.convertirUF(rentasTopesImponibles[i].valor);
        }
      }
      $scope.rtiAfp = rtiAfp;
      $scope.rtiSeguroCesantia = rtiSeguroCesantia;
    }    

    $scope.cambiarIsapre = function(){
      if($scope.sueldo.isapre.nombre==='Fonasa'){
        $scope.sueldo.cotizacionIsapre = '%';
        $scope.sueldo.montoIsapre = 7;
      }else{
        $scope.sueldo.cotizacionIsapre = 'UF';
        $scope.sueldo.montoIsapre = null;
      }
    }

    /*function calcular(){
      var totalAsignaciones = 0;
      var montoSeguro = 0;
      var tasaAfp = 0;
      var tasaFonasa = 0;
      var montoAfp = 0;
      var tasaSeguro = 0;
      var montoSeguro = 0;
      var salud = 0;
      var asig = [];
      var asigPesos;
      var gratificacion = 0;
      var factorImpuesto = 0;
      var rebajar = 0;
      var impuesto = 0;

      for(var i=0,len=$scope.asignaciones.length; i<len; i++){
        asigPesos = $scope.convertir($scope.asignaciones[i].monto, $scope.asignaciones[i].moneda);
        totalAsignaciones = (totalAsignaciones + asigPesos);
        asig.push(asigPesos);
      }

      if($scope.sueldo.tipoContrato==='Indefinido'){
        $scope.tasaSeguroCesantia = $scope.tasaSeguroIndefinido;
      }else{
        $scope.tasaSeguroCesantia = $scope.tasaSeguroFijo;
      }

      var sueldoLiquido = $scope.convertir($scope.sueldo.liquido, $scope.sueldo.liquidoMoneda);
      if($scope.sueldo.isapre.nombre!=='Fonasa' && $scope.sueldo.isapre.nombre!=='Sin Isapre'){
        salud = $scope.convertir($scope.sueldo.montoIsapre, $scope.sueldo.cotizacionIsapre);
      }else if($scope.sueldo.isapre.nombre==='Sin Isapre'){
        salud = 0;        
        $scope.sueldo.montoIsapre = 0;
      }else{
        tasaFonasa = 0.07;        
      }
      var ri = (sueldoLiquido - totalAsignaciones + salud);
      
      if($scope.sueldo.afp.nombre!=='No está en AFP'){
        tasaAfp = ($scope.sueldo.afp.tasa / 100);
        if($scope.sueldo.seguroCesantia){
          tasaSeguro = ($scope.tasaSeguroCesantia / 100);
        }
      }else{
        $scope.sueldo.afp.tasa = 0;
      }
      var factor = (1 - (tasaAfp + tasaSeguro + tasaFonasa));
      ri = Math.round(ri / factor);   

      if(ri>$scope.rtiAfp){
        montoAfp = Math.round($scope.rtiAfp * tasaAfp);
      }else{
        montoAfp = Math.round(ri * tasaAfp);
      }
      if($scope.sueldo.isapre.nombre==='Fonasa'){
        salud = Math.round(ri * tasaFonasa);
      }else{
        var obligatorio = Math.round(ri * 0.07);
        if(salud<obligatorio){
          salud = obligatorio;
        }
      }
      var sueldoBase = angular.copy(ri);
      if($scope.sueldo.gratificacion){
        sueldoBase = Math.round(ri / 1.25);
        var tope = (( 4.75 * rmi ) / 12 );
        gratificacion = Math.round(sueldoBase * 0.25);
        if(gratificacion>tope){
          gratificacion = tope;
          sueldoBase = (ri - gratificacion);
        }
      }      
      if($scope.sueldo.seguroCesantia && $scope.sueldo.tipoContrato==='Indefinido'){
        montoSeguro = Math.round(ri * tasaSeguro);
        if(ri>$scope.rtiSeguroCesantia){
          montoSeguro = Math.round($scope.rtiSeguroCesantia * tasaSeguro);
        }
      }else{
        $scope.tasaSeguroCesantia = 0;
      }
      montoAfp = Math.round(ri * tasaAfp);
      if(ri>$scope.rtiAfp){
        ri = $scope.rtiAfp;
        montoAfp = Math.round(ri * tasaAfp);        
      }
      var baseImpuesto = (ri - salud - montoAfp - montoSeguro);

      sueldoBase = (sueldoLiquido - totalAsignaciones - gratificacion + salud + montoAfp + montoSeguro);

      console.log(baseImpuesto)
      var detalle = { sueldoLiquido : sueldoLiquido, rentaImponible : ri, sueldoBase : sueldoBase, gratificacion : gratificacion, tipoContrato : $scope.sueldo.tipoContrato, afp : { nombre : $scope.sueldo.afp.nombre, tasa : $scope.sueldo.afp.tasa, monto : montoAfp }, seguroCesantia : { tasa : $scope.tasaSeguroCesantia, monto : montoSeguro }, salud: { nombre : $scope.sueldo.isapre.nombre, plan : $scope.sueldo.montoIsapre, cotizacion : $scope.sueldo.cotizacionIsapre, monto : salud }, asignaciones : asig };

      if()
      return detalle;
    }*/

    function calcular(){
      var totalAsignaciones = 0;
      var montoSeguro = 0;
      var tasaAfp = 0;
      var tasaFonasa = 0;
      var montoAfp = 0;
      var tasaSeguro = 0;
      var montoSeguro = 0;
      var salud = 0;
      var asig = [];
      var asigPesos;
      var gratificacion = 0;
      var factorImpuesto = 0;
      var rebajar = 0;
      var impuesto = 0;      

      for(var i=0,len=$scope.asignaciones.length; i<len; i++){
        asigPesos = moneda.convertir($scope.asignaciones[i].monto, $scope.asignaciones[i].moneda);
        totalAsignaciones = (totalAsignaciones + asigPesos);
        asig.push(asigPesos);
      }

      if($scope.sueldo.tipoContrato==='Indefinido'){
        $scope.tasaSeguroCesantia = $scope.tasaSeguroIndefinido;
      }else{
        $scope.tasaSeguroCesantia = $scope.tasaSeguroFijo;
      }

      var sueldoLiquido = moneda.convertir($scope.sueldo.liquido, $scope.sueldo.liquidoMoneda);
      if($scope.sueldo.isapre.nombre!=='Fonasa' && $scope.sueldo.isapre.nombre!=='Sin Isapre'){
        salud = Math.round(moneda.convertir($scope.sueldo.montoIsapre, $scope.sueldo.cotizacionIsapre));
      }else if($scope.sueldo.isapre.nombre==='Sin Isapre'){
        salud = 0;        
        $scope.sueldo.montoIsapre = 0;
      }else{
        tasaFonasa = 0.07;        
      }
      var ri = (sueldoLiquido - totalAsignaciones + salud);
      
      if($scope.sueldo.afp.nombre!=='No está en AFP'){
        tasaAfp = ($scope.sueldo.afp.tasa / 100);
        if($scope.sueldo.seguroCesantia){
          tasaSeguro = ($scope.tasaSeguroCesantia / 100);
        }
      }else{
        $scope.sueldo.afp.tasa = 0;
      }
      var factor = (1 - (tasaAfp + tasaSeguro + tasaFonasa));
      ri = Math.round(ri / factor);   

      if(ri>$scope.rtiAfp){
        montoAfp = Math.round($scope.rtiAfp * tasaAfp);
      }else{
        montoAfp = Math.round(ri * tasaAfp);
      }
      if($scope.sueldo.isapre.nombre==='Fonasa'){
        salud = Math.round(ri * tasaFonasa);
      }else if($scope.sueldo.isapre.nombre!=='Sin Isapre'){
        var obligatorio = Math.round(ri * 0.07);
        if(salud<obligatorio){
          salud = obligatorio;
        }
      }
      var sueldoBase = angular.copy(ri);
      if($scope.sueldo.gratificacion){
        sueldoBase = Math.round(ri / 1.25);
        var tope = (( 4.75 * rmi ) / 12 );
        gratificacion = Math.round(sueldoBase * 0.25);
        if(gratificacion>tope){
          gratificacion = tope;
          sueldoBase = (ri - gratificacion);
        }
      }      
      if($scope.sueldo.seguroCesantia && $scope.sueldo.tipoContrato==='Indefinido'){
        montoSeguro = Math.round(ri * tasaSeguro);
        if(ri>$scope.rtiSeguroCesantia){
          montoSeguro = Math.round($scope.rtiSeguroCesantia * tasaSeguro);
        }
      }else{
        $scope.tasaSeguroCesantia = 0;
      }
      montoAfp = Math.round(ri * tasaAfp);
      if(ri>$scope.rtiAfp){
        ri = $scope.rtiAfp;
        montoAfp = Math.round(ri * tasaAfp);        
      }
      var baseImpuesto = (ri - salud - montoAfp - montoSeguro);

      sueldoBase = (sueldoLiquido - totalAsignaciones - gratificacion + salud + montoAfp + montoSeguro);

      var detalle = { sueldoLiquido : sueldoLiquido, rentaImponible : ri, baseImpuesto : baseImpuesto, impuesto : 0, sueldoBase : sueldoBase, gratificacion : gratificacion, tipoContrato : $scope.sueldo.tipoContrato, afp : { nombre : $scope.sueldo.afp.nombre, tasa : $scope.sueldo.afp.tasa, monto : montoAfp }, seguroCesantia : { tasa : $scope.tasaSeguroCesantia, monto : montoSeguro }, salud: { nombre : $scope.sueldo.isapre.nombre, plan : $scope.sueldo.montoIsapre, cotizacion : $scope.sueldo.cotizacionIsapre, monto : salud }, asignaciones : asig };
      if(isTributable(baseImpuesto)){
        return recalcular(sueldoBase, $scope.tasaSeguroCesantia, tasaAfp, asig, totalAsignaciones); 
      }else{
        return detalle;        
      }
    }

    function isTributable(baseImpuesto){
      var minimoTributable = moneda.convertirUTM(tabla[0].imponibleMensualHasta);
      if(baseImpuesto > minimoTributable){
       return true;
      }      
      return false;
    }

    function recalcular(sueldoBase, tasaSeguroCesantia, tasaAfp, asignaciones, totalAsignaciones){
      contador++;
      var gratificacion = 0;
      var rentaImponible = 0;
      var montoAfp = 0;
      var montoSeguro = 0;
      var salud = 0;
      var impuesto = 0;

      if($scope.sueldo.gratificacion){
        var tope = Math.round((( 4.75 * rmi ) / 12 ));
        gratificacion = Math.round(sueldoBase * 0.25);
        if(gratificacion>tope){
          gratificacion = tope;
        }
      }

      rentaImponible = (sueldoBase + gratificacion);

      if($scope.sueldo.seguroCesantia && $scope.sueldo.tipoContrato==='Indefinido' && $scope.sueldo.afp.nombre!=='No está en AFP'){
        montoSeguro = Math.round(rentaImponible * (tasaSeguroCesantia / 100));
        if(rentaImponible>$scope.rtiSeguroCesantia){
          montoSeguro = Math.round($scope.rtiSeguroCesantia * (tasaSeguroCesantia / 100));
        }
      }

      if(rentaImponible>$scope.rtiAfp){
        montoAfp = Math.round($scope.rtiAfp * tasaAfp);        
      }else{
        montoAfp = Math.round(rentaImponible * tasaAfp);        
      }
      

      if($scope.sueldo.isapre.nombre!=='Fonasa' && $scope.sueldo.isapre.nombre!=='Sin Isapre'){
        salud = Math.round(moneda.convertir($scope.sueldo.montoIsapre, $scope.sueldo.cotizacionIsapre));
        if(rentaImponible>$scope.rtiAfp){
          var obligatorio = Math.round($scope.rtiAfp * 0.07);  
        }else{
          var obligatorio = Math.round(rentaImponible * 0.07);  
        }
        if(salud<obligatorio){
          salud = obligatorio;
        }
      }else if($scope.sueldo.isapre.nombre==='Sin Isapre'){
        salud = 0;        
      }else{
        if(rentaImponible>$scope.rtiAfp){
          salud = Math.round($scope.rtiAfp * 0.07); 
        }else{
          salud = Math.round(rentaImponible * 0.07); 
        }
      }

      if(rentaImponible>$scope.rtiAfp){
        var baseImpuesto = ($scope.rtiAfp - (salud + montoAfp + montoSeguro));
      }else{
        var baseImpuesto = (rentaImponible - (salud + montoAfp + montoSeguro));
      }

      impuesto = calcularImpuesto(baseImpuesto);
      var sueldoLiquido = (rentaImponible - (montoAfp + salud + montoSeguro + impuesto) + totalAsignaciones);

      var detalle = { sueldoLiquido : sueldoLiquido, rentaImponible : rentaImponible, baseImpuesto : baseImpuesto, impuesto : impuesto, sueldoBase : sueldoBase, gratificacion : gratificacion, tipoContrato : $scope.sueldo.tipoContrato, afp : { nombre : $scope.sueldo.afp.nombre, tasa : $scope.sueldo.afp.tasa, monto : montoAfp }, seguroCesantia : { tasa : $scope.tasaSeguroCesantia, monto : montoSeguro }, salud: { nombre : $scope.sueldo.isapre.nombre, plan : $scope.sueldo.montoIsapre, cotizacion : $scope.sueldo.cotizacionIsapre, monto : salud }, asignaciones : asignaciones };
      var sueldoDeseado = moneda.convertir($scope.sueldo.liquido, $scope.sueldo.liquidoMoneda);
      
      if(sueldoLiquido===sueldoDeseado){
        return detalle;
      }else{
        if(sueldoLiquido<sueldoDeseado){
          var resto = (sueldoDeseado - sueldoLiquido);
          if(resto>1){
            return recalcular((sueldoBase + Math.round(resto / 2)), $scope.tasaSeguroCesantia, tasaAfp, asignaciones, totalAsignaciones); 
          }else{
            return recalcular((sueldoBase + 1), $scope.tasaSeguroCesantia, tasaAfp, asignaciones, totalAsignaciones); 
          }
        }else{
          var resto = (sueldoLiquido - sueldoDeseado);
          /*console.log('-')
          console.log('liquido: ' + sueldoLiquido)
          console.log('resto: ' + resto)*/
          if(resto>1){
            return recalcular((sueldoBase - Math.round(resto / 2)), $scope.tasaSeguroCesantia, tasaAfp, asignaciones, totalAsignaciones); 
          }else{
            return recalcular((sueldoBase - 1), $scope.tasaSeguroCesantia, tasaAfp, asignaciones, totalAsignaciones); 
          }
        }
      }

    }

    function calcularImpuesto(baseImpuesto){
      var factor = 0;
      var cantidadARebajar = 0;
      var impuesto = 0;

      for(var i=0,len=tabla.length; i<len; i++){
        if(baseImpuesto > moneda.convertirUTM(tabla[i].imponibleMensualDesde) && baseImpuesto < moneda.convertirUTM(tabla[i].imponibleMensualHasta)){
          factor = tabla[i].factor;
          cantidadARebajar = moneda.convertirUTM(tabla[i].cantidadARebajar);
          break;
        }
      }
      impuesto = Math.round((baseImpuesto * (factor / 100)) - cantidadARebajar);

      return impuesto;
    }

    $scope.calcularSueldoBase = function(){
      crearModels();
      var detalle = calcular();
      openSueldoBase(detalle);
    }

  })  
  .controller('FormTrabajadorCtrl', function ($scope, formulario, $uibModalInstance, $http, objeto, $uibModal, Notification, $rootScope, trabajador, constantes, $filter, haber, descuento, fecha, moneda, validations) {
    
    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.opciones = angular.copy(formulario);
    $scope.errores = {};
    $scope.errorRUT = '';
    $scope.rutError = false;
    $scope.uf = $rootScope.globals.indicadores.uf.valor;
    $scope.utm = $rootScope.globals.indicadores.utm.valor;    
    $scope.descuento = {};
    var rentasTopesImponibles;
    

    $scope.convertir = function(valor, mon){
      return moneda.convertir(valor, mon);
    }

    $scope.parentescos = [ 
              { id : 1, nombre : 'Hijo/a o Hijastro/a' }, 
              { id : 2, nombre : 'Cónyuge' },
              { id : 3, nombre : 'Nieto/a' },
              { id : 4, nombre : 'Bisnieto/a' },
              { id : 5, nombre : 'Madre' },
              { id : 6, nombre : 'Padre' },
              { id : 7, nombre : 'Madre Viuda' },
              { id : 8, nombre : 'Abuelo/a' },
              { id : 9, nombre : 'Bisabuelo/a' },
              { id : 10, nombre : 'Otro' }
    ];

    $scope.monedas = [
                { id : 1, nombre : '$' }, 
                { id : 2, nombre : 'UF' }, 
                { id : 3, nombre : 'UTM' } 
    ];

    $scope.cotizaciones = [
                      { id : 1, nombre : 'UF' }, 
                      { id : 2, nombre : '$' },
                      { id : 3, nombre : '7%' },
                      { id : 4, nombre : '7% + UF' }
    ];

    $scope.regimenes = [ 'A', 'B' ];

    $scope.tabDatosPersonales = true;
    $scope.tabDomicilio = false;
    $scope.tabDestinacion = false;
    $scope.tabAntecedentesComerciales = false;
    $scope.tabRemuneracion = false;
    $scope.tabAFP = false;
    $scope.tabDescuentos = false;
    $scope.isImponible = false; 
    $scope.isNoImponible = false; 
    $scope.isSelectSeguro = false;
    $scope.isEditAFPSeguro = false;
    $scope.isDescuento = false; 
    $scope.isVencimiento = true;
    $scope.isEditNoImponible = false;
    $scope.isEditImponible = false;
    $scope.isEditDescuento = false;

    $scope.validaRUT = function(rut){
      return validations.validaRUT(rut);
    }

    $scope.filtro = function(cc){
      return function(item) {
        if(item.nivel==$scope.empresa.centroCosto.niveles){
          return true;
        }else{
          return false;
        }
      }
    }
    
    $scope.validar = function(rut){
      var bool = false;
      $scope.rutError = false;
      
      if(rut){
        if(rut.length < 8){
          bool = true;
          $scope.errorRUT = 'RUT Inválido';
          $scope.rutError = true;
        }else if(rut.length >= 8){
          if(!$scope.validaRUT(rut)){
            bool = true;
            $scope.errorRUT = 'RUT Inválido';    
            $scope.rutError = true;   
          }else{
            $scope.errorRUT = 'valido';
          }
        }
      }
      return bool;
    };

    if(objeto){
      $scope.trabajador = angular.copy(objeto);
      $scope.validar($scope.trabajador.rut)
      $scope.trabajador.fechaNacimiento = fecha.convertirFecha($scope.trabajador.fechaNacimiento);
      $scope.trabajador.fechaIngreso = fecha.convertirFecha($scope.trabajador.fechaIngreso);
      $scope.trabajador.fechaReconocimiento = fecha.convertirFecha($scope.trabajador.fechaReconocimiento);
      $scope.trabajador.fechaReconocimientoCesantia = fecha.convertirFecha($scope.trabajador.fechaReconocimientoCesantia);
      $scope.trabajador.fechaVencimiento = fecha.convertirFecha($scope.trabajador.fechaVencimiento);
      if($scope.trabajador.montoColacion==0){
        $scope.trabajador.montoColacion = null;
      }
      if($scope.trabajador.montoMovilizacion==0){
        $scope.trabajador.montoMovilizacion = null;
      }
      if($scope.trabajador.montoViatico==0){
        $scope.trabajador.montoViatico = null;
      }
    }else{
      $scope.trabajador = { 
        rut : '',
        fechaNacimiento : null,
        monedaSueldo : $scope.monedas[0].nombre, 
        monedaColacion : $scope.monedas[0].nombre, 
        proporcionalColacion : true,
        monedaMovilizacion : $scope.monedas[0].nombre, 
        proporcionalMovilizacion : true,
        monedaViatico : $scope.monedas[0].nombre, 
        proporcionalViatico : true,
        tipoTrabajador : 'Normal',     
        gratificacion : 'm',   
        gratificacionEspecial : false,
        monedaGratificacion : $scope.monedas[0].nombre,
        monedaSindicato : $scope.monedas[0].nombre,
        descuentos : [],
        haberes : []
      };
    }
    
    actualizarOptions();

    $scope.openTab = function(tab){
      switch (tab) {
        case 'datosPersonales':
          $scope.tabDatosPersonales = true;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          $scope.tabDescuentos = false;
          break;
        case 'domicilio':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = true;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          $scope.tabDescuentos = false;
          break;
        case 'destinacion':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = true;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          $scope.tabDescuentos = false;
          break;
        case 'antecedentesComerciales':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = true;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          $scope.tabDescuentos = false;
          break;
        case 'remuneracion':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = true;
          $scope.tabAFP = false;
          $scope.tabDescuentos = false;
          break;
        case 'afp':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = true;
          $scope.tabDescuentos = false;
          break;
        case 'descuentos':
          $scope.tabDatosPersonales = false;
          $scope.tabDomicilio = false;
          $scope.tabDestinacion = false;
          $scope.tabAntecedentesComerciales = false;
          $scope.tabRemuneracion = false;
          $scope.tabAFP = false;
          $scope.tabDescuentos = true;
          break;
      }
    }

    function actualizarOptions(){
      if( $scope.trabajador.id ){        
        if($scope.trabajador.prevision.id===8){
          $scope.trabajador.afp = $filter('filter')( $scope.opciones.afps, {id :  $scope.trabajador.afp.id }, true )[0];
        }else if($scope.trabajador.prevision.id===9){
          $scope.trabajador.afp = $filter('filter')( $scope.opciones.exCajas, {id :  $scope.trabajador.afp.id }, true )[0];
        }
        $scope.trabajador.prevision = $filter('filter')( $scope.opciones.previsiones, {id :  $scope.trabajador.prevision.id }, true )[0];
        $scope.trabajador.afpSeguro = $filter('filter')( $scope.opciones.afpsSeguro, {id :  $scope.trabajador.afpSeguro.id }, true )[0];
        $scope.trabajador.cargo = $filter('filter')( $scope.opciones.cargos, {id :  $scope.trabajador.cargo.id }, true )[0];
        $scope.trabajador.seccion = $filter('filter')( $scope.opciones.secciones, {id :  $scope.trabajador.seccion.id }, true )[0];
        $scope.trabajador.banco = $filter('filter')( $scope.opciones.bancos, {id :  $scope.trabajador.banco.id }, true )[0];
        $scope.trabajador.tienda = $filter('filter')( $scope.opciones.tiendas, {id :  $scope.trabajador.tienda.id }, true )[0];
        $scope.trabajador.centroCosto = $filter('filter')( $scope.opciones.centros, {id :  $scope.trabajador.centroCosto.id }, true )[0];
        $scope.trabajador.tipoCuenta = $filter('filter')( $scope.opciones.tiposCuentas, {id :  $scope.trabajador.tipoCuenta.id }, true )[0];
        $scope.trabajador.titulo = $filter('filter')( $scope.opciones.titulos, {id :  $scope.trabajador.titulo.id }, true )[0];
        $scope.trabajador.nacionalidad = $filter('filter')( $scope.opciones.nacionalidades, {id :  $scope.trabajador.nacionalidad.id }, true )[0];
        $scope.trabajador.estadoCivil = $filter('filter')( $scope.opciones.estadosCiviles, {id :  $scope.trabajador.estadoCivil.id }, true )[0];
        $scope.trabajador.tipo = $filter('filter')( $scope.opciones.tipos, {id :  $scope.trabajador.tipo.id }, true )[0];
        $scope.trabajador.tipoJornada = $filter('filter')( $scope.opciones.tiposJornadas, {id :  $scope.trabajador.tipoJornada.id }, true )[0];
        $scope.trabajador.tipoContrato = $filter('filter')( $scope.opciones.tiposContratos, {id :  $scope.trabajador.tipoContrato.id }, true )[0];
        $scope.trabajador.isapre = $filter('filter')( $scope.opciones.isapres, {id :  $scope.trabajador.isapre.id }, true )[0];
        $scope.trabajador.zonaImpuestoUnico = $filter('filter')( $scope.opciones.zonas, {id :  $scope.trabajador.zonaImpuestoUnico.id }, true )[0];
      }
      $scope.RMI = $scope.opciones.rmi.valor;   
      $scope.RTI = $scope.opciones.rti.valor;
      rentasTopesImponibles = $scope.opciones.rentasTopesImponibles;
    }    

    $scope.obtenerJefe = function(){
      $scope.jefe = $scope.trabajador.seccion.encargado.nombreCompleto;
    }

    $scope.cambiarMonedaSueldo = function(){
      $scope.trabajador.sueldoBase = null;
      $scope.trabajador.sueldoRMI = null;
      $scope.sueldoPesos = null;
    }

    $scope.cambiarMonedaSindicato = function(){
      $scope.trabajador.montoSindicato = null;
    }

    $scope.asignarSueldo = function(renta){
      if(renta==='rmi'){
        $scope.trabajador.monedaSueldo = $scope.monedas[0].nombre;
        $scope.trabajador.sueldoBase = $scope.RMI;
      }else if(renta==='rti'){
        $scope.trabajador.monedaSueldo = $scope.monedas[0].nombre;
        $scope.trabajador.sueldoBase = $scope.convertir($scope.RTI, 'UF');
      }else{
        $scope.trabajador.monedaSueldo = $scope.monedas[0].nombre;
        var gratificacion = (( 4.75 * $scope.RMI ) / 12 );
        var sueldo = $scope.convertir($scope.RTI, 'UF');
        $scope.trabajador.sueldoBase = (sueldo - gratificacion);      
      }
    }    

    $scope.cambiarTipoTrabajador = function(){
      if($scope.trabajador.tipoTrabajador==='Normal'){
        $scope.trabajador.excesoRetiro = false;
      }
    }

    $scope.cambiarMonedaColacion = function(){
      $scope.trabajador.colacion = null;
      $scope.colacionPesos = null;
    }

    $scope.cambiarMonedaMovilizacion = function(){
      $scope.trabajador.movilizacion = null;
      $scope.movilizacionPesos = null;
    }

    $scope.cambiarMonedaViatico = function(){
      $scope.trabajador.viatico = null;
      $scope.viaticoPesos = null;
    }

    $scope.cambiarMonedaDescuento = function(){
      $scope.descuento.monto = null;
      $scope.descuentoPesos = null;
    }

    $scope.cambiarMonedaImponible = function(){
      $scope.imponible.monto = null;
      $scope.imponiblePesos = null;
    }

    $scope.cambiarMonedaGratificacion = function(){
      $scope.trabajador.montoGratificacion = null;
    }

    $scope.cambiarMonedaNoImponible = function(){
      $scope.noImponible.monto = null;
      $scope.noImponiblePesos = null;
    }

    $scope.editAFPSeguro = function(){
      if($scope.isEditAFPSeguro){
        $scope.isEditAFPSeguro = false;
      }else{
        $scope.isEditAFPSeguro = true;
      }
    }

    $scope.selectSeguro = function(){
      $scope.isSelectSeguro = true;
    }

    $scope.cambiarPrevision = function(){
      if($scope.trabajador.prevision.id === 8){
        $scope.trabajador.seguroDesempleo = true;
        if(!$scope.isSelectSeguro){
          $scope.trabajador.afpSeguro = $scope.opciones.afpsSeguro[0];
        }
      }  
    }

    $scope.cambiarAFP = function(){
      $scope.seguroAFP();
    }

    $scope.seguroAFP = function(){
      if(!$scope.isSelectSeguro){
        if($scope.trabajador.afp.nombre === 'No está en AFP'){
          $scope.isEditAFPSeguro = true;
        }else{
          $scope.trabajador.afpSeguro = $filter('filter')( $scope.opciones.afpsSeguro, {id :  $scope.trabajador.afp.id }, true )[0];                  
        }
      }
    }

    $scope.cambiarIsapre = function(){
      if($scope.trabajador.isapre.nombre==="Fonasa"){
        $scope.trabajador.cotizacionIsapre = '%';
        $scope.trabajador.montoIsapre = 7;
      }else{
        $scope.trabajador.montoIsapre = null;
        $scope.trabajador.cotizacionIsapre = $scope.cotizaciones[0].nombre;
      }
    }

    $scope.cotizacionIsapre = function(){
      $scope.trabajador.montoIsapre = null;
      $scope.isaprePesos = null;
    }

    $scope.agregarImponible = function(){
      if($scope.isImponible){
        $scope.isImponible = false;
      }else{
        $scope.tituloImponible = 'Agregar Imponible';
        $scope.isImponible = true;
        $scope.imponible = { moneda : $scope.monedas[0].nombre };
      }
    }

    $scope.updateImponible = function(imp){
      $scope.isImponible = false;
      $scope.isEditImponible = false;

      $scope.trabajador.haberes[$scope.impIndex].tipo = imp.tipo;
      $scope.trabajador.haberes[$scope.impIndex].moneda = imp.moneda;
      $scope.trabajador.haberes[$scope.impIndex].monto = imp.monto;

      $scope.imponible.tipo = "";
      $scope.imponible.monto = "";
    }

    $scope.guardarImponible = function(){
      var imp = angular.copy($scope.imponible);
      $scope.trabajador.haberes.push(imp);
      $scope.isImponible = false;
      $scope.imponible.tipo = "";
      $scope.imponible.monto = "";
    }

    $scope.editarImponible = function(imp){
      $scope.tituloImponible = 'Modificar no Imponible';
      $scope.impIndex = $scope.trabajador.haberes.indexOf(imp);
      $scope.isImponible = true;
      $scope.isEditImponible = true;
      $scope.imponible = { moneda : imp.moneda, monto : imp.monto, tipo : imp.tipo };
      $scope.imponible.tipo = $filter('filter')( $scope.opciones.tiposHaber, {id :  imp.tipo.id }, true )[0]; 
    }

    $scope.eliminarImponible = function(imp){
      var index = $scope.trabajador.haberes.indexOf(imp );
      $scope.trabajador.haberes.splice(index,1);
    }

    $scope.updateNoImponible = function(noImp){
      $scope.isNoImponible = false;
      $scope.isEditNoImponible = false;

      $scope.trabajador.haberes[$scope.noImpIndex].tipo = noImp.tipo;
      $scope.trabajador.haberes[$scope.noImpIndex].moneda = noImp.moneda;
      $scope.trabajador.haberes[$scope.noImpIndex].monto = noImp.monto;

      $scope.noImponible.tipo = "";
      $scope.noImponible.monto = "";
    }

    $scope.guardarNoImponible = function(){
      var noImp = angular.copy($scope.noImponible);
      $scope.trabajador.haberes.push(noImp);
      $scope.isNoImponible = false;
      $scope.noImponible.tipo = "";
      $scope.noImponible.monto = "";
    }

    $scope.editarNoImponible = function(noImp){
      $scope.tituloNoImponible = 'Modificar no Imponible';
      $scope.noImpIndex = $scope.trabajador.haberes.indexOf(noImp);
      $scope.isNoImponible = true;
      $scope.isEditNoImponible = true;
      $scope.noImponible = { moneda : noImp.moneda, monto : noImp.monto, tipo : noImp.tipo };
      $scope.noImponible.tipo = $filter('filter')( $scope.opciones.tiposHaber, {id :  noImp.tipo.id }, true )[0]; 
    }

    $scope.eliminarNoImponible = function(noImp){
      var index = $scope.trabajador.haberes.indexOf(noImp);
      $scope.trabajador.haberes.splice(index,1);
    }

    $scope.guardarDescuento = function(){
      var desc = angular.copy($scope.descuento);
      $scope.trabajador.descuentos.push(desc);
      $scope.isDescuento = false;
      $scope.descuento.tipo = "";
      $scope.descuento.monto = "";
      $scope.descuento.moneda = $scope.monedas[0].nombre;
    }
    
    $scope.agregarNoImponible = function(){
      if($scope.isNoImponible){
        $scope.isNoImponible = false;
      }else{
        $scope.tituloNoImponible = 'Agregar no Imponible';
        $scope.isNoImponible = true;
        $scope.noImponible = { moneda : $scope.monedas[0].nombre };
      }
    }
    
    $scope.agregarDescuento = function(){
      if($scope.isDescuento){
        $scope.isDescuento = false;
      }else{
        $scope.isDescuento = true;
        $scope.descuento.moneda = $scope.monedas[0].nombre;
      }
    }

    $scope.editarDescuento = function(desc){
      $scope.descIndex = $scope.trabajador.descuentos.indexOf(desc);
      $scope.isDescuento = true;
      $scope.isEditDescuento = true;
      $scope.descuento = { moneda : desc.moneda, monto : desc.monto, tipo : desc.tipo };
      $scope.descuento.tipo = $filter('filter')( $scope.opciones.tiposDescuento, {id :  desc.tipo.id }, true )[0]; 
    }

    $scope.eliminarDescuento = function(desc){
      var index = $scope.trabajador.descuentos.indexOf(desc);
      $scope.trabajador.descuentos.splice(index,1);
    }

    $scope.updateDescuento = function(desc){
      $scope.isDescuento = false;
      $scope.isEditDescuento = false;

      $scope.trabajador.descuentos[$scope.descIndex].tipo = desc.tipo;
      $scope.trabajador.descuentos[$scope.descIndex].moneda = desc.moneda;
      $scope.trabajador.descuentos[$scope.descIndex].monto = desc.monto;

      $scope.descuento.tipo = "";
      $scope.descuento.monto = "";
    }
    
    $scope.getComunas = function(val){
      return $http.get( constantes.URL + 'comunas/buscador/json', {
        params: {
          termino: val
        }
      }).then(function(response){
        return response.data.map(function(item){
          return item;
        });
      });
    };

    $scope.reincorporar = function(){
      $scope.trabajador.estado = 'En Creación';
    }

    function activarUsuario(){
      openActivarUsuario($scope.trabajador);
      return true;
    }

    function openActivarUsuario(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormActivarUsuarioCtrl',
        size: 'sm',
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
    }

    $scope.confirmacion = function(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormConfirmacionModificacionCtrl'
      });
      miModal.result.then(function (nuevaFicha) {
        $scope.trabajador.nuevaFicha = nuevaFicha;
        $scope.guardar(true);
      }, function () {
        javascript:void(0);
      });
    }

    $scope.guardar = function (full) {
      $rootScope.cargando=true;
      $scope.trabajador.estadoUser = false;
      var response;      
      var contrato = false;
      if( $scope.trabajador.sid ){
        if(full && $scope.trabajador.estado==='En Creación'){
          $scope.trabajador.estado = 'Ingresado';
          contrato = true;
        }
        response = trabajador.datos().update({sid:$scope.trabajador.sid}, $scope.trabajador);
      }else{           
        $scope.trabajador.nuevaFicha = false;
        if(full){
          $scope.trabajador.estado = 'Ingresado';
        }else{
          $scope.trabajador.estado = 'En Creación';
        }     
        response = trabajador.datos().create({}, $scope.trabajador);
      }
      response.$promise.then(
        function(response){
          if(response.success){                        
            var nombre = $scope.trabajador.nombres + " " + $scope.trabajador.apellidos;
            $uibModalInstance.close({mensaje : response.mensaje, contrato : contrato, trabajador : { sid:  response.sid, nombreCompleto : nombre }});                   
            $rootScope.cargando=false;
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );      
    };      

    $scope.errores = function(name){
      var s = $scope.formTrabajador[name];
      return s.$invalid && s.$touched;
    }

    $scope.validaFecha = function(fecha){
      var date = $scope.formTrabajador[fecha].$viewValue;
      switch(fecha){
        case 'FechaNacimiento':
          if(date){
            $scope.invalidFechaNacimiento = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaNacimiento = false;            
          }
          break;
        case 'fechaIngreso':
          if(date){
            $scope.invalidFechaIngreso = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaIngreso = false;            
          }
          break;
        case 'fechaReconocimiento':
          if(date){
            $scope.invalidFechaReconocimiento = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaReconocimiento = false;            
          }
          break; 
        case 'fechaReconocimientoCesantia':
          if(date){
            $scope.invalidFechaReconocimientoCesantia = !validations.validaFecha(date);
          }else{
            $scope.invalidFechaReconocimientoCesantia = false;            
          }
          break; 
        case 'fechaVencimiento':
          if(date){
            $scope.invalidFechaVencimiento = !validations.validaFecha(date);
            if($scope.trabajador.fechaIngreso){
              $scope.invalidFechaVencimientoIngreso = !validations.validaFechaMin($scope.trabajador.fechaVencimiento, $scope.trabajador.fechaIngreso);
            }
            if($scope.trabajador.fechaReconocimiento){
              $scope.invalidFechaVencimientoReconocimiento = !validations.validaFechaMin($scope.trabajador.fechaVencimiento, $scope.trabajador.fechaReconocimiento);
            }
          }else{
            $scope.invalidFechaVencimiento = false;            
            $scope.invalidFechaVencimientoIngreso = false;            
            $scope.invalidFechaVencimientoReconocimiento = false;            
          }
          break;      
      }      
    }    
    
    // Fecha

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1900, 1, 1),
      startingDay: 1
    };  

    $scope.openFechaNacimiento = function() {
      $scope.popupFechaNacimiento.opened = true;
    };

    $scope.openFechaIngreso = function() {
      $scope.popupFechaIngreso.opened = true;
    };

    $scope.openFechaReconocimiento = function() {
      $scope.popupFechaReconocimiento.opened = true;
    };

    $scope.openFechaReconocimientoCesantia = function() {
      $scope.popupFechaReconocimientoCesantia.opened = true;
    };

    $scope.openFechaVencimiento = function() {
      $scope.popupFechaVencimiento.opened = true;
    };

    $scope.format = ['dd-MMMM-yyyy'];

    $scope.popupFechaNacimiento = {
      opened: false
    };
    $scope.popupFechaIngreso = {
      opened: false
    };
    $scope.popupFechaReconocimiento = {
      opened: false
    };
    $scope.popupFechaReconocimientoCesantia = {
      opened: false
    };
    $scope.popupFechaVencimiento = {
      opened: false
    };

    $scope.openCalcularSueldoBase = function () {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-calcular-sueldo-base.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCalcularSueldoBaseCtrl',
        resolve: {
          trabajador: function () {
            return $scope.trabajador;
          },
          afps: function () {
            return $scope.opciones.afps;
          },
          isapres: function () {
            return $scope.opciones.isapres;
          },
          seguroCesantia: function () {
            return $scope.opciones.tasasSeguroCesantia;
          },
          rmi: function () {
            return $scope.RMI;
          },
          rentasTopesImponibles: function () {
            return rentasTopesImponibles;
          },
          tablaImpuestoUnico: function () {
            return $scope.opciones.tablaImpuestoUnico;
          }
        }
      });
      miModal.result.then(function (sueldoBase) {
        $scope.trabajador.sueldoBase = sueldoBase;
      }, function () {
        javascript:void(0);
      });
    };

  })
  .controller('FormConfirmacionModificacionCtrl', function ($scope, $uibModalInstance) {

    $scope.titulo = 'Modificación Ficha Trabajador';
    $scope.mensaje = "¿Desea <b>modificar la ficha actual</b> sobre la que está trabajando o <b>crear una nueva ficha</b> a partir de este mes?<br /><br /><i>Si crea una nueva ficha los cambios realizados estarán disponibles sólo a partir del mes actual.</i>";
    $scope.ok = 'Modificar Ficha';
    $scope.isOK = true;
    $scope.isQuestion = true;
    $scope.cancel = 'Nueva Ficha';

    $scope.aceptar = function(){
      $uibModalInstance.close(false);      
    }

    $scope.cerrar = function(){
      $uibModalInstance.close(true);
    }

  })
  .controller('FormActivarUsuarioCtrl', function ($scope, $uibModalInstance, objeto, $http, $filter, $rootScope) {

    $scope.trabajador = objeto;

    $scope.titulo = 'Acceso Panel Empleados';
    $scope.mensaje = "¿Desea activar el acceso al Panel de Empleados al usuario " + $scope.trabajador.nombreCompleto + "?";
    $scope.ok = 'Activar';
    $scope.isOK = true;
    $scope.isQuestion = true;
    $scope.cancel = 'No Activar';

    $scope.aceptar = function(){
      $scope.trabajador.estadoUser = true;
      $uibModalInstance.close(true);      
    }

    $scope.cerrar = function(){
      $scope.trabajador.estadoUser = false;
      $uibModalInstance.dismiss('cancel');
    }

});
