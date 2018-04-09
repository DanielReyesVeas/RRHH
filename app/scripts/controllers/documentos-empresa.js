'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:DocumentosEmpresaCtrl
 * @description
 * # DocumentosEmpresaCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('DocumentosEmpresaCtrl', function ($scope, $uibModal, $filter, $anchorScroll, documentoEmpresa, constantes, $rootScope, Notification, tipoDocumento) {
    $anchorScroll();
    $scope.datos = [];
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = documentoEmpresa.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
        $scope.cargado = true;        
      });
    };

    cargarDatos();

    $scope.importar = function(doc){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-importar-documento.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormImportarDocumentosCtrl',
        resolve: {
          objeto: function () {
            return doc;          
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

    $scope.detalle = function(doc){
      $rootScope.cargando=true;
      var url = constantes.URL + 'documentos-empresa/documento/descargar-documento/' + doc.sid;
      window.open(url);
      $rootScope.cargando = false;
    }

    $scope.editar = function(doc){
      $rootScope.cargando=true;
      $scope.result = documentoEmpresa.datos().get({ sid: doc.sid });
      $scope.result.$promise.then( function(response){
        $scope.importar(response.datos);
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(doc){
      $rootScope.cargando=true;
      $scope.result = documentoEmpresa.datos().delete({ sid: doc.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }
      });
    };

  }) 
  .controller('FormImportarDocumentosCtrl', function ($scope, $uibModalInstance, $rootScope, objeto, $uibModal, constantes, Upload, documentoEmpresa, Notification, $filter) {

    $scope.error = {};    
    $scope.listaErrores=[];
    $scope.constantes = constantes;  

    if(objeto){
      $scope.titulo = 'Modificar Documentos';
      $scope.documento = angular.copy(objeto);
      $scope.encabezado = $scope.documento.alias;
      $scope.isEdit = true;
    }else{
      $scope.titulo = 'Importar Documentos';          
      $scope.encabezado = 'Nuevo Documento';          
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
        console.log($scope.documento)
        Upload.upload({
          url: constantes.URL + 'documentos-empresa/archivo/subir',
          data: { file : file, publico : $scope.documento.publico, descripcion : $scope.documento.descripcion }
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
      var doc = { publico : $scope.documento.publico, nombre : $scope.documento.nombre, alias : $scope.documento.alias, descripcion : $scope.documento.descripcion };
      $rootScope.cargando=true;
      var response;
      response = documentoEmpresa.datos().update({sid:$scope.documento.sid}, doc);
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
