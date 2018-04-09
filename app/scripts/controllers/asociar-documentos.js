'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:AsociarDocumentosCtrl
 * @description
 * # AsociarDocumentosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('AsociarDocumentosCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification, tipoDocumento) {
    $anchorScroll();
    $scope.datos = [];
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = trabajador.trabajadoresDocumentos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
        $scope.cargado = true;        
      });
    };

    cargarDatos();

    $scope.documentos = function(tra){
      $rootScope.cargando=true;
      var datos = trabajador.documentos().get({sid:tra.sid});
      datos.$promise.then(function(response){
        openDocumentosTrabajador( response );
        $rootScope.cargando=false;
      });
    };

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
            return '#asociar-documentos';          
          },
          submenu: function () {
            return 'Documentos Trabajadores';          
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

    function openTiposDocumento(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-tipos-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTiposDocumentoCtrl',
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

    function openDocumentosTrabajador(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-documentos-trabajador.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDocumentosTrabajadorCtrl',
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

    $scope.gestionar = function(){
      $rootScope.cargando = true;
      var datos = tipoDocumento.datos().get();
      datos.$promise.then(function(response){
        openTiposDocumento(response.datos);
        $rootScope.cargando = false;        
      });
    }

    $scope.asociar = function(trab){
      $rootScope.cargando = true;
      var datos = tipoDocumento.datos().get();
      datos.$promise.then(function(response){
        openAsociar(trab, response.datos, null);
        $rootScope.cargando = false;        
      });
    }

  })
  .controller('FormTiposDocumentoCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, tipoDocumento, objeto, Notification) {

    $scope.datos = objeto;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = tipoDocumento.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;        
      });
    };

    $scope.open = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nuevo-tipo-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormNuevoTipoDocumentoCtrl',
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

    $scope.eliminar = function(doc){
      $rootScope.cargando=true;
      $scope.result = tipoDocumento.datos().delete({ sid: doc });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }
      });
    };

    $scope.editar = function(doc){
      $rootScope.cargando=true;
      $scope.result = tipoDocumento.datos().get({ sid: doc });
      $scope.result.$promise.then( function(response){
        $scope.open(response.datos);
        $rootScope.cargando=false;
      });
    };

  })
  .controller('FormNuevoTipoDocumentoCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, tipoDocumento, objeto, Notification) {

    if(objeto){
      $scope.documento = objeto;
      $scope.titulo = "Modificación Tipos de Documento";
      $scope.encabezado = $scope.documento.nombre;
    }else{
      $scope.titulo = "Ingreso Tipos de Documento";
      $scope.encabezado = "Nuevo Tipo de Documento";
    }

    $scope.guardar = function(doc){
      $rootScope.cargando=true;
      var response;
      if( doc.sid ){
        response = tipoDocumento.datos().update({sid:doc.sid}, $scope.documento);
      }else{
        response = tipoDocumento.datos().create({}, $scope.documento);
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
  .controller('FormDocumentosTrabajadorCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, objeto, $uibModal, tipoDocumento, constantes, Notification, trabajador, documento) {
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.constantes = angular.copy(constantes);
    $scope.accesos = angular.copy(objeto.accesos);

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = trabajador.documentos().get({ sid: $scope.trabajador.sid });
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $rootScope.cargando = false;        
      });
    }

    $scope.frame = function(obj){
      var url = $scope.constantes.URL + 'trabajadores/documento/obtener/' + obj.sid;
      window.open(url);
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
            return '#asociar-documentos';          
          },
          submenu: function () {
            return 'Documentos Trabajadores';          
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

    $scope.asociar = function(trab){
      $rootScope.cargando = true;
      var datos = tipoDocumento.datos().get();
      datos.$promise.then(function(response){
        openAsociar(trab, response.datos, null);
        $rootScope.cargando = false;        
      });
    }

    $scope.editar = function(doc){
      $rootScope.cargando=true;
      $scope.result = documento.datos().get({ sid: doc.sid });
      $scope.result.$promise.then( function(response){
        openAsociar($scope.trabajador, response.datos, response.documento);
        $rootScope.cargando = false; 
      });
    };

    $scope.eliminar = function(doc){
      var obj = { sid: doc.sid, menu : '#asociar-documentos', submenu : 'Documentos Trabajador' };
      $scope.result = documento.eliminarDocumento().post({}, obj);
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos($scope.trabajador.sid);
        }
      });
    };

  })
  .controller('FormDocumentosCtrl', function ($scope, $uibModalInstance, $rootScope, trabajador, tiposDoc, menu, submenu, doc, $uibModal, constantes, Upload, documento, Notification, $filter) {
    $scope.trabajador = angular.copy(trabajador);
    $scope.tiposDocumento = angular.copy(tiposDoc);

    $scope.error = {};    
    $scope.listaErrores=[];
    $scope.constantes = constantes;  

    if(doc){
      $scope.title = 'Modificar Documento';
      $scope.documento = angular.copy(doc);
      $scope.documento.tipo = $filter('filter')( $scope.tiposDocumento, {id :  $scope.documento.tipo.id }, true )[0];
      $scope.isEdit = true;
    }else{
      $scope.title = 'Asociar Documentos';          
      $scope.documento = {};
      $scope.isEdit = false;
    }

    $scope.$watch('documento.file', function () {
      $scope.importar($scope.documento.file);
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
          data: { file : file, idTrabajador : $scope.trabajador.id, menu: menu, submenu: submenu, idTipoDocumento : $scope.documento.tipo.id, descripcion : $scope.documento.descripcion }
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

    $scope.modificar = function () {
      var doc = { idTipoDocumento : $scope.documento.tipo.id, menu: menu, submenu: submenu, descripcion : $scope.documento.descripcion };
      $rootScope.cargando=true;
      var response;
      response = documento.datos().update({sid:$scope.documento.sid}, doc);
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
