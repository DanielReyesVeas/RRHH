'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ClausulasContratoCtrl
 * @description
 * # ClausulasContratoCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ClausulasContratoCtrl', function ($scope, $uibModal, $filter, $anchorScroll, clausulaContrato, constantes, $rootScope, Notification, plantillaContrato) {
    
    $anchorScroll();

    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.cargado = false;
    
    $scope.open = function(clausula){
      $rootScope.cargando = true;
      $scope.cargado = false;
      var datos = plantillaContrato.datos().get();
      datos.$promise.then(function(response){
        openClausula(clausula, response.datos);
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    }

    function openClausula(obj, plan) {
      var miModal = $uibModal.open({
        animation: true,
        backdrop: false,
        templateUrl: 'views/forms/form-nueva-clausula-contrato.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormClausulasContratoCtrl',
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
      $scope.result = clausulaContrato.datos().delete({ sid: objeto.sid });
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
      var datos = clausulaContrato.datos().get();
      datos.$promise.then(function(response){
        $scope.accesos = response.accesos;
        $scope.datos = response.datos;
        $rootScope.cargando = false;
        $scope.cargado = true;
      });
    };

    cargarDatos();

})
  .controller('FormClausulasContratoCtrl', function ($scope, $uibModalInstance, objeto, Notification, $rootScope, clausulaContrato, plantillas, $filter) {

    $scope.plantillas = angular.copy(plantillas);
    $scope.isBold = false;
    $scope.bold = false;
    $scope.isUnderline = false;
    $scope.underline = false;
    $scope.isItalic = false;
    $scope.italic = false;

    if(objeto){
      $scope.clausulaContrato = angular.copy(objeto);
      $scope.titulo = 'Modificación Cláusulas de Contrato';
      $scope.encabezado = $scope.clausulaContrato.nombre;
      $scope.clausulaContrato.plantilla = $filter('filter')( $scope.plantillas, {id :  $scope.clausulaContrato.plantilla.id }, true )[0];
    }else{
      $scope.clausulaContrato = {};
      $scope.titulo = 'Ingreso Cláusula de Contrato';
      $scope.encabezado = 'Nueva Cláusula de Contrato';
    }

    $scope.guardar = function () {
      $rootScope.cargando=true;
      var response;
      if( $scope.clausulaContrato.sid ){
          response = clausulaContrato.datos().update({sid:$scope.clausulaContrato.sid}, $scope.clausulaContrato);
      }else{
          response = clausulaContrato.datos().create({}, $scope.clausulaContrato);
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
