'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MenuCtrl',function ($scope, $rootScope, $filter, $localStorage, $timeout, $uibModal, Notification, menu) {
    	
    var empresa = $rootScope.globals.currentUser.empresa;
    $scope.master = {};
    $scope.opciones = {};
    $scope.openForm = function(menu){
      $scope.menu = menu;
      if( menu.sid ){
        $scope.menu.padre = $filter('filter')( $scope.opciones.padres, {id:menu.padre}, true)[0];
        $scope.menu.posicion = $filter('filter')( $scope.opciones.posiciones, {id:menu.posicion}, true)[0];
        //$scope.menu.departamento = $filter('filter')( $scope.opciones.departamentos, {id:menu.departamento}, true)[0];
        $scope.menu.tipo = $filter('filter')( $scope.opciones.tipos, {id:menu.tipo}, true)[0];
        $scope.menu.administrador = $filter('filter')( $scope.opciones.categorias, {id:menu.administrador}, true)[0];
      }else{
        $scope.menu.padre = $scope.opciones.padres.length? $scope.opciones.padres[0] : '';
        $scope.menu.posicion = $scope.opciones.posiciones[0];
        //$scope.menu.departamento = $scope.opciones.departamentos[0];
        $scope.menu.tipo = $scope.opciones.tipos[0];
        $scope.menu.administrador =$scope.opciones.categorias[0];
      }

      var modalInstance = $uibModal.open({
      	animation: $scope.animationsEnabled,
          templateUrl: 'myModalMenu.html',
          controller: 'ModalFormMenuCtrl',
          backdrop : 'static',
          resolve: {
            objeto: function () {
              return $scope.menu;
            },
            opciones: function () {
              return $scope.opciones;
            }  
          }
      });

      modalInstance.result.then(function (respuesta) {
        Notification.success({message: respuesta.mensaje, title:'Notificación del Sistema'});
        $rootScope.globals.currentUser.menu = respuesta.menu;
        $localStorage.globals.currentUser.menu = respuesta.menu;
        $scope.cambiarEmpresa(empresa);
        $scope.cargarDatos();
      });
      /*
      $('#myModal').data('bs.modal').handleUpdate();
      */
    };    
      
    $scope.eliminar = function(objeto){
      $rootScope.cargando=true;
      $scope.result = menu.datos().delete({ id: objeto.sid });
      $scope.result.$promise.then( function(response){
        if(response.success){
          Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
          $scope.cambiarEmpresa(empresa);
          $scope.cargarDatos();
        }
      });
    };

    $scope.editar = function(objeto){
      $rootScope.cargando = true;
      var datos = menu.datos().get( { id: objeto.sid });
      datos.$promise.then( function(datos){
        $scope.openForm( datos );
        $rootScope.cargando = false;
      });
    };


    $scope.cargarDatos = function(){
    	$rootScope.cargando = true;
    	var datos = menu.datos().get();
    	datos.$promise.then(function(response){
    		$scope.datos = response.datos;
    		$scope.opciones = response.opciones;
	 		  $rootScope.cargando = false;
    	});
    };
    $scope.cargarDatos();
        
  })
	.controller('ModalFormMenuCtrl', function ($scope, $rootScope, $uibModalInstance, menu, constantes, objeto, opciones) {

    $scope.objeto = objeto;
    $scope.opciones = opciones;
    $scope.alert = {};
        

    if( !objeto.sid ){
      $scope.objeto.permisos={
        ver : true,
        crear: true,
        eliminar: true,
        modificar : true
      };
    }else{
      if( $scope.objeto.permisos.length === 0 ){
        $scope.objeto.permisos={
          ver : true,
          crear: true,
          eliminar: true,
          modificar : true
        };
      }
    }

    $scope.guardar = function () {
      $rootScope.cargando = true;
      var datos;
      if( $scope.objeto.sid ){
        datos = menu.datos().update( { id:$scope.objeto.sid }, $scope.objeto );
      }
      else{
        datos = menu.datos().create( {}, $scope.objeto );
      }

      datos.$promise.then(
        function( data ){
          if (data.success) {
            $uibModalInstance.close( data );
          }else{
            $scope.alert.tipo='danger';
            $scope.alert.mensaje = data.mensaje;
          }
        }
      );
    };

    $scope.cancel = function () {
    	$uibModalInstance.dismiss();
    };

	});