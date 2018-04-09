'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:PerfilesCtrl
 * @description
 * # PerfilesCtrl
 * Controller of the angularjsApp
 */

angular.module('angularjsApp')
  .controller('PerfilesCtrl', function ($scope, $rootScope, $timeout, $uibModal, Notification, constantes, perfil) {
    $scope.datos = [];
    $scope.opciones = [];
    $scope.constantes=constantes;
  
    $scope.open = function(objeto){
    	var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalPerfil.html',
            controller: 'ModalFormPerfilCtrl',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                objeto : function(){
                    return objeto;
                },
                opciones: function () {
                    return $scope.opciones;
                }
            }
        });

        modalInstance.result.then(function (mensaje) {
            Notification.success({message: mensaje, title:'Notificación del Sistema'});
            $scope.cargarDatos();
        });
    };

    $scope.eliminar = function(objeto){
        $rootScope.cargando=true;
        $scope.result = perfil.datos().delete({ id: objeto.sid });
        $scope.result.$promise.then( function(response){
            if(response.success){
                $scope.cargarDatos();
                Notification.success({message: response.mensaje, title:'Notificación del Sistema'});
            }
        });
    };

    $scope.editar = function(objeto){    	
    	$rootScope.cargando = true;
        var datos = perfil.datos().get( { id: objeto.sid });
        datos.$promise.then( function(result){
            $scope.open( result );
        });
    };

    $scope.cargarDatos = function(){
    	$rootScope.cargando = true;
    	var datos = perfil.datos().get();
    	datos.$promise.then(function(response){
    		$scope.datos = response.datos;
    		$scope.opciones = response.opciones;
    		$rootScope.cargando = false;
    	});
    };

    $scope.toolTipEdicion = function( nombre ){
    	return 'Editar el Perfil: <b>' + nombre + '</b>';
    };

    $scope.cargarDatos();
  })
  .controller('ModalFormPerfilCtrl', function ($scope, $filter, $timeout, $rootScope, $uibModalInstance, perfil, objeto, opciones) {

        $scope.objeto = objeto;
        $scope.opciones = opciones;
        $scope.alert = {};
        $rootScope.cargando=false;
        $scope.checkmasterEmpresa=[];
        $scope.totalSeleccionados={};
        $scope.checklistEmpresa = {};
        $scope.checkboxEmpresas = {};
        $scope.empresas = [];
        $scope.empresas.push(
            {
                nRut : 'global',
                razonSocial : 'TODAS'
            }
        );

        if( !$scope.objeto.seleccion ){
            $scope.objeto.editar=false;
            $scope.objeto.modificarAcceso=false;
            $scope.objeto.creando = false;
            $scope.objeto.seleccion={};
            $scope.objeto.empresa = $scope.empresas[0];
        }

        if( $scope.objeto.sid ){
            $scope.objeto.creando = true;
            $scope.checkboxEmpresas = $scope.objeto.seleccion;
            delete $scope.objeto.seleccion;
            $scope.objeto.seleccion = {};
        }


        /*
        $scope.empresas.push(
            {
                nRut : 'global',
                razon_social : 'TODAS'
            }
        );

      
        $scope.menu = perfil.menu().get();
        var datosEmpresas = perfil.empresas().query();

        $scope.objeto.checklist = [];
        $scope.objeto.checklistEmpresa = {};
        if (!$scope.objeto.sid) {
	        $scope.objeto.accesos = [];
        }

        datosEmpresas.$promise.then(function(response){
            for( var ind in response ){
                $scope.empresas.push( response[ind] );
                $scope.objeto.checklistEmpresa[ response[ind].nRut ] ={};
                $scope.checkmasterEmpresa[ response[ind].nRut ]=false;
            }
        });

      

	  $scope.menu.$promise.then(
        function( response ){
            for( var op in response.datos ){
                var seleccionado;
                if(response.datos[op].sid){
                    if( $scope.objeto.sid ){
                        if( $scope.objeto.accesos.global ){
                            if($scope.objeto.accesos.global.indexOf(response.datos[op].sid) >= 0){
                                seleccionado=true;
                            }else{
                                seleccionado=false;
                            }
                        }else{
                            seleccionado=false;
                        }
                    }else{
                        seleccionado=false;
                    }

                    $scope.objeto.checklist[ op ] = { seleccionado : seleccionado, value : response.datos[op].sid };
                
                    for( var ind in $scope.empresas ){
                        if( $scope.objeto.sid ){
                            if( $scope.objeto.accesos[ $scope.empresas[ind].nRut ] ){
                                if($scope.objeto.accesos[ $scope.empresas[ind].nRut ].indexOf(response.datos[op].sid) >= 0){
                                    seleccionado=true;
                                }else{
                                    seleccionado=false;
                                }
                            }else{
                                seleccionado=false;
                            }
                        }else{
                            seleccionado=false;
                        }
                        $scope.objeto.checklistEmpresa[ $scope.empresas[ind].nRut ][ op ] = { seleccionado : seleccionado, value : response.datos[op].sid };
                    }
                }
            }
        }
	  );


	 
	  $scope.marcarTodos = function(){
        for( var op in $scope.menu.datos ){
            if($scope.menu.datos[op].sid){
                $scope.objeto.checklist[ op ].seleccionado = $scope.checkmaster;
            }
        }
	  };

      $scope.marcarTodosEmpresa = function( nRut ){
        for( var op in $scope.menu.datos ){
            if($scope.menu.datos[op].sid){
                $scope.objeto.checklistEmpresa[nRut ][ op ].seleccionado = $scope.checkmasterEmpresa[ nRut ];
            }
        }
      };
      */


        

        
        $scope.checkmasterEmpresa=[];
        

        if (!$scope.objeto.sid) {
            $scope.objeto.accesos = [];
        }


        $scope.agregarOpcionSeleccion = function(emp, opc, permiso){
            if( !$scope.objeto.seleccion[emp][opc] ){
                $scope.objeto.seleccion[emp][opc]={};
                $scope.totalSeleccionados[ emp ]++;
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
                    $scope.totalSeleccionados[ emp ]--;
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

            if( $scope.objeto.sid ){
                $scope.cargarSeleccionAnterior();
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
                $scope.checkmasterEmpresa.global={
                            crear : false,
                            editar : false,
                            eliminar : false,
                            ver : false
                        };
                $scope.checklistEmpresa.global={}; 
                if( !$scope.objeto.seleccion.global ){                                   
                    $scope.objeto.seleccion.global={};
                }

                $scope.totalSeleccionados.global=0;

                for( var ind in response.empresas ){
                    if( response.empresas[ind].nRut ){
                        $scope.totalSeleccionados[ response.empresas[ind].nRut ]=0;
                        $scope.empresas.push( response.empresas[ind] );
                        $scope.checkmasterEmpresa[ response.empresas[ind].nRut ]={
                            crear : false,
                            editar : false,
                            eliminar : false,
                            ver : false
                        };
                        $scope.checklistEmpresa[ response.empresas[ind].nRut ]={};
                        if( !$scope.objeto.seleccion[ response.empresas[ind].nRut ] ){                            
                            $scope.objeto.seleccion[ response.empresas[ind].nRut ]={};
                        }
                    }
                }
                $rootScope.cargando=false;        
                $scope.cargarOpcionesSeleccion();

            });
            $scope.objeto.empresa = $scope.empresas[0];
        };

        $scope.cargarSeleccionAnterior = function(){
            $rootScope.cargando=true;
            var menu = $scope.menu.datos;
            for( var nRut in $scope.checkboxEmpresas ){
                for( var op in menu ){
                    if( menu[op].sid ){
                        if( $scope.checkboxEmpresas[nRut] ){
                            if( $scope.checkboxEmpresas[ nRut ][ menu[op].sid ] ){
                                $scope.totalSeleccionados[ nRut ]++;
                                $scope.checklistEmpresa[ nRut ][ menu[op].sid ]=$scope.checkboxEmpresas[ nRut ][ menu[op].sid ];
                                for( var opcion in $scope.checkboxEmpresas[ nRut ][ menu[op].sid ] ){
                                    if( $scope.checkboxEmpresas[ nRut ][ menu[op].sid ][opcion] ){
                                        $scope.seleccionarOpcion( nRut, menu[op].sid, opcion );
                                    }
                                }
                            }
                        }
                    }
                }
            }            
            delete $scope.checkboxEmpresa;
            $scope.checkboxEmpresa={};
            
            $rootScope.cargando=false;
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
        };

        $scope.seleccionarOpcion = function( rut, opc, permiso ){
            var opcMenu = $scope.checklistEmpresa[ rut ][ opc ][permiso];
            if( opcMenu ){
                $scope.agregarOpcionSeleccion( rut, opc, permiso );
            }else{
                $scope.quitarOpcionSeleccion( rut, opc, permiso );
            }
        };
 






 
      $scope.grabar = function () {
        
    	$rootScope.cargando = true;

        if( $scope.objeto.sid ){
            $scope.result = perfil.datos().update( { id:$scope.objeto.sid }, $scope.objeto );
        }
        else{
            $scope.result = perfil.datos().create( {}, $scope.objeto );
        }

        $scope.result.$promise.then(
            function( data ){
                if (data.success) {
                    $scope.estado = true;
                    $uibModalInstance.close(data.mensaje);
                }else{
                    $scope.alert.tipo='danger';
                    $scope.alert.mensaje = data.mensaje;
                }

    			$rootScope.cargando = false;
            }
        );
      };


      $scope.cancel = function () {
		$uibModalInstance.dismiss('reload');
      };

        $scope.comprobarSeleccion = function(){
            for( var nRut in $scope.totalSeleccionados ){
                if( $scope.totalSeleccionados[nRut] > 0 ){
                    return true;
                }
            }
            return false;
        };
  });
