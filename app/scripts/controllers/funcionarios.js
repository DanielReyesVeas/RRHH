'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:FuncionariosCtrl
 * @description
 * # FuncionariosCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('FuncionariosCtrl', function ($scope, $sce, $filter, $rootScope, $uibModal, Notification, constantes, funcionario) {
    $scope.datos = [];
    $scope.constantes = constantes;
    $scope.opciones = {};
    
    $scope.open = function (func) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/forms/form-usuario.html?v=' + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
        controller: 'ModalFuncionarioCtrl',
        size: '800',
        backdrop: 'static',
        resolve: {
          objeto : function(){
            return func;
          },
          opciones: function () {
            return $scope.opciones;
          }
        }
      });
      modalInstance.result.then(function (mensaje) {
        Notification.success({message: mensaje, title: 'Mensaje del Sistema'});
        $scope.cargarDatos();
        $scope.cargarOpciones();
      }, function () {
        javascript:void(0)
      });
    };

    $scope.cargarDatos = function(){
      $rootScope.cargando=true;
      var datosFunc = funcionario.datos().query();
      datosFunc.$promise.then(function(response){
        $scope.datos = response;
        $rootScope.cargando=false;
      });
    };

    $scope.cargarOpciones = function(){
      $rootScope.cargando=true;
      var datosOpc = funcionario.opciones().get();
      datosOpc.$promise.then(function(response){
        $scope.opciones = response;
        $rootScope.cargando=false;
      });
    };

    $scope.editar = function(func){
      $rootScope.cargando=true;
      var datos = funcionario.datos().get({id:func.sid});
      datos.$promise.then(function(response){
        $scope.open( response );
        $rootScope.cargando=false;
      });
    };

    $scope.eliminar = function(func){
      $rootScope.cargando=true;
      var datos = funcionario.datos().delete( {id:func.sid} );
      datos.$promise.then(function(response){
        Notification.success({ message: response.mensaje, title: 'Mensaje del Sistema'});
        $rootScope.cargando=false;
        $scope.cargarDatos();
      });
    };

    $scope.toolTipEdicion = function( nombre ){
    	return 'Editar los datos del usuario <b>' + nombre + '</b>';
    };

    $scope.cargarDatos();
    $scope.cargarOpciones();
  })

  .controller('ModalFuncionarioCtrl', function ($scope, $rootScope, $timeout, $uibModal, $uibModalInstance, Notification, $filter, funcionario, objeto, opciones, constantes ) {
      $scope.deshabilitar=true;
      $scope.creandoImagen=false;
      $scope.creandoImagenFirma=false;
      $scope.valorPB=100;
      $scope.valorPBFirma=100;
      $scope.opciones = opciones;
      $scope.objeto = objeto;
      $scope.objeto.fotografiaBase64='';
      $scope.objeto.firmaBase64='';
      $scope.objeto.crearPassword=true;

      $scope.imagen={};
      $scope.imagenFirma={};
      $scope.erroresDatos=[];

     

      if( objeto.fotografia ){
        $scope.fotografia = constantes.URL + 'stories/' + objeto.fotografia;
      }else{
        $scope.fotografia = 'images/usuario.png';
      }

      if( objeto.firma ){
        $scope.firma = constantes.URL + 'stories/' + objeto.firma;
      }else{
        $scope.firma = 'images/firma.png';
      }

      if( $scope.objeto.sid ){
        //$scope.objeto.dependencia = $filter('filter')($scope.opciones.dependencias, {id: $scope.objeto.departamento }, true)[0];
        $scope.objeto.perfil = $filter('filter')($scope.opciones.perfiles, {sid: $scope.objeto.perfil }, true)[0];
        $scope.objeto.crearPassword=false;
      }else{
        $scope.objeto.permisos={};
        $scope.objeto.doctoFirma={
          ordenCompra : false
        };
      }
      $scope.ocultarProgressBar = function(){
        $scope.creandoImagen=false;
        $scope.valorPB=0;
      };

      $scope.ocultarProgressBarFirma = function(){
        $scope.creandoImagenFirma=false;
        $scope.valorPBFirma=0;
      };

      $scope.obtenerImagenB64 = function(){
        $scope.objeto.fotografiaBase64 ='';
        $scope.creandoImagen=true;
        $timeout(function(){
          var base64;
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
            base64 = event.target.result;
            $scope.objeto.fotografiaBase64 = base64;
            $timeout(function(){
              $scope.ocultarProgressBar(); 
            }, 250);                                
          };
          fileReader.readAsDataURL( $scope.imagen.flow.files[0].file );      
        }, 1000);                  
      };

      $scope.obtenerImagenFirmaB64 = function(){
        $scope.objeto.fotografiaBase64 ='';
        $scope.creandoImagenFirma=true;
        $timeout(function(){
          var base64;
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
            base64 = event.target.result;
            $scope.objeto.firmaBase64 = base64;
            $timeout(function(){
              $scope.ocultarProgressBarFirma(); 
            }, 250);                                
          };
          fileReader.readAsDataURL( $scope.imagenFirma.flow.files[0].file );      
        }, 1000);                  
      };

      $scope.guardar = function () {
        $rootScope.cargando=true;
        var response;
        if( $scope.objeto.sid ){
          response = funcionario.datos().update({id:$scope.objeto.sid}, $scope.objeto);
        }else{
          response = funcionario.datos().create({}, $scope.objeto);
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

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.errores = function(name){
        var s = $scope.form[name];
        return s.$invalid && s.$dirty;
      };

      $scope.openPermisosUsuario = function(){
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/forms/form-usuario-permisos.html?v='  + $filter('date')(new Date(), 'ddMMyyyyHHmmss'),
          controller: 'ModalFormPermisosUsuarioCtrl',
          size: 'lg',
          backdrop: 'static',
          resolve: {
            objeto : function(){
              return $scope.objeto.permisos;
            }
          }
        });

        modalInstance.result.then(function(){}, function (permisos) {
          $scope.objeto.permisos = permisos;
          //$scope.objeto.permisos.creando=true;
        }, function () {
          javascript:void(0)
        });
      };
  })
  .controller('ModalFormPermisosUsuarioCtrl', function ($scope, $filter, $timeout, $rootScope, $uibModalInstance, Notification, perfil, funcionario, objeto) {
      
      $rootScope.cargando=false;
      $scope.opcionesGuardarPerfil=[
        {id:0, opcion:'No'},
        {id:1, opcion:'Modificar Perfil Existente'},
        {id:2, opcion:'Crear Nuevo Perfil'}
      ];

      $scope.objeto = objeto;
      if( !$scope.objeto.creando ){
        $scope.objeto.editar=false;
        $scope.objeto.modificarAcceso=false;
        $scope.objeto.seleccion={};
        $scope.objeto.perfil={};
        $scope.objeto.guardarPerfil={};
        $scope.objeto.modificarPerfil={};
        $scope.guardarPerfil = $scope.opcionesGuardarPerfil[0];
      }
      $scope.opciones = [];
      $scope.checklistEmpresa = {};
      $scope.empresas=[];
      
      $scope.empresas.push(
        {
          nRut : 'global',
          razonSocial : 'TODAS'
        }
      );
      
      $scope.checkmasterEmpresa=[];      

      if (!$scope.objeto.sid) {
        $scope.objeto.accesos = [];
      }


      $scope.agregarOpcionSeleccion = function(emp, opc, permiso){
        if( !$scope.objeto.seleccion[emp][opc] ){
          $scope.objeto.seleccion[emp][opc]={};
        }else{
          if( !$scope.objeto.seleccion[emp][opc][permiso] ){
            $scope.objeto.seleccion[emp][opc][permiso]=true;
          }
        }
        $scope.objeto.seleccion[emp][opc][ permiso ] = true;          
      };

      $scope.quitarOpcionSeleccion = function(emp, opc, permiso){
        if( $scope.objeto.seleccion[emp][opc] ){
          delete $scope.objeto.seleccion[emp][opc][permiso];
          if( angular.equals({}, $scope.objeto.seleccion[emp][opc] ) ){
            delete $scope.objeto.seleccion[emp][opc];
          }
        }
      };

      $scope.cargarOpcionesSeleccion = function(){
        $rootScope.cargando=true;
        var op;
        var menu = $scope.menu.datos;
        var empresas = $scope.empresas;
        for( var ind in empresas ){
          for( op in menu ){
            if( menu[op].sid && empresas[ind].nRut ){
              $scope.checklistEmpresa[ empresas[ind].nRut ][ menu[op].sid ] = {
                crear : false,
                editar : false,
                eliminar : false,
                ver : false
              };
            }
          }
        }
        for( op in menu ){
          if( menu[op].sid ){
            $scope.checklistEmpresa.global[ menu[op].sid ] = {
              crear : false,
              editar : false,
              eliminar : false,
              ver : false
            };
          }
        }

        $rootScope.cargando=false;
      };

      $scope.generarSeleccionables = function(){
        $scope.objeto.seleccion.global={};
        for( var ind in $scope.empresas ){
          if( $scope.empresas[ind].nRut ){
            $scope.objeto.seleccion[ $scope.empresas[ind].nRut ]={};
          }
        }
      };

      /* cargar empresas */
      $scope.cargarEmpresas = function(){
        $rootScope.cargando=true;
        var empresasSistema = perfil.empresas().get();
        empresasSistema.$promise.then(function(response){
          var empresas = angular.copy(response.empresas);
          $scope.checkmasterEmpresa.global={
            crear : false,
            editar : false,
            eliminar : false,
            ver : false
          };
          $scope.checklistEmpresa.global={}; 
          if( !$scope.objeto.creando || !$scope.objeto.seleccion.global ){                                   
            $scope.objeto.seleccion.global={};
          }
        
          for( var ind in empresas ){
            if( empresas[ind].nRut ){
              $scope.empresas.push( empresas[ind] );
              $scope.checkmasterEmpresa[ empresas[ind].nRut ]={
                crear : false,
                editar : false,
                eliminar : false,
                ver : false
              };
              $scope.checklistEmpresa[ empresas[ind].nRut ]={};
              if( !$scope.objeto.creando || !$scope.objeto.seleccion[ empresas[ind].nRut ] ){                            
                $scope.objeto.seleccion[ empresas[ind].nRut ]={};
              }
            }
          }
          $rootScope.cargando=false;        
          $scope.cargarOpcionesSeleccion();
          $scope.cargarListaPerfiles();          
        });
      };

      $scope.cargarSeleccionAnterior = function(){
        $rootScope.cargando=true;
        var menu = $scope.menu.datos;
        for( var nRut in $scope.objeto.seleccion ){
          for( var op in menu ){
            if( menu[op].sid ){
              if( $scope.objeto.seleccion[nRut] ){
                if( $scope.objeto.seleccion[ nRut ][ menu[op].sid ] ){
                  $scope.checklistEmpresa[ nRut ][ menu[op].sid ]=$scope.objeto.seleccion[ nRut ][ menu[op].sid ];
                }
              }else{
                $scope.objeto.seleccion[nRut]={};
              }
            }
          }
        }            
          
        $rootScope.cargando=false;
      };


      $scope.cargarListaPerfiles = function(){
        $rootScope.cargando=true;
        var datos = funcionario.opciones().get();
        datos.$promise.then(function(response){
          $scope.opciones = response;
          if(!$scope.objeto.creando){
            $scope.objeto.perfil = $scope.opciones.perfiles[0];
          }else{
            $timeout(function(){
              $scope.objeto.perfil = $filter('filter')($scope.opciones.perfiles, {sid: $scope.objeto.perfil.sid }, true)[0];
              $scope.objeto.guardarPerfil = $scope.objeto.guardarPerfil? $filter('filter')($scope.opcionesGuardarPerfil, {id: $scope.objeto.guardarPerfil.id }, true)[0] : '';
              $scope.objeto.modificarPerfil =  $scope.objeto.modificarPerfil? $filter('filter')($scope.opciones.perfilesExistentes, {sid: $scope.objeto.modificarPerfil.sid }, true)[0] : '';
              $scope.cargarSeleccionAnterior();
            }, 500);        
          }
          $rootScope.cargando=false;
        });
      };

      
      $scope.cargarOpcionesMenu = function(){
        $rootScope.cargando=true;
        var opcionesMenu = perfil.menu().get();
        opcionesMenu.$promise.then(function(response){
          $scope.menu = response;
          $rootScope.cargando=false;
          $scope.cargarEmpresas();
        });
      };

      /*  cargar menu del sistema */
      $scope.cargarOpcionesMenu();

      $scope.marcarTodosEmpresa = function( rut, permiso ){        
        for( var op in $scope.menu.datos ){
          if($scope.menu.datos[op].sid){
            $scope.checklistEmpresa[ rut ][ $scope.menu.datos[op].sid ][ permiso ] = $scope.checkmasterEmpresa[ rut ][ permiso];
            $scope.seleccionarOpcion( rut, $scope.menu.datos[op].sid, permiso);
          }
        }
        if(permiso==='ver'){
          if(!$scope.checkmasterEmpresa[ rut ][permiso]){
            $scope.checkmasterEmpresa[ rut ]['crear'] = false;
            $scope.checkmasterEmpresa[ rut ]['editar'] = false;
            $scope.checkmasterEmpresa[ rut ]['eliminar'] = false;
          }
        }else{
          if($scope.checkmasterEmpresa[ rut ][permiso]){
            $scope.checkmasterEmpresa[ rut ]['ver'] = true;
          }
        }
      };

      $scope.seleccionarOpcion = function( rut, opc, permiso ){
        var opcMenu = $scope.checklistEmpresa[ rut ][ opc ][permiso];
        if( opcMenu ){
          $scope.agregarOpcionSeleccion( rut, opc, permiso );
        }else{
          $scope.quitarOpcionSeleccion( rut, opc, permiso );
        }
        if(permiso==='ver'){
          if(!$scope.checklistEmpresa[ rut ][ opc ][permiso]){
            $scope.checklistEmpresa[ rut ][ opc ]['crear'] = false;
            $scope.checklistEmpresa[ rut ][ opc ]['editar'] = false;
            $scope.checklistEmpresa[ rut ][ opc ]['eliminar'] = false;
          }
        }else{
          if($scope.checklistEmpresa[ rut ][ opc ]['crear'] || $scope.checklistEmpresa[ rut ][ opc ]['editar'] || $scope.checklistEmpresa[ rut ][ opc ]['eliminar']){
            $scope.checklistEmpresa[ rut ][ opc ]['ver'] = true;
          }
        }
      };

     

      $scope.cancel = function () {
        $uibModalInstance.dismiss( $scope.objeto );
      };

      $scope.marcarAccesosPerfil = function(datosPerfil){           
        for( var nRut in datosPerfil.seleccion ){
          for( var opc in datosPerfil.seleccion[ nRut ] ){
            for( var permiso in datosPerfil.seleccion[ nRut][opc] ){
              $scope.checklistEmpresa[ nRut ][ opc][ permiso]=datosPerfil.seleccion[ nRut][opc][permiso];
              $scope.seleccionarOpcion( nRut, opc, permiso );
            }                    
          }
        }
        $scope.objeto.editar=true;
      };

      $scope.cargarPerfil = function(){
        if($scope.objeto.perfil.sid !== '0'){
          delete $scope.objeto.seleccion;
          $scope.objeto.seleccion={};
          $rootScope.cargando = true;
          var datos = perfil.datos().get( { id: $scope.objeto.perfil.sid });
          datos.$promise.then( function(result){
            $rootScope.cargando = false;
            $scope.generarSeleccionables();
            $scope.cargarOpcionesSeleccion();
            $scope.marcarAccesosPerfil( result );
          });
        }else{
          Notification.error({message: 'Debe seleccionar un Perfil!', title: 'Mensaje del Sistema'});
        }
      };
  });
