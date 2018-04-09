'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:EmpleadosCtrl
 * @description
 * # EmpleadosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('EmpleadosCtrl', function ($scope, $sce, $filter, $rootScope, $uibModal, Notification, constantes, empleado) {
    
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.opciones = {};
    $scope.objeto = [];
    $scope.isSelect = false;
    $scope.cargado = false;
    $scope.usuarios = null;

    function open(obj, opc, isActivar, masivo) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-empleado.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'EmpeladosCtrl',
        size: '800',
        backdrop: 'static',
        resolve: {
          objeto : function(){
            return obj;
          },
          opciones: function () {
            return opc;
          },
          isActivar: function () {
            return isActivar;
          },
          masivo: function () {
            return masivo;
          },
          usuarios: function () {
            return $scope.usuarios;
          }
        }
      });
      modalInstance.result.then(function (obj) {
        if(obj.activar){
          Notification.success({message: obj.mensaje, title: 'Usuario Activado', delay: 10000 });
        }else{
          Notification.success({message: obj.mensaje, title: 'Mensaje del Sistema'});
        }
        cargarDatos();
      }, function () {
        if(obj.id){
          if(!obj.activo){
            var user = $filter('filter')( $scope.datos, {id :  obj.id }, true )[0];
            user.activo = false;
          }
        }
      });
    };

    function cargarDatos(){
      $rootScope.cargando=true;
      $scope.cargado=false;
      var datosFunc = empleado.datos().get();
      datosFunc.$promise.then(function(response){
        $scope.datos = response.datos;
        $scope.accesos = response.accesos;
        $scope.todosNuevos = response.todosNuevos;
        $scope.todosActivos = response.todosActivos;
        $scope.todosInactivos = response.todosInactivos;
        $rootScope.cargando=false;
        crearModels();
        limpiarChecks();
      });
    };

    function crearModels(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.datos[i].check = false;
      }                 
      $scope.cargado = true;
    }

    function limpiarChecks(){
      for(var i=0, len=$scope.datos.length; i<len; i++){
        $scope.datos[i].check = false
      }
      $scope.isSelect = false;
      $scope.objeto.todos = false;
    }

    $scope.select = function(index){
      if(!$scope.datos[index].check){
        if($scope.objeto.todos){
          $scope.objeto.todos = false; 
        }
        $scope.count = countSelected();
        $scope.isSelect = isThereSelected(); 
      }else{
        $scope.isSelect = true;
        $scope.count = countSelected();
      }
    }

    function isThereSelected(){
      var bool = false;
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check){
          bool = true;
          return bool;
        }
      }
      return bool;
    }

    function countSelected(){
      var count = 0;
      for(var i=0, len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check){
          count++;
          $scope.mensaje = 'Se reajustarán los Sueldos de los ' + count + ' trabajadores seleccionados a ';
        }
      }
      if(count===1){
        count = $scope.datos[0].nombreCompleto;
        $scope.mensaje = 'Se reajustará el Sueldo de ' + count + ' a ';
      }

      return count;
    }

    $scope.selectAll = function(){
      if($scope.objeto.todos){
        var total = 0;
        for(var i=0, len=$scope.datos.length; i<len; i++){
          $scope.datos[i].check = true
          $scope.isSelect = true;
          total++;  
        }
        $scope.count = countSelected();
      }else{
        for(var i=0, len=$scope.datos.length; i<len; i++){
          $scope.datos[i].check = false
          $scope.isSelect = false;
        }
      }
    }

    function checkUsuarios(){
      var usuarios = [];      
      for(var i=0,len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check){
          usuarios.push($scope.datos[i]);          
        }
      }

      return usuarios;
    }

    function checkUsuariosActivos(){
      var usuarios = [];      
      for(var i=0,len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check && $scope.datos[i].activo){
          usuarios.push($scope.datos[i]);          
        }
      }

      return usuarios;
    }

    function checkUsuariosInactivos(){
      var usuarios = [];      
      for(var i=0,len=$scope.datos.length; i<len; i++){
        if($scope.datos[i].check && !$scope.datos[i].activo && $scope.datos[i].estado!=1){
          usuarios.push($scope.datos[i]);          
        }
      }

      return usuarios;
    }

    $scope.activar = function(user){
      if(user.activo){
        $rootScope.cargando=true;
        var datos = empleado.datos().get({sid:user.sid});
        datos.$promise.then(function(response){
          open( response.datos, response.opciones, true, false );
          $rootScope.cargando=false;
        });
      }else{
        $rootScope.cargando=true;
        var datos = empleado.datos().update({sid:user.sid}, user);
        datos.$promise.then(function(response){
          $rootScope.cargando=false;
          Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
          cargarDatos();
        });
      }
    }

    $scope.activarMasivo = function(){
      $rootScope.cargando=true;
      var usuarios = checkUsuariosInactivos();
      var datos = empleado.datos().get({sid:0});
      datos.$promise.then(function(response){
        $scope.usuarios = usuarios;
        console.log($scope.usuarios)
        open( response.datos, response.opciones, true, true );
        $rootScope.cargando=false;
      });
    }

    $scope.desactivarMasivo = function(){
      $rootScope.cargando=true;
      var usuarios = checkUsuariosActivos();
      var datos = empleado.desactivarMasivo().post(usuarios);
      datos.$promise.then(function(response){
        $rootScope.cargando=false;
        Notification.success({message: response.mensaje, title: 'Mensaje del Sistema'});
        cargarDatos();
      });
    }

    $scope.generarClave = function(obj){
      generar(obj, false);
    }

    $scope.generarClaveMasivo = function(){
      var usuarios = checkUsuariosActivos();
      var usuario = { id : null };
      $scope.usuarios = usuarios;      
      generar(usuario, true);
    }

    function generar(obj, masivo){
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-password.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'EmpeladosClaveCtrl',
        size: '800',
        backdrop: 'static',
        resolve: {
          objeto : function(){
            return obj;
          },
          generarClave : function(){
            return true;
          },
          masivo : function(){
            return masivo;
          },
          usuarios : function(){
            return $scope.usuarios;
          }
        }
      });
      modalInstance.result.then(function (obj) {
        Notification.success({message: obj.mensaje, title: 'Usuario Activado', delay: 10000 });
        cargarDatos();
      }, function () {
        javascript:void(0);
      });
    }

    $scope.advertencia = function(){
      var miModal = $uibModal.open({
        animation: true,
        templateUrl: 'views/forms/form-confirmacion.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'FormConfirmacionActivarDesactivarCtrl'
      });
      miModal.result.then(function (activar) {
        if(activar){
          $scope.activarMasivo();
        }else{
          $scope.desactivarMasivo();
        }
      }, function () {
        javascript:void(0);
      });
    }

    $scope.editar = function(user){
      $rootScope.cargando=true;
      var datos = empleado.datos().get({sid:user.sid});
      datos.$promise.then(function(response){
        open( response.datos, response.opciones, false, false );
        $rootScope.cargando=false;
      });
    };

    $scope.editarMasivo = function(){
      $rootScope.cargando=true;
      var usuarios = checkUsuariosActivos();
      var datos = empleado.datos().get({sid:0});
      datos.$promise.then(function(response){
        $scope.usuarios = usuarios;
        open( response.datos, response.opciones, false, true );
        $rootScope.cargando=false;
      });
    };

    $scope.toolTipEdicion = function( nombre ){
      return 'Editar los permisos del Usuario <b>' + nombre + '</b>';
    };

    $scope.toolTipPassword = function( nombre ){
      return 'Volver a generar clave del Usuario <b>' + nombre + '</b>';
    };

    $scope.toolTipGenerarClaveMasivo = function( nombre ){
      return 'Volver a generar clave de los ' + $scope.count + ' Usuarios seleccionados';
    };

    $scope.toolTipActivarDesactivarMasivo = function( nombre ){
      return 'Activar o Desactivar los ' + $scope.count + ' Usuarios seleccionados';
    };

    $scope.toolTipActivarMasivo = function( nombre ){
      return 'Activar los ' + $scope.count + ' Usuarios seleccionados';
    };

    $scope.toolTipDesactivarMasivo = function( nombre ){
      return 'Desactivar los ' + $scope.count + ' Usuarios seleccionados';
    };

    $scope.toolTipEditarMasivo = function( nombre ){
      return 'Editar los permisos de los ' + $scope.count + ' Usuarios seleccionados';
    };

    cargarDatos();

  })
  .controller('FormConfirmacionActivarDesactivarCtrl', function ($scope, $uibModalInstance) {

    $scope.titulo = 'Activar o Desactivar Usuarios';
    $scope.mensaje = "Existen Usuarios Activos e Inactivos <br />¿Desea <b>Activar</b> los Usuarios <b>Inactivos</b> o <br /><b>Desactivar</b> los Usuarios <b>Activos</b> seleccionados?";
    $scope.ok = 'Activar Inactivos';
    $scope.ok2 = 'Desactivar Activos';
    $scope.isOK = true;
    $scope.isOK2 = true;
    $scope.isQuestion = true;
    $scope.cancel = 'Cancelar';

    $scope.aceptar = function(){
      $uibModalInstance.close(true);      
    }

    $scope.aceptar2 = function(){
      $uibModalInstance.close(false);      
    }

    $scope.cerrar = function(){
      $uibModalInstance.dismiss();
    }

  })
  .controller('EmpeladosCtrl', function ($scope, usuarios, masivo, $rootScope, $timeout, isActivar, $uibModal, $uibModalInstance, Notification, $filter, empleado, objeto, constantes ) {

    $scope.usuario = angular.copy(objeto);

    $scope.usuarios = angular.copy(usuarios);
    $scope.select = { all : false };
    $scope.isActivar = isActivar;
    $scope.masivo = masivo;
    crearModels();

    if($scope.usuario.id){
      $scope.titulo = $scope.usuario.nombreCompleto;
    }else{
      if($scope.isActivar){
        $scope.titulo = 'Activación Masiva';
      }else{
        $scope.titulo = 'Edición Masiva';
      }
    }

    function crearModels(){
      for(var i=0,len=$scope.usuario.accesos.length; i<len; i++){
        if(!$scope.usuario.accesos[i].check){
          $scope.select.all = false;
          return;
        }
      }
      $scope.select.all = true;
    }

    $scope.seleccionarOpcion = function(opc){
      for(var i=0,len=$scope.usuario.accesos.length; i<len; i++){
        if(!$scope.usuario.accesos[i].check){
          $scope.select.all = false;
          return;
        }
      }
      $scope.select.all = true;
    }

    $scope.selectAll = function(){
      for(var i=0,len=$scope.usuario.accesos.length; i<len; i++){
        $scope.usuario.accesos[i].check = $scope.select.all;
      }
    }

    $scope.close = function(){
      $uibModalInstance.dismiss($scope.objeto);
    }

    $scope.guardar = function () {
      var response;
      $rootScope.cargando=true; 
      if($scope.masivo){
        var obj = { usuarios : $scope.usuarios, accesos : $scope.usuario.accesos };
        response = empleado.cambiarPermisosMasivo().post(obj);      
      }else{
        if($scope.isActivar){
          $scope.usuario.activo = true;
        }              
        response = empleado.cambiarPermisos().post($scope.usuario);        
      }
      response.$promise.then(
        function(response){
          if(response.success){
            $uibModalInstance.close({ mensaje : response.mensaje, activar : false, masivo : $scope.masivo });
          }else{
            // error
            $scope.erroresDatos = response.errores;
            Notification.error({message: response.mensaje, title: 'Mensaje del Sistema'});
          }
          $rootScope.cargando=false;
        }
      );
    };

    $scope.activar = function () {
      if($scope.masivo){
        openClave($scope.usuario, true); 
      }else{
        openClave($scope.usuario, false);        
      }
    };

    function openClave(obj, masivo) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-password.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'EmpeladosClaveCtrl',
        size: '800',
        backdrop: 'static',
        resolve: {
          objeto : function(){
            return obj;
          },
          generarClave : function(){
            return false;
          },
          masivo : function(){
            return masivo;
          },
          usuarios : function(){
            return $scope.usuarios;
          }
        }
      });
      modalInstance.result.then(function (obj) {
        $uibModalInstance.close({ mensaje : obj, activar : true });
      }, function () {
        javascript:void(0);
      });
    };

  })
  .controller('EmpeladosClaveCtrl', function ($scope, usuarios, masivo, generarClave, $rootScope, $timeout, $uibModal, $uibModalInstance, Notification, $filter, empleado, objeto, constantes ) {

    $scope.masivo = angular.copy(masivo);
    $scope.usuario = angular.copy(objeto);
    $scope.usuarios = angular.copy(usuarios);
    $scope.generarClave = angular.copy(generarClave);

    if($scope.usuario.id){
      if($scope.usuario.nuevo){
        $scope.mensaje = "Para terminar el proceso de Activación de Usuario, el sistema generará una <b>contraseña aleatoria</b> de 4 dígitos que será enviada al correo indicado a continuación.";
      }else{
        if($scope.generarClave){
          $scope.mensaje = "El Sistema generarará una <b>nueva contraseña</b> aleatoria de 4 dígitos que será enviada al correo indicado a continuación.";      
        }else{
          $scope.mensaje = "Para terminar el proceso de Activación puede generar una <b>nueva contraseña</b> aleatoria de 4 dígitos que será enviada al correo indicado a continuación o <b>mantener la contraseña actual</b> del Usuario.";      
        }
      }
      $scope.titulo = $scope.usuario.nombreCompleto;
    }else{
      if($scope.masivo){
        $scope.mensaje = "El Sistema generarará una <b>nueva contraseña</b> aleatoria de 4 dígitos que será enviada al correo indicado a los correos personales de los " + $scope.usuarios.length + " Usuarios seleccionados.";      
      }else{
        $scope.mensaje = "Para Activar los Usuarios, el sistema generará una <b>contraseña aleatoria</b> de 4 dígitos que será enviada su correo personal respectivamente.";
      }
      $scope.titulo = "Generación Masiva";
    }

    $scope.generar = function () {
      $rootScope.cargando=true;
      var response;
      response = empleado.activarUsuario().post($scope.usuario);

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

    $scope.generarMasivo = function () {
      $rootScope.cargando=true;
      var response;
      var obj = { usuarios : $scope.usuarios, accesos : $scope.usuario.accesos };
      console.log($scope.usuarios)
      response = empleado.activarMasivo().post(obj);
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

    $scope.enviarClave = function () {
      $rootScope.cargando=true;
      var response;
      if($scope.masivo){
        response = empleado.generarClaveMasivo().post($scope.usuarios);        
      }else{
        response = empleado.generarClave().post($scope.usuario);        
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

    $scope.reactivar = function () {
      $rootScope.cargando=true;
      var response;
      response = empleado.reactivarUsuario().post($scope.usuario);
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
