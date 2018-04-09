'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:CertificadosCtrl
 * @description
 * # CertificadosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('CertificadosCtrl', function ($scope, $uibModal, $filter, $anchorScroll, trabajador, constantes, $rootScope, Notification, plantillaCertificado) {
    
    $anchorScroll();
    $scope.objeto = [];
    $scope.isSelect = false;
    $scope.cargado = false;
    $scope.empresa = $rootScope.globals.currentUser.empresa;

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = trabajador.trabajadoresCertificados().get();
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
      var datos = plantillaCertificado.datos().get();
      datos.$promise.then(function(response){
        open(response.datos, trab);
        $rootScope.cargando=false;
      });
    }

    $scope.detalle = function(sid){
      $rootScope.cargando=true;
      var datos = trabajador.certificados().get({sid: sid});
      datos.$promise.then(function(response){
        openDetalle(response);
        $rootScope.cargando=false;
      });
    }

    function openDetalle(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-detalle-certificados.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormDetalleCertificadosCtrl',
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
        templateUrl: 'views/forms/form-ingresar-certificado.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormIngresarCertificadoCtrl',
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
      var datos = plantillaCertificado.datos().get();
      datos.$promise.then(function(response){
        openGestionar(response.datos);
        $rootScope.cargando=false;
      });
    }

    function openGestionar(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-plantillas-certificados.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillasCertificadosCtrl',
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
  .controller('FormDetalleCertificadosCtrl', function ($rootScope, constantes, $uibModal, $filter, $scope, $uibModalInstance, objeto, trabajador, certificado, Notification) {
    $scope.trabajador = angular.copy(objeto.datos);
    $scope.accesos = angular.copy(objeto.accesos);
    $scope.constantes = constantes;

    function cargarDatos(tra){
      $rootScope.cargando = true;
      var datos = trabajador.certificados().get({sid: tra});
      datos.$promise.then(function(response){
        $scope.trabajador = response.datos;
        $scope.accesos = response.accesos;
        $rootScope.cargando = false;
      });
    }

    $scope.eliminar = function(cert, tra){
      $rootScope.cargando=true;
      $scope.result = certificado.datos().delete({ sid: cert.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          $rootScope.cargando=false;
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos(tra);
        }
      })
    }

    $scope.detalle = function(cert, tra){
      $rootScope.cargando=true;
      console.log(cert)
      var url = $scope.constantes.URL + 'trabajadores/documento/obtener/' + cert.documento.sid;
      window.open(url);
      $rootScope.cargando=false;
      //$scope.result = certificado.datos().get({ sid: cert.sid });
      /*$scope.result.$promise.then( function(response){
        $rootScope.cargando=false;
        openCertificado(response, true);
      })*/
    }

    function openCertificado(cert, sid){      
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-certificado.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCertificadoCtrl',
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
  .controller('FormPlantillasCertificadosCtrl', function ($rootScope, $uibModal, $filter, $scope, $uibModalInstance, objeto, Notification, plantillaCertificado) {
    $scope.datos = objeto;

    function cargarDatos(){
      $rootScope.cargando = true;
      var datos = plantillaCertificado.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando = false;
      });
    }

    $scope.editar = function(sid){
      $rootScope.cargando=true;
      $scope.result = plantillaCertificado.datos().get({ sid: sid });
      $scope.result.$promise.then( function(response){
        $rootScope.cargando=false;
        $scope.open(response);
      })
    }

    $scope.open = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-plantilla-certificado.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillaCertificadoCtrl',
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

    $scope.eliminar = function(sid){
      $rootScope.cargando=true;
      $scope.result = plantillaCertificado.datos().delete({ sid: sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
        }
        $rootScope.cargando=false;
        cargarDatos();
      });
    }

  })
  .controller('FormPlantillaCertificadoCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, objeto, Notification, plantillaCertificado) {
    
    if(objeto){
      $scope.certificado = angular.copy(objeto.datos);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Motivo de Notificación';
      $scope.encabezado = $scope.certificado.nombre;
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
        plugins: 'nonbreaking',
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent"
    };

    $scope.guardar = function(certificado){
      $rootScope.cargando=true;
      var response;
      if( certificado.sid ){
        response = plantillaCertificado.datos().update({sid:certificado.sid}, $scope.certificado);
      }else{
        response = plantillaCertificado.datos().create({}, $scope.certificado);
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
  .controller('FormIngresarCertificadoCtrl', function ($rootScope, $uibModal, $filter, $scope, $uibModalInstance, objeto, trab, trabajador, plantillaCertificado) {

    $scope.trabajador = angular.copy(trab);
    $scope.plantillas = angular.copy(objeto);
    $scope.cargado = false;

    $scope.generar = function(){
      var obj = { sidTrabajador : $scope.trabajador.sid, sidPlantilla : $scope.certificado.plantilla };
      $rootScope.cargando=true;
      var datos = trabajador.certificado().post({}, obj);
      datos.$promise.then(function(response){
        $rootScope.cargando=false;
        certificado(response, false);
      });      
    }

    function certificado(obj, bool){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-certificado.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormCertificadoCtrl',
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
  .controller('FormCertificadoCtrl', function ($rootScope, $scope, $filter, $uibModalInstance, $uibModal, objeto, trabajador, Notification, fecha, certificado, isDetail) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;
    $scope.trabajador = angular.copy(objeto.trabajador);
    $scope.certificado = angular.copy(objeto.datos);
    $scope.isDetail = isDetail;

    $scope.ingresar = function(){
      var cert = { idPlantillaCertificado : $scope.certificado.id, idTrabajador : $scope.trabajador.id, idEncargado : $scope.trabajador.id, idEmpresa : $scope.empresa.id, razonSocialEmpresa : $scope.empresa.empresa, rutEmpresa : $scope.empresa.rut, direccionEmpresa : $scope.empresa.direccion, rutTrabajador : $scope.trabajador.rut, nombreCompletoTrabajador : $scope.trabajador.nombreCompleto, cargoTrabajador : $scope.trabajador.cargo.nombre, seccionTrabajador : $scope.trabajador.seccion.nombre, fechaIngresoTrabajador : $scope.trabajador.fechaIngreso, direccionTrabajador : $scope.trabajador.direccion, comunaTrabajador : $scope.trabajador.comuna.comuna, provinciaTrabajador : $scope.trabajador.comuna.provincia, fecha : new Date(), folio : 4548452, cuerpo : $scope.certificado.cuerpo };
      $rootScope.cargando=true;
      var response;
      response = certificado.datos().create({}, cert);
      
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
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

  });
