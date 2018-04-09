'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:OrganicaCtrl
 * @description
 * # OrganicaCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('OrganicaCtrl', function ($scope, $uibModal, $filter, $anchorScroll, jornada, constantes, $rootScope, organica, Notification) {
    $anchorScroll();
    
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = organica.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.secciones;
        $scope.cargado = true;
        $rootScope.cargando = false;
      });
    }

    cargarDatos();

    function open(obj) {
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-nueva-seccion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormSeccionCtrl',
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

    $scope.eliminar = function(sec){
      $rootScope.cargando=true;
      $scope.result = organica.datos().delete({ sid: sec.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }else{
          $scope.erroresDatos = response.errores;
          Notification.error({message: response.errores.error[0], title: 'Mensaje del Sistema', delay: ''});
          $rootScope.cargando=false;
        }
      })
    };

    $scope.openSeccion = function(sec){
      $rootScope.cargando=true;
      var datos = organica.datos().get({sid: sec});
      datos.$promise.then(function(response){
        open( response );
        $rootScope.cargando=false;
      });
    };

    $scope.editar = function(sec){
      $rootScope.cargando=true;
      var datos = organica.datos().get({sid: sec});
      datos.$promise.then(function(response){
        open( response );
        $rootScope.cargando=false;
      });
    };
    
  })
  .controller('FormSeccionCtrl', function ($scope, $filter, $uibModalInstance, objeto, Notification, $rootScope, organica, trabajador) {    

    if(objeto.datos){
      $scope.seccion = angular.copy(objeto.datos);
      $scope.titulo = 'Modificación Secciones';
      $scope.encabezado = $scope.seccion.nombre;
      $scope.seccion.encargado = objeto.datos.encargado;
    }else{
      $scope.titulo = 'Ingreso Secciones';
      $scope.encabezado = 'Nueva Sección';
    }

    $scope.secciones = objeto.secciones;
    actualizarOptions(); 

    function actualizarOptions(){
      if($scope.seccion){
        $scope.seccion.dependencia = $filter('filter')( $scope.secciones, {id :  $scope.seccion.dependencia.id }, true )[0];
      }
    }

    function cargarTrabajadores(){
      $rootScope.cargando = true;
      var datos = trabajador.inputActivos().get();
      datos.$promise.then(function(response){
        $scope.trabajadores = response.datos;
        $rootScope.cargando = false;        
      });
    };

    //cargarTrabajadores();

    $scope.seleccionarTrabajador = function(trabajador){
      $scope.trabajador = trabajador.trabajador;
      $scope.mostrar = true;
    }

    $scope.fnSecciones = function(item){
      var bool = true;
      if($scope.seccion){
        if(item.id === $scope.seccion.id){
          bool = false;
        }
      }
      return bool;
    }

    /*function cargarDatos(){
      $rootScope.cargando = true;
      var datos = organica.datos().get();
      datos.$promise.then(function(response){
        $scope.secciones = response.datos;
        $rootScope.cargando = false;
        actualizarOptions();        
      });
    }

    cargarDatos();
  */
    $scope.guardar = function (seccion) {
      $rootScope.cargando=true;
      var response;
      if( seccion.sid ){
          response = organica.datos().update({sid:seccion.sid}, seccion);
      }else{
          response = organica.datos().create({}, seccion);
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
    };    

  });
