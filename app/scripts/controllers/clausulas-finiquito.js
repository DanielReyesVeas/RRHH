'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ClausulasFiniquitoCtrl
 * @description
 * # ClausulasFiniquitoCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ClausulasFiniquitoCtrl', function($scope, $uibModal, $filter, $anchorScroll, clausulaFiniquito, constantes, $rootScope, Notification, plantillaFiniquito) {
    
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function(clausula){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = plantillaFiniquito.datos().get();
      datos.$promise.then(function(response){
        openClausula(clausula, response.datos);
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    $scope.plantillasFiniquitos = function(){
      $rootScope.cargando=true;
      var datos = plantillaFiniquito.datos().get();
      datos.$promise.then(function(response){
        openPlantillasFiniquitos(response.datos);
        $rootScope.cargando=false;
      });
    }

    function openPlantillasFiniquitos(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-tipos-plantillas-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormTiposPlantillasFiniquitoCtrl',
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

    function openClausula(obj, plan) {
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-nueva-clausula-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormClausulasFiniquitoCtrl',
        size: 'lg',
        resolve: {
          objeto: function () {
            return obj;
          },
          plantillas: function () {
            return plan;
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

    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = clausulaFiniquito.datos().delete({ sid: objeto.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }
      });
    };

    function cargarDatos(){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = clausulaFiniquito.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

  })
  .controller('FormTiposPlantillasFiniquitoCtrl', function ($scope, $uibModal, $uibModalInstance, objeto, $http, $filter, $rootScope, plantillaFiniquito, Notification) {
    $scope.datos = angular.copy(objeto);

    function cargarDatos(){
      $rootScope.cargando=true;
      var datos = plantillaFiniquito.datos().get();
      datos.$promise.then(function(response){
        $scope.datos = response.datos;
        $rootScope.cargando=false;
      });
    }

    $scope.openPlantillaFiniquito = function(obj){
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-plantilla-finiquito.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormPlantillaFiniquitoCtrl',
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
      var datos = plantillaFiniquito.datos().get({sid: plan.sid});
      datos.$promise.then(function(response){
        $scope.openPlantillaFiniquito(response.datos);
        $rootScope.cargando=false;
      });
    }

    $scope.eliminar = function(plan){
      $rootScope.cargando=true;
      $scope.result = plantillaFiniquito.datos().delete({ sid: plan });
      $scope.result.$promise.then( function(response){
        if(response.success){
          $rootScope.cargando=false;
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          cargarDatos();
        }
      })
    }

  })
  .controller('FormPlantillaFiniquitoCtrl', function ($scope, $uibModalInstance, objeto, $http, $filter, $rootScope, plantillaFiniquito, Notification) {

    $scope.empresa = $rootScope.globals.currentUser.empresa;

    if(objeto){
      $scope.plantillaFiniquito = angular.copy(objeto);
      $scope.isEdit = true;
      $scope.titulo = 'Modificación Plantilla de Finiquito';
      $scope.encabezado = $scope.plantillaFiniquito.nombre;
    }else{
      $scope.isEdit = false;
      $scope.titulo = 'Ingreso Plantillas de Finiquitos';
      $scope.encabezado = 'Nueva Plantilla de Finiquito';
    }

    $scope.tinymceOptions = {
        resize: false,
        width: 800,  // I *think* its a number and not '400' string
        height: 500,
        plugins: 'textcolor',
        entity_encoding : "raw",
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify"
    };

    $scope.guardar = function(plan){
      $rootScope.cargando=true;
      var response;
      if( plan.sid ){
        response = plantillaFiniquito.datos().update({sid:plan.sid}, $scope.plantillaFiniquito);
      }else{
        response = plantillaFiniquito.datos().create({}, $scope.plantillaFiniquito);
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
  .controller('FormClausulasFiniquitoCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, clausulaFiniquito, plantillas, $filter) {

    $scope.plantillas = angular.copy(plantillas);
    $scope.isBold = false;
    $scope.bold = false;
    $scope.isUnderline = false;
    $scope.underline = false;
    $scope.isItalic = false;
    $scope.italic = false;

    if(objeto){
      $scope.clausulaFiniquito = angular.copy(objeto);
      $scope.titulo = 'Modificación Cláusulas de Finiquito';
      $scope.encabezado = $scope.clausulaFiniquito.nombre;
      $scope.clausulaFiniquito.plantilla = $filter('filter')( $scope.plantillas, {id :  $scope.clausulaFiniquito.plantilla.id }, true )[0];
    }else{
      $scope.clausulaFiniquito = {};
      $scope.titulo = 'Ingreso Cláusula de Finiquito';
      $scope.encabezado = 'Nueva Cláusula de Finiquito';
    }

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.clausulaFiniquito.sid ){
        response = clausulaFiniquito.datos().update({sid:$scope.clausulaFiniquito.sid}, $scope.clausulaFiniquito);
      }else{
        response = clausulaFiniquito.datos().create({}, $scope.clausulaFiniquito);
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
    
    $scope.tinymceOptions = {
        resize: false,
        width: 600,  // I *think* its a number and not '400' string
        height: 200,
        plugins: 'nonbreaking',
        statusbar : false,
        toolbar_items_size: 'small',
        menubar: false,
        toolbar: "bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent"
    };

    $scope.textFormat = function(style){
      switch(style){
        case 'b':
          if($scope.isBold){
            $scope.isBold = false;
          }else{
            $scope.isBold = true;
          }
          break;
        case 'i':
          if($scope.isItalic){
            $scope.isItalic = false;
          }else{
            $scope.isItalic = true;
          }
          break;
        case 'u':
          if($scope.isUnderline){
            $scope.isUnderline = false;
          }else{
            $scope.isUnderline = true;
          }
          break;
        }
    }

    $scope.textFormato = function(style){
      switch(style){
        case 'b':
          if($scope.bold){
            $scope.bold = false;
          }else{
            $scope.bold = true;
          }
          break;
        case 'i':
          if($scope.italic){
            $scope.italic = false;
          }else{
            $scope.italic = true;
          }
          break;
        case 'u':
          if($scope.underline){
            $scope.underline = false;
          }else{
            $scope.underline = true;
          }
          break;
        }
    }

});
