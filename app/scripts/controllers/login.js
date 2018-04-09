'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('LoginCtrl', function ($scope, $route, $rootScope, $uibModal, $routeParams, $window, $timeout, $location, login, Notification, empresa, constantes) {
    $scope.alert = {};
    $scope.SIdAcceso = $routeParams.SId;
    $scope.datosEmpresa={};
    $scope.username='';
    $scope.password='';
    $scope.opciones={};
    $rootScope.path = $scope.SIdAcceso;
    $scope.opciones.empresas = [];
    $scope.constantes = constantes;
    $rootScope.cargando=false;
    $scope.ocultarLoggin=true;

    $scope.loginBtn = function(){
      $rootScope.habilitarVista=true;
      $rootScope.cargando = true;
      login.Login($scope.username, $scope.password, $scope.SIdAcceso, function (response) {
        if (response.success) {
          if(response.isEmpleado){
            Notification.clearAll();
            login.SetCredentials($scope.username, $scope.password, response.cliente, response.usuario, response.menu, response.accesos, response.inicio, response.imagen, response.nombre, response.empresas, response.empresa, response.max, response.uID, response.listaMesesDeTrabajo, response.uf, response.utm, response.uta, response.isEmpleado );                                  
            $location.path(response.inicio);
            $route.reload();
            $rootScope.cargando= false;
            $timeout(function(){
              $('#main-menu').smartmenus('refresh');
            }, 500);
          }else{
            if(response.accesos.length>0){
              Notification.clearAll();
              login.SetCredentials($scope.username, $scope.password, response.cliente, response.usuario, response.menu, response.accesos, response.inicio, response.imagen, response.nombre, response.empresas, response.empresa, response.max, response.uID, response.listaMesesDeTrabajo, response.uf, response.utm, response.uta, response.isEmpleado );                                  
              $location.path(response.inicio);
              $route.reload();
              $timeout(function(){
                $('#main-menu').smartmenus('refresh');
              }, 500);
            }else{
              Notification.clearAll();
              Notification.error({message: 'El Usuario no cuenta con ningún acceso. <br />Por favor comuníquse con el <b>Administrador</b>.', title: 'Mensaje del Sistema', delay : ''});
              $rootScope.cargando= false;
            }
          }
          /*
          $window.location.reload();
          */
        } else {
          Notification.clearAll();
          Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          $rootScope.cargando= false;
          $scope.cerrarAlert();
        }
      });
    };

    $scope.cerrarAlert = function(){
      $timeout(function(){
        $scope.alert.mensaje='';
      }, 3000);
    };
    login.ClearCredentials();

    $scope.cargarDatos = function(){

        if( $scope.SIdAcceso ){
            $rootScope.cargando=true;
            var datos = empresa.datosEmpresaPortalTrabajador($scope.SIdAcceso).get();
            datos.$promise.then(function(respuesta){
                $scope.datosEmpresa = respuesta;
                $rootScope.cargando=false;
                $scope.ocultarLoggin=false;
            })
        }else{
          $scope.ocultarLoggin=false;
        }
    };

    $scope.cargarDatos();


    $scope.formularioRestablecerContrasena = function(){
          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myFormRestablecerPassword.html',
              controller: 'ModalFormRestablecerPasswordCtrl',
              size: '600',
              resolve : {
                  SIdAcceso : function(){
                      return $scope.SIdAcceso;
                  }
              }
          });
      };
        
  })

  .controller('ModalFormRestablecerPasswordCtrl', function ($scope, $rootScope, Notification, $timeout, constantes, $uibModalInstance, $filter, login, vcRecaptchaService, SIdAcceso ) {
        
        $scope.objeto={
            empresa : SIdAcceso,
            usuario : '',
            email : ''
        };
        $scope.gestion={
            key:'6LeoaVAUAAAAAMQb19BvP6_JgmVGXqgqBJlDhlIK'
        };
        $scope.cancel = function () {
            $uibModalInstance.close();
        };

        $scope.restablecer = function(){
            if(vcRecaptchaService.getResponse() === ""){ //if string is empty
                Notification.error({message: 'Por favor, resuelva el captcha para continuar', title:'Notificación del Sistema', delay:10000});
            }else {
                $rootScope.cargandoRC=true;
                var datos = login.reestablecerPassword().post({}, $scope.objeto);
                datos.$promise.then(function(respuesta){
                    if( respuesta.success ){
                        Notification.success({message: respuesta.mensaje, title:'Notificación del Sistema', delay:10000});
                        $uibModalInstance.close();
                    }else{
                        Notification.error({message: respuesta.mensaje, title:'Notificación del Sistema', delay:10000});
                    }
                    $rootScope.cargandoRC=false;
                });
            } 
        };
    });

